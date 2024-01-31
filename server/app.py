from flask import Flask, request, jsonify, send_file
import dbConfig 
import io
import sys
from bson import ObjectId
from gridfs import GridFS
import hashlib
from flask_cors import CORS
import imghdr

app = Flask(__name__)
fs = GridFS(dbConfig.db)

CORS(app, origins="http://localhost:5173")

def calculate_hash(content):
    md5 = hashlib.md5()
    md5.update(content)
    return md5.hexdigest()

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/testing')
def test():
    data = dbConfig.db.collection.insert_one({'name': 'test'})
    print(data, file=sys.stderr)
    return 'Connection with MongoDB Atlas established!'

@app.route('/profile', methods=['POST'])
def profile():
    input = request.get_json()
    name = input['name']
    email = input['email']
    age = input['age']
    gender = input['gender']
    phone = input['phone']
    result = dbConfig.db.collection.insert_one({"name": name, "email": email, "age": age, "gender": gender, "phone": phone})
    inserted_id = str(result.inserted_id)
    response_data = {
        "_id": inserted_id,
        "name": name,
        "email": email,
        "age": age,
        "gender": gender,
        "phone": phone
    }
    print(response_data, file=sys.stderr)
    return jsonify(response_data)

def detect_file_type(file_content):
    image_type = imghdr.what(None, h=file_content)
    if image_type:
        return 0
    else:
        return 1

@app.route('/upload/<user_id>', methods=['POST'])
def pdfUpload(user_id):
    try:
        user_id_obj = ObjectId(user_id)
        user_document = dbConfig.db.collection.find_one({'_id': user_id_obj})
        if user_document:
            if 'files' not in user_document:
                dbConfig.db.collection.update_one({'_id': user_id_obj}, {'$set': {'files': []}})
                
        print(user_id, file=sys.stderr)
        # pdf_file = request.files['file']
        uploaded_files = request.files.getlist('file')
        for pdf_file in uploaded_files:
            pdf_content = pdf_file.read()
            pdf_hash = calculate_hash(pdf_content)
            
            if dbConfig.db.collection.find_one({'hash': pdf_hash}):
                return jsonify({'message': f'Duplicate PDF file detected: {pdf_file.filename}'}), 409
            
            file_id = fs.put(pdf_content, filename=pdf_file.filename)
            file_type = detect_file_type(pdf_content)
            
            metadata = {
                'filename': pdf_file.filename,
                'hash': pdf_hash,
                'file_id': file_id,
                'file_type': file_type
            }
            
            dbConfig.db.collection.update_one({'_id': user_id_obj}, {'$push': {'files': metadata}})
            
        print("hello", file=sys.stderr) 
        if file_type == 0:
            return jsonify({'flag': 0, "message": 'Image uploaded successfully.'}), 201
        else:
            return jsonify({'flag': 1, "message": 'PDF uploaded successfully.'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/download/<user_id>/<file_id>', methods=['GET'])
def pdfDownload(user_id, file_id):
    try:
        user_id_obj = ObjectId(user_id)
        user_document = dbConfig.db.collection.find_one({'_id': user_id_obj})
        if not user_document:
            return jsonify({'message': 'User not found'}), 404
        
        file_id_obj = ObjectId(file_id)
        file_document = fs.get(file_id_obj)
        if not file_document:
            return jsonify({'message': 'File not found'}), 404
        
        response = {
            'filename': file_document.filename,
            'content': file_document.read()
        }
        
        return send_file(
            io.BytesIO(response['content']),
            mimetype='application/pdf',
            as_attachment=True,
            download_name=file_document.filename
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/users', methods=['GET'])
def getUsers():
    try:
        users_cursor = dbConfig.db.collection.find()
        users_data = []
        for user_document in users_cursor:
            user_data = {
                "_id": str(user_document["_id"]),
                "name": user_document.get("name", ""),
                "email": user_document.get("email", ""),
                "age": user_document.get("age", ""),
                "gender": user_document.get("gender", ""),
                "phone": user_document.get("phone", "")
            }
            users_data.append(user_data)

        return jsonify(users_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    

if __name__ == '__main__':
    app.run(debug=True, port=8000)
    
#     "dotenv": "^16.3.1",
#     "ethers": "^5.7.1",
#     "express": "^4.18.2",
#     "ipfs-http-client": "^60.0.1",
#     "moralis": "^2.23.1",
#     "multer": "^1.4.5-lts.1",
#     "nodemon": "^3.0.1",
#     "solc": "^0.8.21",
#     "undici": "^5.24.0"
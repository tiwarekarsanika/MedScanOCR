from flask import Flask, request, jsonify, send_file
import dbConfig 
import io
import sys
from bson import ObjectId
from gridfs import GridFS
import hashlib
from flask_cors import CORS
import imghdr
import cv2
import numpy as np
from tensorflow import keras
from keras.models import load_model
import imutils
import kaggle
from io import BytesIO
from kaggle.api.kaggle_api_extended import KaggleApi
import os

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
def download_file(user_id, file_id):
    try:
        user_id_obj = ObjectId(user_id)
        user_document = dbConfig.db.collection.find_one({'_id': user_id_obj})
        if not user_document:
            return jsonify({'message': 'User not found'}), 404
        
        file_id_obj = ObjectId(file_id)
        file_document = fs.get(file_id_obj)
        if not file_document:
            return jsonify({'message': 'File not found'}), 404
        
        return send_file(
            io.BytesIO(file_document.read()),
            mimetype=file_document.content_type,  # Use the content_type of the file
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

# def preprocess_imgs(img, img_size):
#     image = cv2.imdecode(np.frombuffer(img.read(), np.uint8), cv2.IMREAD_COLOR)
    
#     print(image.shape, file=sys.stderr)
#     print(type(image), file=sys.stderr)
    
#     set_new = []
#     for img in image:
#         gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
#         gray = cv2.GaussianBlur(gray, (5, 5), 0)

#         # threshold the image, then perform a series of erosions +
#         # dilations to remove any small regions of noise
#         thresh = cv2.threshold(gray, 45, 255, cv2.THRESH_BINARY)[1]
#         thresh = cv2.erode(thresh, None, iterations=2)
#         thresh = cv2.dilate(thresh, None, iterations=2)

#         # find contours in thresholded image, then grab the largest one
#         cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#         cnts = imutils.grab_contours(cnts)
#         c = max(cnts, key=cv2.contourArea)

#         # find the extreme points
#         extLeft = tuple(c[c[:, :, 0].argmin()][0])
#         extRight = tuple(c[c[:, :, 0].argmax()][0])
#         extTop = tuple(c[c[:, :, 1].argmin()][0])
#         extBot = tuple(c[c[:, :, 1].argmax()][0])

#         # add contour on the image
#         img_cnt = cv2.drawContours(img.copy(), [c], -1, (0, 255, 255), 4)

#         # add extreme points
#         img_pnt = cv2.circle(img_cnt.copy(), extLeft, 8, (0, 0, 255), -1)
#         img_pnt = cv2.circle(img_pnt, extRight, 8, (0, 255, 0), -1)
#         img_pnt = cv2.circle(img_pnt, extTop, 8, (255, 0, 0), -1)
#         img_pnt = cv2.circle(img_pnt, extBot, 8, (255, 255, 0), -1)

#         # crop
#         ADD_PIXELS = 0
#         new_img = img[extTop[1]-ADD_PIXELS:extBot[1]+ADD_PIXELS, extLeft[0]-ADD_PIXELS:extRight[0]+ADD_PIXELS].copy()
        
#         new_img = cv2.resize(
#             new_img,
#             dsize=(img_size),
#             interpolation=cv2.INTER_CUBIC
#         )
        
#         set_new.append(new_img)
        
#     return np.array(set_new)

# # kaggle.api.authenticate(api_key="C:\\Users\\tiwar\\.kaggle\\kaggle.json")

# # Set the Kaggle configuration directory
# os.environ['KAGGLE_CONFIG_DIR'] = 'C:\\Users\\tiwar\\.kaggle'

# # Initialize KaggleApi
# kaggle_api = KaggleApi()
# kaggle_api.authenticate()

# # # Kaggle dataset name and file paths
# # dataset_name = 'brain-mri-images-for-brain-tumor-detection'
# # model_file_path = 'C:\\Users\\tiwar\\OneDrive\\Desktop\\WebDev\\MedScanOCR\\brain_model\\your_model.h5'

# # Download the model file from Kaggle
# # Kaggle dataset name and file paths
# dataset_name = 'navoneel/brain-mri-images-for-brain-tumor-detection'

# # Download the dataset
# kaggle_api.dataset_download_files(dataset_name, path='./', unzip=True, quiet=False, force=True)

# # kaggle.api.dataset_download_files(dataset_name, path='./', unzip=True, quiet=False, force=True)
# model_file_path = 'brain_model/your_model.h5'

# # Load the model
# model = load_model(model_file_path)

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get the image file from the request
#         file = request.files['image']

#         # Read the image and preprocess it
#         processed_images = preprocess_imgs(file, (224, 224))

#         # Make predictions using the loaded model
#         predictions = model.predict(processed_images)

#         # Assuming it's a binary classification task, use a threshold of 0.5
#         predicted_class = 1 if predictions[0] > 0.5 else 0

#         # Return the prediction as JSON
#         return jsonify({'prediction': predicted_class, 'probability': float(predictions[0])})

#     except Exception as e:
#         return jsonify({'error': str(e)})
    
@app.route('/user', methods=['GET', 'POST'])
def getUser():
    try: 
        print("hello", file=sys.stderr)
        user_name = request.get_json()['name']
        print("user_name is " + user_name, file=sys.stderr)
        user = dbConfig.db.collection.find_one({'name': user_name})
        
        if user:
            user_id_str = str(user['_id'])
            print("user id is " + user_id_str, file=sys.stderr)
            return jsonify(user_id_str), 200
        else:
            return jsonify({'message': 'User not found'}), 404   
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
from flask import Flask, request, jsonify
import dbConfig
import sys

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/testing')
def test():
    data = dbConfig.db.collection.insert_one({'name': 'test'})
    print(data, file=sys.stderr)
    return 'Connection with MongoDB Atlas established!'

if __name__ == '__main__':
    app.run(debug=True, port=8000)
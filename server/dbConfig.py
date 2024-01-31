from flask import Flask
from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://bustacode:bustacode@cluster0.bbovhkd.mongodb.net/?retryWrites=true&w=majority"

client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('MedScanOCR')
collection = pymongo.collection.Collection(db, 'MedScanOCR')
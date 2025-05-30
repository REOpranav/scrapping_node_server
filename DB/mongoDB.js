const { MongoClient } = require('mongodb');
require('dotenv').config()

const uri = process.env.MONGODB_URL
let client;
let database;

const connectToDB = async () => { // DB connection
    if (!client) {
        client = new MongoClient(uri)
        await client.connect()
        database = client.db('data')
    }
    return database;
}

const getDataFromDB = async (collectionName) => { // getting total    
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.find({}).toArray()
        return data
    } catch (err) {
        console.error('Error retrieving data:', err);
        throw err;
    }
};

const insertOneClient = async (collectionName, insertingData) => { // inserting the data
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.insertMany(insertingData)
        return data
    } catch (err) {
        throw err;
    }
};

const getParticularclient = async (collectionName, clientURLID) => { // getting particular data using URLName
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.find({ "URLName": `${clientURLID}` }).toArray()
        return data
    } catch (err) {
        throw err;
    }
};

const deleteClient = async (collectionName, clientID) => { // delete data from leads
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.deleteOne({ "id": `${clientID}` })
        return data
    } catch (err) {
        throw err;
    }
};

const updateClient = async (collectionName, clientID, updatedContent) => { // replacing one 
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.replaceOne(
            { "_id": `${clientID}` },
            updatedContent
        )
        return data
    } catch (err) {
        throw err;
    }
};

module.exports = { getDataFromDB, getParticularclient, deleteClient, insertOneClient, updateClient }
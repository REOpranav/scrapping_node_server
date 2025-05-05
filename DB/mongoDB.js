const { MongoClient } = require('mongodb');
require('dotenv').config()

const uri = process.env.MONGODB_URL
let client;
let database;

const connectToDB = async () => { // DB connection
    if (!client) {
        client = new MongoClient(uri)
        await client.connect()
        database = client.db('sample_mflix')
    }
    return database;
}

const getDataFromDB = async (collectionName) => { // getting total data from DB    
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
        console.error('Error retrieving data:', err);
        throw err;
    }
};

const getParticularclient = async (collectionName, clientID) => { // getting particular data
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.find({ "id": `${clientID}` }).toArray()
        return data
    } catch (err) {
        console.error('Error retrieving data:', err);
        throw err;
    }
};

const deleteClient = async (collectionName, clientID) => { // delete data from leads
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.deleteOne({ "id": `${clientID}` })
        console.log(data);

        return data
    } catch (err) {
        console.error('Error retrieving data:', err);
        throw err;
    }
};

const updateClient = async (collectionName, clientID, updatedContent) => { // update data from leads
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.replaceOne(
            { "id": `${clientID}` },
            updatedContent
        )
        return data
    } catch (err) {
        console.error('Error retrieving data:', err);
        throw err;
    }
};

module.exports = { getDataFromDB, getParticularclient, deleteClient, insertOneClient, updateClient }
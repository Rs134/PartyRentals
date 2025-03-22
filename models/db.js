const { MongoClient } = require('mongodb');
const dbURL = process.env.ATLAS_URI; 

let client;
let db;

async function connectToDB() {
  if (db) {
    console.log("Using existing database connection");
    return db;
  }

  try {
    console.log("Connecting to MongoDB...");
    client = new MongoClient(dbURL);
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("Party_Rentals"); 
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; 
  }
}

function getCollection(collectionName) {
  if (!db) {
    throw new Error("Database connection not established. Call connectToDB first.");
  }
  return db.collection(collectionName);
}

module.exports = { connectToDB, getCollection };

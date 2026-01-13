import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL; // Use the environment variable
if (!uri) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const client = new MongoClient(uri);

// Connect to the MongoDB server once when the module is imported
async function connect() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB server");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
}

// Call connect() immediately to establish the connection
await connect().catch(console.error);
export const database = client.db();

const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectMongoDB() {
  try {
    // Connect the client to the server (and specify the database you want to interact with)
    await client.connect();
    console.log('Connected to MongoDB successfully');

    // Specify the database and operations here
    const database = client.db(process.env.MONGO_DB); // Example: Accessing the database

    // Example operation: Listing collections
    const collections = await database.listCollections().toArray();
    console.log(collections); // Output the list of collections in the database
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1); // Exit with failure
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = connectMongoDB;

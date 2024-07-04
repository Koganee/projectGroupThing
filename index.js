const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
//const { MongoClient } = require('mongodb');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const url = 'mongodb://localhost:27017';
const dbName = 'BreakoutUserData';

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() { //Connects to database.
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

const db = client.db(dbName);
const userName = db.collection('bUserName');

app.post("/addUser", async(req, res) => {

    try {
      const fUserName  = req.body;
        //const collection = db.collection('SpendDataBase');

        const result = await userName.insertOne(fUserName);
    
        if (result.acknowledged) {
          console.log(" User Data Inserted!");
          res.status(200).send({ message: "The user is inserted into the collection" });
        } else {
          res.status(500).send({ message: "Failed to insert user" });
        }
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send({ message: "An error occurred", error });
      }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });



import "nes.css/css/nes.min.css";

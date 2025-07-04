// const express = require("express");
// const app = express();
// const path = require("path");
// const MongoClient = require("mongodb").MongoClient;

// const PORT = 5050;
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";
// const client = new MongoClient(MONGO_URL);

// //GET all users
// app.get("/getUsers", async (req, res) => {
//     await client.connect(URL);
//     console.log('Connected successfully to server');

//     const db = client.db("apnacollege-db");
//     const data = await db.collection('users').find({}).toArray();
    
//     client.close();
//     res.send(data);
// });

// //POST new user
// app.post("/addUser", async (req, res) => {
//     const userObj = req.body;
//     console.log(req.body);
//     await client.connect(URL);
//     console.log('Connected successfully to server');

//     const db = client.db("apnacollege-db");
//     const data = await db.collection('users').insertOne(userObj);
//     console.log(data);
//     console.log("data inserted in DB");
//     client.close();
// });


// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`);
// });


const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");

const PORT = 5050;
const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const client = new MongoClient(MONGO_URL);

let db;

// Connect to DB once
async function connectToMongo() {
  try {
    await client.connect();
    db = client.db("apnacollege-db");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectToMongo();

// GET all users
app.get("/getUsers", async (req, res) => {
  try {
    const data = await db.collection("users").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// POST new user
app.post("/addUser", async (req, res) => {
  try {
    const userObj = req.body;
    console.log("🔹 New user:", userObj);

    const result = await db.collection("users").insertOne(userObj);
    console.log("✅ User added:", result.insertedId);

    res.send("User added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add user");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const express = require("express");
const mongodb = require('mongodb');

const path = require('path');
const app = express();

// Setup Express JSON
app.use(express.json());

// Setup CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});


// Setup Routes
// const classes = require('./routes/api/classes');
// app.use('/api/classes', classes);


let db;
mongodb.MongoClient.connect(
    "mongodb+srv://admin:FKgp2mjpNEfcdI89@cluster0.crigdy9.mongodb.net",
    (err, client) => {
      db = client.db("school_ums");
    }
  );

loadClassesCollection = async () => {
    console.log(await db.collection('classes').find({}).toArray());
    // return await db.collection('classes').find({}).toArray();
}


// Serve from the public directory
app.use(express.static('public'));

// Default route / GET request to serve index.html
app.get('/',async  (req, res) => {
    loadClassesCollection();
    res.sendFile(path.join(__dirname, 'index.html'));
    }
);

// Get Classes in an asynchronous manner
app.get('/api/classes', async (req, res) => {
    const classes = await db.collection('classes');
    res.send(await classes.find({}).toArray());
});


// Start the server on port 3000
app.listen(3000, () => console.log('Listening on port 3000!'));

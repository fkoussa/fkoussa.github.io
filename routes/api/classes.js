const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Classes in an asynchronous manner
router.get('/', async (req, res) => {
    const classes = await loadClassesCollection();
    res.send(await classes.find({}).toArray());
});


// Get classes from mongodb
async function loadClassesCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://coursework2:PfgMTeB7EVBbCD6A@cluster0.crigdy9.mongodb.net',
        {
            useNewUrlParser: true
        }
    );
        
    return client.db('school_ums').collection('classes');
}


module.exports = router;
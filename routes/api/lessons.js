const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");

const router = express.Router();
const ObjectID = mongodb.ObjectId;

// Get lessons in an asynchronous manner
router.get("/", async (req, res) => {
  const lessons = await loadLessonsCollection();
  await lessons
    .find({})
    .toArray()
    .then((lesson) => {
      res.send(lesson);
    });
});

// Get lessons by ID in an asynchronous manner
// Fix this
router.get("/:id", async (req, res) => {
  const lessons = await loadLessonsCollection();
  const id = mongoose.Types.ObjectId(req.params.id.trim());
  await lessons.findOne({ _id: new ObjectID(id) }).then((lesson) => {
    res.send(lesson);
  });
});

// Get lessons from mongodb
async function loadLessonsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://admin:FKgp2mjpNEfcdI89@cluster0.crigdy9.mongodb.net",
    {
      useNewUrlParser: true,
    }
  );

  return client.db("school_ums").collection("lesson");
}

module.exports = router;

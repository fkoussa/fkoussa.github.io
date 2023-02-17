const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();
const ObjectID = mongodb.ObjectId;

// Put route that updates the number of available spaces in the 'lesson' collection
router.put("/", async (req, res) => {
  const lessons = await loadLessonsCollection();

  // Supply the lesson id to find the lesson in the database
  const lesson = await lessons.findOne({
    _id: new ObjectID(req.body.lessonId),
  });

  //   console.log(lesson.find({}).toArray());
  // If the lesson id exists in the database, update the number of available spaces
  if (lesson) {
    await lessons.updateOne(
      { _id: new ObjectID(req.body.lessonId) },
      {
        $set: {
          space: lesson.space - 1,
        },
      }
    );
    res.status(200).send();
  } else {
    res.status(404).send();
  }
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

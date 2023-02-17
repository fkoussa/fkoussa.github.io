const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();
const ObjectID = mongodb.ObjectId;

// Post route that saves new order to the 'order' collection
router.post("/", async (req, res) => {
  console.log(req.body.name);
  console.log(req.body.phone);

  const order = {
    _id: new ObjectID(),
    name: req.body.name,
    phone: req.body.phone,
    cart: req.body.cart,
  };

  const orders = await loadOrdersCollection();
  await orders.insertOne(order);
  res.status(201).send();
});

router.get("/", async (req, res) => {
  const orders = await loadOrdersCollection();
  res.send(await orders.find({}).toArray());
});

// Get orders from mongodb
async function loadOrdersCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://admin:FKgp2mjpNEfcdI89@cluster0.crigdy9.mongodb.net",
    {
      useNewUrlParser: true,
    }
  );

  return client.db("school_ums").collection("order");
}

module.exports = router;

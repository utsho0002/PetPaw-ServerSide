const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rnzx4of.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
  
      console.log("MongoDB Connected Successfully!");
    const database = client.db("pet_store");
    const petStore = database.collection("services");

    // POST - Insert service
    app.post("/services", async (req, res) => {
      const data = req.body;
      const result = await petStore.insertOne(data);
      res.send(result);
    });
    // fetching data using category
     app.get("/services", async (req, res) => {
      const {category} = req.query;
      const query = {};
      if(category){
        query.category = category;
      }
      const result = await petStore.find(query).limit(6).toArray();
      res.send(result);
    });

    // fetch data using email
      app.get("/my-services", async (req, res) => {
      const { email } = req.query;
      const query = { email: email };
      const result = await petStore.find(query).toArray();
      res.send(result);
    });

    // Fetch data through id:
     app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await petStore.findOne(query);
      res.send(result);
    });

      const Order_petStore = database.collection("Orders");

    // POST - Insert service
    app.post("/orders", async (req, res) => {
      const data = req.body;
      const result = await Order_petStore.insertOne(data);
      res.send(result);
    });
// fetching data using email
    app.get("/orders", async (req, res) => {
      const { email } = req.query;
      const query = { email: email };
      const result = await Order_petStore.find(query).toArray();
      res.send(result);
    });

   

    // Deleting Data from database.
     app.delete("/delete/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await petStore.deleteOne(query);
      res.send(result);
    });

    // Update Data
    app.put("/update/:id", async (req, res) => {
      const data = req.body;
      const id = req.params;
      const query = { _id: new ObjectId(id) };

      const updateServices = {
        $set: data,
      };
      const result = await petStore.updateOne(query, updateServices);
      res.send(result);
    });
  } 
  catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
  
  
  
}
run();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rnzx4of.mongodb.net/?appName=Cluster0`;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    // await client.connect(); (Optional in v4.7+ if using methods directly, but good practice to keep)
    
    console.log("MongoDB Connected Successfully!");
    const database = client.db("pet_store");
    const petStore = database.collection("services");
    const Order_petStore = database.collection("Orders");

    // --- SERVICE ROUTES ---

    // POST - Insert service
    app.post("/services", async (req, res) => {
      const data = req.body;
      const result = await petStore.insertOne(data);
      res.send(result);
    });

    // GET - Fetch services (Updated for Dashboard)
    // Logic: If 'limit' is present, use it. If not, return ALL services.
    app.get("/services", async (req, res) => {
      const { category, limit } = req.query;
      const query = {};
      
      if (category) {
        query.category = category;
      }

      let cursor = petStore.find(query);

      // Only limit if specifically requested (e.g., for Homepage)
      if(limit) {
        cursor = cursor.limit(parseInt(limit));
      }

      const result = await cursor.toArray();
      res.send(result);
    });

    // GET - Fetch data using email (My Services)
    app.get("/my-services", async (req, res) => {
      const { email } = req.query;
      const query = { email: email };
      const result = await petStore.find(query).toArray();
      res.send(result);
    });

    // GET - Fetch single service by ID
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await petStore.findOne(query);
      res.send(result);
    });

    // --- ORDER ROUTES ---

    // POST - Create Order
    app.post("/orders", async (req, res) => {
      const data = req.body;
      const result = await Order_petStore.insertOne(data);
      res.send(result);
    });

    // GET - Fetch Orders (Updated for Dashboard)
    // Logic: If 'email' is present, filter by user. If NOT, return ALL orders (for Admin Dashboard).
    app.get("/orders", async (req, res) => {
      const { email } = req.query;
      const query = {};
      
      if (email) {
        query.email = email;
      }
      
      const result = await Order_petStore.find(query).toArray();
      res.send(result);
    });

    // DELETE - Delete Service
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id; // Fixed: req.params (not req.params itself)
      const query = { _id: new ObjectId(id) };
      const result = await petStore.deleteOne(query);
      res.send(result);
    });

    // PUT - Update Service
    app.put("/update/:id", async (req, res) => {
      const data = req.body;
      const id = req.params.id; // Fixed
      const query = { _id: new ObjectId(id) };

      const updateServices = {
        $set: data,
      };
      const result = await petStore.updateOne(query, updateServices);
      res.send(result);
    });

  } catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
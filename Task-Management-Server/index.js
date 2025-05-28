require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.sotib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const db = client.db("TaskDB");
    const taskCollection = db.collection("tasks");
    const userCollection = db.collection("users");
    const goalCollection = db.collection("goals");

    // ======= EXISTING TASKS & USERS ROUTES =======

    //add task
    app.post("/tasks", async (req, res) => {
      const taskInfo = req.body;
      const result = await taskCollection.insertOne(taskInfo);
      res.send(result);
    });

    //get all task
    app.get("/tasks", async (req, res) => {
      const { email } = req.headers;
      const query = { email: email };
      const result = await taskCollection.find(query).toArray();
      res.send(result);
    });

    //update data
    app.patch("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const { title, description, selectCategory } = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          title: title,
          description: description,
          category: selectCategory,
        },
      };
      const result = await taskCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    //delete task
    app.delete("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    //user info
    app.post("/user-info", async (req, res) => {
      const userInfo = req.body;
      const query = { email: userInfo.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return;
      }
      const result = await userCollection.insertOne(userInfo);
      res.send(result);
    });

    // ======= GOALS CRUD =======

    // Add Goal
    app.post("/goals", async (req, res) => {
      try {
        const goal = req.body;
        goal.createdAt = new Date();
        goal.isCompleted = false;
        const result = await goalCollection.insertOne(goal);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to add goal" });
      }
    });

   // Get Goals by user email and type (weekly or monthly)
   app.get("/goals", async (req, res) => {
     try {
       const { email, type } = req.query;
       if (!email || !type) {
         return res.status(400).send({ message: "Email and type are required" });
       }
       const result = await goalCollection
         .find({ email, type })
         .sort({ createdAt: -1 })
         .toArray();
       res.send(result);
     } catch (error) {
       console.error(error);
       res.status(500).send({ message: "Failed to get goals" });
     }
   });

   // Mark goal as completed
   app.patch("/goals/:id", async (req, res) => {
     try {
       const id = req.params.id;
       const result = await goalCollection.updateOne(
         { _id: new ObjectId(id) },
         { $set: { isCompleted: true } }
       );
       res.send(result);
     } catch (error) {
       console.error(error);
       res.status(500).send({ message: "Failed to update goal" });
     }
   });

  // Update goal
   app.put("/goals/:id", async (req, res) => {
  const id = req.params.id;
  const updatedGoal = req.body;

  try {
    const result = await goalCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedGoal }
    );
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: "Failed to update goal" });
  }
});

    // Delete goal
    app.delete("/goals/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await goalCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to delete goal" });
      }
    });


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("task management is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
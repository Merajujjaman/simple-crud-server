const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

//name & password of mongodb new app:
//asmmerajujjaman
//oM3RTrM7JREuw8yU

//midleware
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://asmmerajujjaman:oM3RTrM7JREuw8yU@cluster0.zrkl84y.mongodb.net/?retryWrites=true&w=majority";

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

    
    const userCollection = client.db("usersDB").collection("users");

    app.get('/users', async(req, res) => {
        const cursor = userCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.post('/users', async(req, res) => {
        const user = req.body;
        console.log('new users:', user);

        const result = await userCollection.insertOne(user);

        res.send(result);
    })

    app.delete('/users/:id', async(req, res) => {
        const id = req.params.id;
        console.log('please delete this-', id);

        const query = { _id: new ObjectId(id)};
        const result = await userCollection.deleteOne(query);
        res.send(result)
    })
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('my simple crud server')
})


app.listen(port, () => {
    console.log(`my simple curd server is running on PORT: ${port}`);
})
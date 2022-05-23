const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000
const jwt = require('jsonwebtoken');

// middleware
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yv4lm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() => {
    try{
        await client.connect()
        const productCollection = client.db("Manufacturer").collection('product')
        const orderCollection = client.db("Manufacturer").collection('order')
        const userCollection = client.db("Manufacturer").collection('user')
        // user collection
        app.put('/user/:email',async(req,res) => {
            const email = req.params.email
            const user = req.body
            const filter = {email: email}
            const updateDoc = {
                $set: user,
              };
            const options = { upsert: true };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({email: email},process.env.TOKEN_SECRET,{
                expiresIn: '1d'
            })
            res.send({token,result})
        })

        // all product
        app.get('/product',async (req,res) => {
            const query = res.query
            const result = await productCollection.find(query).toArray()
            res.send(result)
        })
        // find a single product
        app.get('/product/:id',async(req,res) => {
            const params = req.params.id
            const id = {_id: ObjectId(params)}
            const result = await productCollection.findOne(id)
            res.send(result)
        })

        // order post data

        app.post('/productOrder',async(req,res) => {
            const orderData = req.body
            const result = await orderCollection.insertOne(orderData)
            res.send(result)
        })

        // update quantity

        app.put('/product/:id',async(req,res) => {
            const id = req.params.id
            const availableQuantity = req.body.quantity
            const options = { upsert: true };
            const filter = {_id: ObjectId(id)}
            const updateDoc = {
                $set: {
                    availableQuantity
                }
            }
            const result = await productCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(console.dir)

app.get('/',(req,res) => {
    res.send('o bhaiya all is ok')
})

app.listen(port,() => {
    console.log('listening my port is ' + port)
})
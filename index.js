const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yv4lm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() => {
    try{
        await client.connect()
        // const useCollection = client.db().collection()

        app.get('/',async (req,res) => {

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
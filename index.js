const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000
const jwt = require('jsonwebtoken');

// middleware
app.use(cors())
app.use(express.json())

// heroku deploy
// https://fast-river-13040.herokuapp.com/ 

const {
    MongoClient,
    ServerApiVersion,
    ObjectId
} = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yv4lm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

// jwt verify token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({
            massage: "Unauthorized"
        })
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: 'forbidden'
            })
        }
        req.decoded = decoded
        next()
    })
}

const run = async () => {
    try {
        await client.connect()
        const productCollection = client.db("Manufacturer").collection('product')
        const orderCollection = client.db("Manufacturer").collection('order')
        const userCollection = client.db("Manufacturer").collection('user')
        const reviewsCollection = client.db("Manufacturer").collection('reviews')


        // verify admin or not
        const verifyAdmin = async (req,res,next) => {
            const requester = req.decoded.email
            const requesterAccount = await userCollection.findOne({email: requester})
            if(requesterAccount.role === "admin"){
                next()
            }else{
                res.status(403).send({message: "forbidden"})
            }
        }

        // user collection api
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email
            const user = req.body
            const filter = {
                email: email
            }
            const updateDoc = {
                $set: user,
            };
            const options = {
                upsert: true
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({
                email: email
            }, process.env.TOKEN_SECRET, {
                expiresIn: '1d'
            })
            res.send({
                token,
                result
            })
        })

        // all product api
        app.get('/product', async (req, res) => {
            const query = res.query
            const result = (await productCollection.find(query).toArray()).reverse()
            res.send(result)
        })
        // find a single product api
        app.get('/product/:id', verifyToken, async (req, res) => {
            const decoded = req.decoded.email
            const email = req.query.email
            if (email === decoded) {
                const params = req.params.id
                const id = {
                    _id: ObjectId(params)
                }
                const result = await productCollection.findOne(id)
                res.send(result)
            }
        })

        // order post data api

        app.post('/productOrder', verifyToken, async (req, res) => {
            const orderData = req.body
            const result = await orderCollection.insertOne(orderData)
            res.send(result)
        })

        // update quantity api

        app.put('/product/:id', verifyToken, async (req, res) => {
            const id = req.params.id
            const availableQuantity = req.body.quantity
            const options = {
                upsert: true
            };
            const filter = {
                _id: ObjectId(id)
            }
            const updateDoc = {
                $set: {
                    availableQuantity
                }
            }
            const result = await productCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })

        // home section review collection api
        app.get('/homeReview', async (req, res) => {
            const query = req.query
            const result = (await reviewsCollection.find(query).toArray()).reverse()
            res.send(result);
        })
        // all reviews data api
        app.get('/allReviews', verifyToken, async (req, res) => {
            const query = req.query
            const result = (await reviewsCollection.find(query).toArray()).reverse();
            res.send(result);
        })
        // dashboard all orders api
        app.get("/orders", verifyToken, async (req, res) => {
            const email = req.query.email
            const result = await orderCollection.find({
                email: email
            }).toArray()
            res.send(result)
        })
        // cancel product api
        app.delete('/deleteOrder/:id', verifyToken, async (req, res) => {
            const id = req.params.id
            console.log(id)
            const filter = {
                _id: ObjectId(id)
            }
            const result = await orderCollection.deleteOne(filter)
            res.send(result)
        })
        // add reviews api
        app.post('/addReview', verifyToken, async (req, res) => {
            const decoded = req.decoded.email
            const email = req.query.email
            if(decoded === email){
                const review = req.body
                const result = await reviewsCollection.insertOne(review)
                res.send(result)
            }
        })
        // Add a new Product api
        app.post('/addProduct', verifyToken, async (req, res) => {
            const productData = req.body
            const email = req.query.email
            const decoded = req.decoded.email
            if (email === decoded) {
                const result = await productCollection.insertOne(productData)
                res.send(result)
            } else {
                res.status(403).send({
                    message: 'forbidden'
                })
            }
        })

        // manage product api
        app.get('/manageProduct', verifyToken, async (req, res) => {
            const email = req.query.email
            const decoded = req.decoded.email
            if (email === decoded) {
                const result = (await productCollection.find({}).toArray()).reverse()
                res.send(result)
            }else{
                res.status(403).send({message: 'forbidden'})
            }
        })

        // update product api
        app.put('/updateProduct/:id', verifyToken, async (req, res) => {
            const id = req.params.id
            const email = req.query.email
            const decoded = req.decoded.email
            const updateProduct = req.body
            console.log(updateProduct)
            if (email === decoded) {
                const filter = {
                    _id: ObjectId(id)
                }
                const options = {
                    upsert: true
                };
                const updateDoc = {
                    $set: updateProduct
                }
                const result = await productCollection.updateOne(filter, updateDoc, options)
                res.send(result)
            }else{
                res.status(403).send({message: 'forbidden'})
            }
        })

        // find a all users api
        app.get('/user',verifyToken,async(req,res) => {
            const email = req.query.email
            const decoded = req.decoded.email
            if(email === decoded){
                const result = (await userCollection.find({}).toArray()).reverse()
                res.send(result)
            }else{
                res.status(403).send({message: 'forbidden'})
            }
        })

        // Make a admin api
        app.put('/user/admin/:email',verifyToken,verifyAdmin,async(req,res) => {
            const email = req.params.email
            const decoded = req.decoded.email
            if(email === decoded){
                const filter = {email: email}
                const updateDoc = {
                    $set: {role : 'admin'}
                }
                console.log(email)
                const result = await userCollection.updateOne(filter,updateDoc)
                res.send(result)
            }else{
                res.status(403).send({message: 'forbidden'})
            }
        })
        // admin email get
        app.get('/admin/:email',verifyToken,async(req,res) => {
            const email = req.params.email
            const decoded = req.decoded.email
            if(email === decoded){
                const user = await userCollection.findOne({email: email})
                const isAdmin = user?.role === 'admin'
                res.send({admin: isAdmin})
            }else{
                res.status(403).send({message: 'forbidden'})
            }
        })
    } finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('response ok')
})

app.listen(port, () => {
    console.log('listening my port is ' + port)
})
const dbClient = require('../db/db')
async function dbCollection (){
    const client = dbClient
    const productCollection = client.db("Manufacturer").collection("product");
    const orderCollection = client.db("Manufacturer").collection("order");
    const paymentCollection = client.db("Manufacturer").collection("payment");
    const userCollection = client.db("Manufacturer").collection("user");
    const reviewsCollection = client.db("Manufacturer").collection("reviews");
    return  {
        productCollection,
        orderCollection,
        paymentCollection,
        userCollection,
        reviewsCollection
    }
}

module.exports = dbCollection

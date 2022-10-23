const { MongoClient, ServerApiVersion } = require("mongodb");
function dbConnect() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yv4lm.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  // await client.connect()
  console.log('db is connected')
  return client
}

module.exports = dbConnect;

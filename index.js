const express = require('express')
const mongodb = require('mongodb').MongoClient
const app = express()
const port = 5000
//const bodyParser = require("body-parser")
let db

let connectionString = `mongodb://localhost:27017/data`

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
    console.log("Connected to MongoDb")
  }
)

app.listen(port,() => console.log(`Listening on port ${port}`))

app.use(express.json())

//app.use(bodyParser.json())

app.get("/", function(req,res){
    res.send("hi")
})

app.post('/create-data', function (req, res) {
  db.collection('users').insertOne({ username: req.body.username, password: req.body.password }, function (
    err,
    info
  ) {
    res.json(info.ops[0])
  })
})

app.get('/items', function (req, res) {
  // getting all the data
  db.collection('users')
    .find()
    .toArray(function (err, items) {
      res.send(items)
    })
})

app.put('/update-data', function (req, res) {
  // updating a data by it's ID and new value
  db.collection('users').findOneAndUpdate(
    { _id: new mongodb.ObjectId(req.body.id) },
    { $set: { text: req.body.text } },
    function () {
      res.send('Success updated!')
    }
  )
})

app.delete('/delete-data', function (req, res) {
  // deleting a data by it's ID
  db.collection('users').deleteOne(
    { _id: new mongodb.ObjectId(req.body.id) },
    function () {
      res.send('Successfully deleted!')
    }
  )
})
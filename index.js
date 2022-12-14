const express = require('express')
const mongodb = require('mongodb').MongoClient
const app = express()
const port = 5000
const cors = require("cors")
const bodyParser = require("body-parser")
//const recordRoutes = express.Router()

let db

let connectionString = `mongodb://localhost:27017/data`

const ObjectId = require("mongodb").ObjectId

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

app.use(cors({
  origin: "http://localhost:3000"
}))

app.use(bodyParser.json())

app.get("/", function(req,res){
    res.send("hi")
})

//recordRoutes.route('/create-data').post( function (req, res) {
app.post('/register', function (req, res) {
  db.collection('users').insertOne({ username: req.body.username, password: req.body.password }, function (err, info) {
    if (err){
        console.error(err)
    } else if (info.acknowledged === true) {
        res.json(info)
    } else{
        console.log("error")
    }
    })
})

app.post('/add-event', function (req, res) {
  db.collection('events').insertOne({
    title: req.body.title, 
    categories: req.body.categories, 
    provider: req.body.provider, 
    time: req.body.time, 
    duration: req.body.duration, 
    price: req.body.time,
    description:req.body.description
    }, function (err, info) {
    if (err){
        console.error(err)
    } else if (info.acknowledged === true) {
        res.json(info)
    } else{
        console.log("error")
    }
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

app.delete('/delete-user', function (req, res) {
  // deleting a data by it's ID
  db.collection('users').deleteOne(
    { _id: new mongodb.ObjectId(req.body.id) },
    function () {
      res.send('Successfully deleted!')
    }
  )
})

//module.exports = recordRoutes
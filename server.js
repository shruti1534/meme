const express = require('express')
const memeRouter = require('./routes/meme')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const database = require('./models/database')
const methodOverride = require('method-override')
const { json } = require('body-parser')

const app = express()

mongoose.connect('mongodb://localhost/meme',{
    useNewUrlParser: true, useUnifiedTopology: true
})
mongoose.Promise = global.Promise

app.set('view engine','ejs')

app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
app.use(memeRouter)

const MongoClient = require('mongodb').MongoClient
const result = "mongodb+srv://Shru1500:sb4GDPUZ2cd3jMz@xcluster.goi5l.mongodb.net/database?retryWrites=true&w=majority"

app.get('/memes', async (req, res) => {
    const memes = await database.find({}).limit(100).sort({createdAt: -1})
    res.send(memes)
})

app.get('/', async (req, res) => {
    const memes = await database.find({}).limit(100).sort({createdAt: -1})
    res.render('index',{memes: memes})
})

app.listen(process.env.port || 8080)
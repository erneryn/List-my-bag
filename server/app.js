const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./router/index')

const app =express()
const PORT = 3000
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

    
mongoose.connect('mongodb://localhost:27017/bag',{useNewUrlParser : true, useUnifiedTopology: true})
var db = mongoose.connection
db.on('error',console.error.bind(console,'connection error :'))
db.once('open',()=>{
    console.log('connection succesfuly')
})

var Schema = mongoose.Schema;




// var trip1= new trip({tripName:'test',dueDate:new Date()})

// trip1.save((err,trip)=>{
//     console.log(trip)
// })

app.use('/',index)

app.listen(PORT,()=>{
    console.log('listening to port 3000')
})
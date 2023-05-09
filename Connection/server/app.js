const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

app.use(cors({origin:true}))
app.use(express.json())

const userRoutes = require('./routes/router')
app.use('/api/users/',userRoutes)

mongoose.connect('mongodb://localhost:27017/DEMOPR')
.then( ()=>{
    console.log('connected mongoose');
}).catch((error)=> console.log(error))

app.get('/', (req,res)=>{
    res.send("HIIII.........")
})

app.listen(8000, ()=>{
    console.log('server running on port 8000')
})
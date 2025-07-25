require('dotenv').config();

const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

mongoose.connect(process.env.MONGO_URL)
.then(()=> app.listen(5000, ()=> console.log('Backend Connected on 5000')))
.catch(err => console.log(err));
require('dotenv').config();

const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

mongoose.connect(process.env.MONGO_URL)
.then(()=> app.listen(port, ()=> console.log('Backend Connected on 5000')))
.catch(err => console.log(err));
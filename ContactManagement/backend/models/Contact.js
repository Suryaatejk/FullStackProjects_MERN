const mongoose = require('mongoose');

const ContactSchema=new mongoose.Schema ({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    name: {type:String, required:true},
    email: {type:String},
    phone: {type:String},
    address: {type:String},
    favourite: {type:Boolean,default:false},
});

module.exports=mongoose.model('Contact', ContactSchema);

const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


exports.signup = async (req,res) => {
    try {
        const {username, email, password} =req.body;

        const existing=await User.findOne({email});
        if(existing) return res.status(400).json({msg: 'User exists'});

        const hash=await bcrypt.hash(password,10);
        const user=await User.create({username,email,password:hash});
        res.status(201).json({msg: 'User Created'});
    } catch (err) { console.error(err);
        res.status(500).json({error: err.message});
    }
};

exports.login =async(req,res) => {
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email});
        if(!user) return res.status(400).json({msg: 'No User'});

        const match=await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({msg: 'Wrong Password'});

        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET);
        res.json({token, user:{username:user.username, email:user.email}});

    } catch (err) { res.status(500).json({error:err.message}); }
};

exports.getProfile = async (req,res) => {
    try {
        const user=await User.findById(req.userId).select('-password');
        if(!user) return res.status(404).json({msg: 'User Not Found'});
        res.json(user);

    } catch (err) {console.log(err);res.status(500).json({error: err.message}); }
};


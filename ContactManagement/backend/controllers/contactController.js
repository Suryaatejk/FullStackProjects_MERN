const Contact=require('../models/Contact');

exports.getContacts=async (req,res) => {

    try{
        const {q, favourite} =req.query;

        let filter={user:req.userId};
        if(q) filter.name = {$regex:q , $options: 'i'};

        if(favourite) filter.favourite = favourite === 'true';

        const contacts = await Contact.find(filter).sort({name:1});

        res.json(contacts);
    } catch (err) { res.status(500).json({error: err.message});}
};

exports.addContact = async (req, res) => {
    try {
        const {name, email, phone, address} = req.body;

        const contact =await Contact.create({
            user:req.userId, name, email, phone, address,
        });

        res.status(201).json(contact);

    } catch (err) {res.status(500).json({error:err.message});}
};

exports.getContact= async (req, res) => {
    try {
        const contact= await Contact.findOne({ _id:req.params.id, user:req.userId});
        
        if(!contact) return res.status(404).json({msg: 'Not Found'});

        res.json(contact);
    } catch(err) {res.status(500).json({error: err.message});}

};

exports.editContact = async(req, res) => {
    try {
        const contact=await Contact.findOneAndUpdate(
            {_id:req.params.id, user: req.userId }, req.body,{new: true} );

            if(!contact) return res.status(404).json({msg: 'Not Found'});

            res.json(contact);       
    } catch(err) {res.status(500).json({error: err.message});}
}

exports.deleteContact =async (req, res) => {
    try {
        const contact=await Contact.findOneAndDelete({_id:req.params.id, user: req.userId});
        
        if(!contact) res.status(404).json({msg: 'Not Found'});

        res.json({msg: 'Contact Deleted'});
    } catch(err) {res.status(500).json({error: err.message});}
};

exports.favContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate (
            {_id:req.params.id, user: req.userId}, {favourite: req.body.favourite}, {new: true});

            if(!contact) return res.status(404).json({msg: 'Not Found'});

            res.json(contact);
    } catch(err) {res.status(500).json({error: err.message});}
};
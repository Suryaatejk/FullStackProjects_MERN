const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// Get total contacts for the logged-in user
router.get('/count', auth, async (req, res) => {
  try {
    const count = await Contact.countDocuments({ user: req.userId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const {
    getContacts, addContact, getContact, editContact, deleteContact, favContact
}=require('../controllers/contactController');

router.use(auth);

router.get('/', getContacts);

router.post('/', addContact);

router.get('/:id', getContact);

router.put('/:id', editContact);

router.delete('/:id', deleteContact);

router.patch('/:id/favourite', favContact);

module.exports=router;
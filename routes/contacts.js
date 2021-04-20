const express = require( "express" );
const router = express.Router();
const Contact = require( "../models/Contact" );

// Get all contacts
router.get( "/", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch(err) {
        res.status(500).json({ msg: err.message });
    }
});

// Get contact by id
router.get( "/:id", getContact, async (req, res) => {
    res.send( res.contact );
});

// Add contact
router.post( "/", async (req, res) =>  {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email
    })

    try {
        const newContact = await contact.save();
        res.status(201).json( newContact );
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Update 1 contact
router.patch( "/:id", getContact, async (req, res) => {
    if ( req.body.name != null ) {
        res.contact.name = req.body.name;
    }
    if ( req.body.email != null ) {
        res.contact.email = req.body.email;
    }
    if ( req.body.phone != null ) {
        res.contact.email = req.body.phone;
    }
    if ( req.body.address != null ) {
        res.contact.address = req.body.address;
    }

    try {
        const updatedContact = await res.contact.save();
        res.json( updatedContact );
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
})

// Delete contact
router.delete( "/:id", getContact, async (req, res) => {
    try {
        await res.contact.remove();
        res.json({ msg: "Deleted Contact" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

async function getContact( req, res, next ) {
    let contact;
    try {
        contact = await Contact.findById( req.params.id );
        if ( contact == null ) {
            return res.status(404).json({ msg: `Contact with id ${req.params.id} couldn't be found.` })
        } 
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }

    res.contact = contact;
    next();
}

module.exports = router;
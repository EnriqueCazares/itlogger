const express = require('express');
const router = express.Router();

const Log = require('../models/Log');

// @route       GET api/logs
// @desc        Get all logs
// @access      Private
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find();

    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/logs
// @desc        Add new log
// @access      Private
router.post(
  '/', async (req, res) => {
    const { message, attention, tech } = req.body;

    try {
      const newLog = new Log({
        message,
        attention,
        tech
      });

      const log = await newLog.save();

      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/*
// @route       PUT api/contact/:id
// @desc        Update contact
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/contact/:id
// @desc        Delete contact
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
*/

module.exports = router;

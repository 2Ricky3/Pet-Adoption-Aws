const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Pet = require('../models/Pet');
const authAdmin = require('../middleware/authAdmin'); // Import the authAdmin middleware



// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensures the folder is created if it doesn't exist
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });

// Route to publish a new pet
router.post('/publish', upload.single('image'), async (req, res) => {
  try {
    const newPet = new Pet({
      name: req.body.name,
      age: req.body.age,
      breed: req.body.breed,
      image:  `uploads/${req.file.filename}` // Save the relative path
    });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ error: 'Failed to publish pet' });
  }
});

// Admin route to remove pets
router.delete('/admin/remove-pet/:id', authAdmin, async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet' });
  }
});

// Route to fetch all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});


module.exports = router;

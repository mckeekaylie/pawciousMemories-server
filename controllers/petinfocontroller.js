const express = require('express');
const router = express.Router();
const InfoModel = require('../db').import('../models/petinfo.js');
const multer = require('multer');

// CHANGE FILENAME
const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// NOT ALLOW FILES THAT AREN'T JPEG OR PNG
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    dest: '/tmp/', //SET FOLDER DESTINATION
    limits: { // SET FILE SIZE LIMIT
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter //CALL FILE FILTER
});


// post pet info
router.post('/pet', upload.single('file'), (req, res) => {
    const infoFromRequest = {
        file: req.file.path,
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        dob: req.body.dob,
        dateOfAdoption: req.body.dateOfAdoption,
        adoptOrFoster: req.body.adoptOrFoster,
        owner: req.user.id
    }

    InfoModel.create(infoFromRequest)
        .then(info => res.status(200).json(info))
        .catch(err => res.json({
            error: err
        }))
})
 
// update pet info
router.put('/pet/:id', (req, res) => {
    InfoModel.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(info => res.status(200).json(info))
        .catch(err => res.json(err))
})

// get a pet's info
router.get('/pet/:id', (req, res) => {
    InfoModel.findOne({
        where: {
            id: req.params.id
        }
})
    .then(info => res.status(200).json(info))
    .catch(err => res.status(500).json({
        error: err
    }))
})

//get all pets for an individual user
router.get('/pet', (req, res) => {
    InfoModel.findAll({
        where: { owner: req.user.id }
    })
        .then(info => res.status(200).json(info))
        .catch(err => res.status(500).json({
            error: err
        }))
});



module.exports = router;


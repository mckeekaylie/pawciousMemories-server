const express = require('express');
const router = express.Router();
const InfoModel = require('../db').import('../models/petinfo.js');

// post pet info
router.post('/pet', (req, res) => {
    const infoFromRequest = {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        dob: req.body.dob,
        dateOfAdoption: req.body.dateOfAdoption,
        adoptOrFoster: req.body.adoptOrFoster
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


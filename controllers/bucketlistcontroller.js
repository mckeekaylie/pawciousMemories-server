const express = require('express');
const router = express.Router();
const Log = require('../db').import('../models/bucketlist.js');

// post a bucket list band
router.post('/band', (req, res) => {
    const logFromRequest = {
        bands: req.body.bands,
        owner: req.user.id
    }

    Log.create(logFromRequest)
        .then(log => res.status(200).json(log))
        .catch(err => res.json({
            error: err
        }))
})

// delete a bucket list band
router.delete('/band/:id', (req, res) => {
    Log.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.json({
        error: err
    }))
});

// get a bucket list band
router.get('/band/:id', (req, res) => {
    Log.findOne({
        where: {
            id: req.params.id
        }
})
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({
        error: err
    }))
})

//get all bucket list bands for an individual user
router.get('/band', (req, res) => {
    Log.findAll({
        where: { owner: req.user.id }
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({
            error: err
        }))
});


module.exports = router;


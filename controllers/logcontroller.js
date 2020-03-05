const express = require('express');
const router = express.Router();
const Log = require('../db').import('../models/log.js');

// post a concert
router.post('/concert', (req, res) => {
    const logFromRequest = {
        date: req.body.date,
        title: req.body.title,
        bands: req.body.bands,
        venue: req.body.venue,
        owner: req.user.id
    }

    Log.create(logFromRequest)
        .then(log => res.status(200).json(log))
        .catch(err => res.json({
            error: err
        }))
})

// update a concert
router.put('/concert/:id', (req, res) => {
    Log.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.json(err))
})

// delete a concert
router.delete('/concert/:id', (req, res) => {
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

// get a concert
router.get('/concert/:id', (req, res) => {
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

//get all logs for an individual user
router.get('/concert', (req, res) => {
    Log.findAll({
        where: { owner: req.user.id }
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({
            error: err
        }))
});



module.exports = router;


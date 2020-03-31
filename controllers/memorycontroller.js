const express = require('express');
const router = express.Router();
const MemModel = require('../db').import('../models/memory.js')

// post a memory
router.post('/memory', (req, res) => {
    const memFromRequest = {
        memory: req.body.memory,
        pet: req.body.pet,
        owner: req.user.id
    }

    MemModel.create(memFromRequest)
        .then(mem => res.status(200).json(mem))
        .catch(err => res.json({
            error: err
        }))
})

// delete a memory
router.delete('/memory/:id', (req, res) => {
    MemModel.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(mem => res.status(200).json(mem))
    .catch(err => res.json({
        error: err
    }))
});

// update a memory
router.put('/memory/:id', (req, res) => {
    MemModel.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(mem => res.status(200).json(mem))
        .catch(err => res.json(err))
})

// get a memory
router.get('/memory/:id', (req, res) => {
    MemModel.findOne({
        where: {
            id: req.params.id
        }
})
    .then(mem => res.status(200).json(mem))
    .catch(err => res.status(500).json({
        error: err
    }))
})

//get all memories for an individual user
router.get('/memory', (req, res) => {
    MemModel.findAll({
        where: { owner: req.user.id }
    })
        .then(mem => res.status(200).json(mem))
        .catch(err => res.status(500).json({
            error: err
        }))
});


module.exports = router;


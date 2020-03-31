const express = require('express');
const router = express.Router();
const GalleryModel = require('../db').import('../models/photogallery.js');

// upload variables
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: '/tmp/'});

// post an image
router.post('/image', upload.single('file'), (req, res) => {
    let file = req.file;

    const imgFromReq = {
        file: file.path,
        title: req.body.title,
        caption: req.body.caption,
        owner: req.user.id
    }

    GalleryModel.create(imgFromReq) 
        .then(img => res.status(200).json(img))
        .catch(err => res.json({
            error: err
        }))
  })

// delete an iamge
router.delete('/image/:id', (req, res) => {
    GalleryModel.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(img => res.status(200).json(img))
        .catch(err => res.json(err))
})

// get an image
router.get('/image/:id', (req, res) => {
    GalleryModel.findOne({
        where: {
            id: req.params.id
        }
})
    .then(img => res.status(200).json(img))
    .catch(err => res.status(500).json({
        error: err
    }))
})

//get all images for an individual user
router.get('/image', (req, res) => {
    GalleryModel.findAll({
        where: { owner: req.user.id }
    })
        .then(img => res.status(200).json(img))
        .catch(err => res.status(500).json({
            error: err
        }))
});

module.exports = router;


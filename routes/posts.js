const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({'dest': 'uploads/'})
const { asyncErrorHandler } = require('../middleware');
const { postIndex, 
        postNew,
        postCreate,
        postShow,
        postEdit,
        postUpdate,
        postDelete } = require('../controllers/posts');
const { create } = require('../models/user');

/* GET posts index /posts  */
router.get('/', asyncErrorHandler(postIndex));

/* GET --> new --> /posts/new */
router.get('/new', postNew);

/* POST --> create --> /posts */
router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));

/* GET --> show --> /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET --> edit --> /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* PUT --> update --> /posts/:id */
router.put('/:id', asyncErrorHandler(postUpdate));

/* DELETE --> destroy --> /posts/:id */
router.delete('/:id', asyncErrorHandler(postDelete));


module.exports = router;
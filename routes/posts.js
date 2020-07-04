const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware');
const { getPosts, 
        newPost,
        createPost,
        showPost } = require('../controllers/posts');
const { create } = require('../models/user');

/* GET posts index /posts  */
router.get('/', errorHandler(getPosts));

/* GET --> new --> /posts/new */
router.get('/new', newPost);

/* POST --> create --> /posts */
router.post('/', errorHandler(createPost));

/* GET --> show --> /posts/:id */
router.get('/:id', errorHandler(showPost));

/* GET --> edit --> /posts/:id/edit */
router.get('/:id/edit', (req, res, next) =>  {
    res.send('EDIT /posts/:id/edit');
  });

/* PUT --> update --> /posts/:id */
router.put('/:id', (req, res, next) =>  {
    res.send('UPDATE /posts/:id');
  });

/* DELETE --> destroy --> /posts/:id */
router.delete('/:id', (req, res, next) =>  {
    res.send('DESTROY /posts/:id');
  });


module.exports = router;
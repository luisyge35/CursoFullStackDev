const express = require('express');
const router = express.Router({mergeParams: true});

/* GET reviews index /posts/:id/reviews  */
router.get('/', (req, res, next) =>  {
    res.send('INDEX /posts/:id/reviews');
  });

/* POST --> create --> /posts/:id/reviews */
router.post('/', (req, res, next) =>  {
    res.send('CREATE /reviews');
  });

/* GET --> edit --> /posts/:id/reviews/:review_id/edit */
router.get('/:review_id/edit', (req, res, next) =>  {
    res.send('EDIT /reviews/:id/edit');
  });

/* PUT --> update --> /:id/reviews/:review_id */
router.put('/:review_id', (req, res, next) =>  {
    res.send('UPDATE /reviews/:id');
  });

/* DELETE --> destroy --> /posts/:id/reviews/:review_id */
router.delete('/:review_id', (req, res, next) =>  {
    res.send('DESTROY /reviews/:id');
  });


module.exports = router;
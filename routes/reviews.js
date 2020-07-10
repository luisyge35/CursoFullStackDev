const express = require('express');
const router = express.Router({mergeParams: true});
const { asyncErrorHandler,
        isReviewAuthor } = require('../middleware/index');
const {
  reviewCreate,
  reviewUpdate,
  reviewDelete
} = require('../controllers/reviews')

/* POST --> create --> /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT --> update --> /:id/reviews/:review_id */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(reviewUpdate));

/* DELETE --> destroy --> /posts/:id/reviews/:review_id */
router.delete('/:review_id', isReviewAuthor, asyncErrorHandler(reviewDelete));

module.exports = router;
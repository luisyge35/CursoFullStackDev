const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>  {
  res.render('index', { title: 'Surf Shop - Home' });
});

/* GET /register */
router.get('/register', (req, res, next) => {
  res.send('GET /register')
});

/* POST /register */
router.post('/register', (req, res, next) => {
  res.send('POST /register')
});

/* GET /login */
router.get('/login', (req, res, next) => {
  res.send('GET /login')
});

/* POST /login */
router.post('/login', (req, res, next) => {
  res.send('POST /login')
});

/* GET /profile */
router.get('/profile', (req, res, next) => {
  res.send('GET /profile')
});

/* PUT /profile/:user_id --> para actualizar */
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT /profile/:user_id');
});

/* GET /forgot-password */
router.get('/forgot-pw', (req, res, next) => {
  res.send('GET /forgot-password')
});

/* PUT /forgot-password */
router.put('/forgot-pw', (req, res, next) => {
  res.send('PUT /forgot-password')
});

/* GET /reset-password */
router.get('/reset-pw/:token', (req, res, next) => {
  res.send('GET /reset-password/:token')
});

/* PUT /reset-password */
router.put('/reset-pw/:token', (req, res, next) => {
  res.send('PUT /reset-password/:token')
});




module.exports = router;

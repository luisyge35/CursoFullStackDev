const express           = require('express');
const router            = express.Router();
const { postRegister, postLogin, getLogout }  = require('../controllers/index');
const { errorHander }   = require('../middleware');
const { asyncErrorHandler }  = require('../middleware/index');


/* GET home page. */
router.get('/', (req, res, next) =>  {
  res.render('index', { title: 'Surf Shop - Home' });
});

/* GET /register */
router.get('/register', (req, res, next) => {
  res.send('GET /register')
});

/* POST /register */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', (req, res, next) => {
  res.send('GET /login')
});

/* POST /login */
router.post('/login', postLogin);

/*GET /logout */
router.get('/logout', getLogout)

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

/* GET /reset-password/:token */
router.get('/reset-pw/:token', (req, res, next) => {
  res.send('GET /reset-password/:token')
});

/* PUT /reset-password/:token */
router.put('/reset-pw/:token', (req, res, next) => {
  res.send('PUT /reset-password/:token')
});




module.exports = router;

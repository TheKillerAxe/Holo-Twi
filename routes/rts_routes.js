const { Router } = require('express');

const home = require('../app/controllers/home');
const register = require('../app/controllers/register');

const router = Router();

router.get('/', (req, res) => { res.redirect('/home'); });

router.get('/home', home.renderPage);

module.exports = router;
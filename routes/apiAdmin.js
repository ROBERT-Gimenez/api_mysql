const router = require('express').Router();

const apiUser = require('./api/userAdmin');

router.use('/user' , apiUser);

module.exports = router ;
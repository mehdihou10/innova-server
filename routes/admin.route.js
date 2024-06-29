const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const adminValidation = require('../middlewares/admin.validate');


router.post('/login',adminValidation.login,adminController.login);

module.exports = router;
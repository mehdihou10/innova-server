const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact.controller');
const contactValidate = require('../middlewares/contact.validate');

router.get("/",contactController.getContact);
router.put("/update/:contactId",contactValidate.contact,contactController.updateContact);



module.exports = router;
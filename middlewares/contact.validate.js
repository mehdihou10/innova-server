const {body} = require('express-validator');

module.exports = {

    contact: [

        body("email").notEmpty().withMessage("Empty Email"),
        body("phone_number").notEmpty().withMessage("Empty Phone Number"),
        body("second_phone_number").notEmpty().withMessage("Empty Second Phone Number"),
        body("address").notEmpty().withMessage("Empty Address"),
        body("facebook").notEmpty().withMessage("Empty Facebook")

    ]
}
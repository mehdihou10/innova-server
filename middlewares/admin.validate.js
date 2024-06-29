const {body} = require('express-validator');

module.exports = {

    login: [

        body("email")
        .isEmail().withMessage("Please Add a Valid Email Syntax"),

        body("password")
        .notEmpty().withMessage('Please Add a Password')
        
    ]
}
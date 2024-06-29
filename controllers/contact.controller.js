const Contact = require('../models/contact.model');
const createError = require('../utils/create.error');
const httpStatus = require('../utils/http.status');
const {validationResult} = require('express-validator');
const asyncWrapper = require('../middlewares/async.wrapper');


const getContact = asyncWrapper( async(req,res,next)=>{

    const contact = await Contact.find();

    res.json({status: httpStatus.SUCCESS,contact});
})

const updateContact = asyncWrapper( async(req,res,next)=>{

    const {contactId} = req.params;

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        const error = createError(httpStatus.FAIL,400,errors.array());
        return next(error);

    }

    await Contact.findByIdAndUpdate(contactId,{$set: req.body});

    res.json({status: httpStatus.SUCCESS});
})



module.exports = {
    getContact,
    updateContact
}
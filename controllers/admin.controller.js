const Admin = require('../models/admin.model');
const generateToken = require('../utils/generate.token');
const bcrypt = require('bcryptjs');
const createError = require('../utils/create.error');
const httpStatus = require('../utils/http.status');
const {validationResult} = require('express-validator');
const asyncWrapper = require('../middlewares/async.wrapper');



const login = asyncWrapper( async (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        const error = createError(httpStatus.FAIL,400,errors.array());
        return next(error);

    }

    const {email,password} = req.body;


    const admin = await Admin.find({email});

    if(admin.length === 0){

        const error = createError(httpStatus.FAIL,400,[{msg: "Incorrect Email"}]);
        return next(error);

    }


    const isCorrectPassword = await bcrypt.compare(password,admin[0].password);

    if(!isCorrectPassword){

        const error = createError(httpStatus.FAIL,400,[{msg: "Incorrect Password"}]);
        return next(error);

    }

    const token = generateToken({id: admin[0]._id, email: admin[0].email});

    res.json({status: httpStatus.SUCCESS,token})
})


module.exports = {
    login,
}
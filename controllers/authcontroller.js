const registrationModel = require('./../models/registration'); 
const {
    statusCode,
    returnErrorJsonResponse,
    returnJsonResponse,
  } = require("../Helpers/status.js");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signToken = (email, role) =>{
    return jwt.sign({email: email, role: role}, "secretkey23456", {
        expiresIn: "90d"
    });
}
exports.registration = async(req,res) => {
    try {

        const newUser = await registrationModel.create(req.body);
        console.log(newUser);

        const token = signToken(newUser.email ,newUser.role);
        console.log(token);
        if(newUser){
            res.set( {
                'token': token
            });
            res.redirect('/login')
            //res.redirect('/login'); 
        }else{
            return res
            .status(statusCode.bad)
            .json(
              returnErrorJsonResponse(
                statusCode.bad,
                "fail",
                "Something went wrong, couldnt save user",
                error
              )
            );            
        }
        


    } catch (error) {
        return res
        .status(statusCode.bad)
        .json(
          returnErrorJsonResponse(
            statusCode.bad,
            "fail",
            "Something went wrong, Please try again",
            error
          )
        );        
    }
}


exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await registrationModel.find({email: email}).select('+password');

        if(!user || !(await bcrypt.compare(password, user[0].password))){
            console.log("here1")
            return res
            .status(statusCode.unauthorized)
            .json(
              returnErrorJsonResponse(
                statusCode.unauthorized,
                "fail",
                "Incorrect email or password",
                error
              )
            );           
        }

        ///send token
        console.log("here");
        const token = signToken(user[0].email, user[0].role);
        console.log(token);

        return res
        .status(statusCode.success)
        .json(
            returnJsonResponse(
            statusCode.success,
            "success",
            "Logged in",
            token
          )
        );
    } catch (error) {
        return res
        .status(statusCode.bad)
        .json(
          returnErrorJsonResponse(
            statusCode.bad,
            "fail",
            "Something went wrong, Please try again",
            error
          )
        );        
    }
}
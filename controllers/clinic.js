const clinicModel = require('./../models/clinics');

const {
    statusCode,
    returnErrorJsonResponse,
    returnJsonResponse,
  } = require("../Helpers/status.js");

exports.addClinic = async (req,res) =>{
    try {
        const clinic = await clinicModel.create(req.body);
        return res
        .status(statusCode.success)
        .json(
            returnJsonResponse(
            statusCode.success,
            "success",
            "Clinic added",
            clinic
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


exports.getClinic = async (req,res) => {
    try {
        const clinic = clinicModel.find();
        return res
            .status(statusCode.success)
            .json(
                returnJsonResponse(
                statusCode.success,
                "success",
                "Available Clinics",
                clinic
              )
            );        
    } catch (error) {
        return res
        .status(statusCode.bad)
        .json(
          returnErrorJsonResponse(
            statusCode.bad,
            "fail",
            "Something went wrong, Couldnt fetch clinic",
            error
          )
        );        
    }        
}
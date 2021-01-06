const registrationModel = require('./../models/registration');
const leaveModel = require('./../models/leave'); 

const {
    statusCode,
    returnErrorJsonResponse,
    returnJsonResponse,
  } = require("../Helpers/status.js");

exports.applyLeave = async (req,res) => {
    try {
        const {from ,to, jobs} = req.body;
        const { name, email, role} = req.user
        const createLeave = await leaveModel.create({
            name: name,
            email: email,
            role: role,
            onleave: true,
            pendingJob: jobs,
            "leaveDuration.from": from,
            "leaveDuration.to": to
        })
        // const updateleave = await registrationModel.findOneAndUpdate({email: req.user.email}, {
        //     $set:{
        //         onleave: true,
        //         pendingJob: jobs,
        //         "leaveDuration.from": from,
        //         "leaveDuration.to": to
        //     }
        // })
        if(createLeave){
            return res.render("leaveapplied");
        }
    } catch (error) {
        
    }

}

exports.addmedical = async (req,res) => {
    try {
        const medicalCertificateName = req.file.filename;
        const updateLeave = await leaveModel.findOneAndUpdate({email: req.user.email}, {
            $set: {
                medicalCertificate: medicalCertificateName,
                medicalCertificateApproved: false
            }
        });
        if(updateLeave){
            res.render("medicalapplied");
        }
        
    } catch (error) {
        
    }
}

exports.onleave = async (req,res) => {
    try {
        const onleave = await leaveModel.find({onleave: true});
        return res
            .status(statusCode.success)
            .json(
                returnJsonResponse(
                statusCode.success,
                "success",
                "Employee on Leave",
                onleave
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


exports.pendingJob = async (req,res) => {
    try {
        const result = await leaveModel.find({onleave: true});

        const pendingJob = [];
        for(i=0; i< result.length; i++){
            pendingJob[i] = {
                name: result[i].name,
                email: result[i].email,
                pendingJob: result[i].pendingJob,
            }
        }
        return res
            .status(statusCode.success)
            .json(
                returnJsonResponse(
                statusCode.success,
                "success",
                "Employee on Leave",
                pendingJob
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
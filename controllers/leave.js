const registrationModel = require('./../models/registration');
const leaveModel = require('./../models/leave'); 
const fs = require('fs');

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

exports.showMedical = async (req,res) => {
    try {
        const result = await leaveModel.find({medicalCertificateApproved: false});

        const showMedical = [];
        for(i=0; i< result.length; i++){
            showMedical[i] = {
                id: result[i]._id,
                name: result[i].name,
                email: result[i].email
            }
        }
        return res
            .status(statusCode.success)
            .json(
                returnJsonResponse(
                statusCode.success,
                "success",
                "Employee on Leave",
                showMedical
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

exports.seeMedical = async (req,res) => {
    try {
        const id = req.params.id;
        const result = await leaveModel.findById(id);
        const medicalCertificate = result.medicalCertificate
        if(medicalCertificate === "Not Yet Applied"){
            return res.render("medicalnotapplied", {
                post: {
                    name: result.name
                }
            });
        }else{
            return res.render("seemedical", {
                post: {
                    medical: medicalCertificate
                }
            })
        }
        // var mimetype;
        // fs.readFile(appRoot + '/public/medicalCertificates/' + medicalCertificate, function(err, data) {
        //     if (err) throw err // Fail if the file can't be read.
        //     const ext = id.split(".")[1];
        //     if(ext === "pdf"){
        //         mimetype = 'application/pdf'
        //     }else{
        //         mimetype = 'image/jpeg'
        //     }
        //     res.writeHead(200, {'Content-Type': mimetype})
        //     res.end(data);
        //   })
    } catch (error) {
        return res
        .status(statusCode.bad)
        .json(
          returnErrorJsonResponse(
            statusCode.bad,
            "fail",
            "Something went wrong, Couldnt fetch medical certificate",
            error
          )
        );
    }
}


exports.medicalapproved = async (req,res) => {
    try {
        const id = req.params.id;
        const result = await leaveModel.findById(id);
        if(result){
            const medicalCertificate = result.medicalCertificate;
            if(medicalCertificate === "Not Yet Applied"){
                return res.render("medicalnotapplied", {
                    post: {
                        name: result.name
                    }
                });
            }
            
            const approveMedical = await leaveModel.findOneAndUpdate({_id: id}, {
                $set: {
                    medicalCertificateApproved: true
                }
            });
            if(approveMedical){
                res.render("approved", {
                    post: {
                        name: approveMedical.name
                    }
                })
            }else{
                res.render("404");
            }
            
        }else{
            res.render("404");
        }
        // const approveMedical = await leaveModel.findOneAndUpdate({_id: id, medicalCertificate: {$ne: "Not Yet Applied"}}, {
        //     $set: {
        //         medicalCertificateApproved: true
        //     }
        // });
        // if(approveMedical){
        //     const medicalCertificate = approveMedical.medicalCertificate;
        //     if(!medicalCertificate === "Not Yet Applied"){
        //         res.render("approved", {
        //             post: {
        //                 name: approveMedical.name
        //             }
        //         })
        //     }else{
        //         return res.render("medicalnotapplied", {
        //             post: {
        //                 name: approveMedical.name
        //             }
        //         });
        //     }
            
        // }else{
        //     res.render("404");
        // }
    } catch (error) {
        return res
        .status(statusCode.bad)
        .json(
          returnErrorJsonResponse(
            statusCode.bad,
            "fail",
            "Something went wrong, Couldnt approve medical certificate",
            error
          )
        );        
    }
}
const registrationModel = require('./../models/registration'); 

exports.applyLeave = async (req,res) => {
    try {
        const {from ,to, jobs} = req.body;

    const updateLeave = await registrationModel.findOneAndUpdate({email: "seekerofsecret@gmail.com"}, {
        $set:{
            onleave: true,
            pendingJob: jobs,
            "leaveDuration.from": from,
            "leaveDuration.to": to
        }
    })

    if(updateLeave){
        return res.render("leaveapplied");
    }
    } catch (error) {
        
    }

}

exports.addmedical = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
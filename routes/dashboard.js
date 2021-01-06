const express = require('express');
const router = express.Router();

const { protect } = require('./../controllers/authcontroller');


router.get('/dashboard', protect, (req,res) =>{
    
    if(req.user.role === 'employee'){
        res.render("employee-dashboard");
    }else if(req.user.role === 'admin'){
        res.render("admin-dashboard");
    }else{
        res.send(req.user.role);
    }
    
});


module.exports = router;
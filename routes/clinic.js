const express = require('express');
const router = express.Router();

const { getClinic, addClinic } = require("../controllers/clinic");
const { protect, restrictTo } = require('./../controllers/authcontroller');


router.post('/addclinic', protect, restrictTo('admin'), addClinic);
router.get('/addclinic',protect, restrictTo('admin'), (req,res) =>{
    res.render("addclinic");
})
router.get('/get-clinic', protect, restrictTo('employee'), getClinic);
router.get('/listclinics', protect, restrictTo('employee'), (req,res) =>{
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .render("listclinics");
});


module.exports = router;
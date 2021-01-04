const express = require('express');
const router = express.Router();
const multer = require('multer');

const { applyLeave, addmedical } = require("../controllers/leave");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post('/applyleave',applyLeave);
router.get('/applyleave', (req,res) =>{
    res.render("leaveform");
})

router.post('/addmedical', addmedical);
router.get('/addmedical', (req,res) => {
    res.render("medicalform")
})


module.exports = router;
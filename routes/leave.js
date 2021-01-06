const express = require('express');
const router = express.Router();
const multer = require('multer');

const { applyLeave, addmedical, onleave, pendingJob } = require("../controllers/leave");
const { protect, restrictTo } = require('./../controllers/authcontroller');

const multerStorage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, './public/medicalCertificates')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.email}-${Date.now()}.${ext}`);
    }
});

const upload  = multer({
    storage: multerStorage
});

router.post('/applyleave', protect, restrictTo('employee'), applyLeave);
router.get('/applyleave', protect, restrictTo('employee'), (req,res) =>{
    res.render("leaveform");
})

router.post('/addmedical', protect, restrictTo('employee'), upload.single("file") , addmedical);
router.get('/addmedical', protect, restrictTo('employee'), (req,res) => {
    res.render("medicalform")
})

router.get('/on-leave', protect, restrictTo('admin'), onleave);
router.get('/onleave', protect, restrictTo('admin'), (req,res) => {
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .render("onleave");
})

router.get('/pending-job', protect, restrictTo('admin'), pendingJob);
router.get('/pendingjobs', protect, restrictTo('admin'), (req,res) => {
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .render("pendingjob");
})

module.exports = router;
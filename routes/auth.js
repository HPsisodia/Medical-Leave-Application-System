const express = require('express');
const router = express.Router();

const { registration, login } = require("../controllers/authcontroller");

router.post('/', registration);
router.get('/', (req,res) =>{
    res.render("register");
});

router.post('/login', login);
router.get('/login', (req,res) =>{
    res.render("login");
});

module.exports = router;
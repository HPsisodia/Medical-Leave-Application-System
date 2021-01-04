const express = require('express');
const router = express.Router();

const { getClinic, addClinic } = require("../controllers/clinic");

router.post('/addclinic', addClinic);
router.get('/getclinic', getClinic);


module.exports = router;
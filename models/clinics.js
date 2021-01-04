const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const clinicSchema = new schema({
    name: {
        type: String
    },

    address: {
        type: String
    },

    phoneNo: {
        type: String
    }
});


const clinicModel = mongoose.model("clinic", clinicSchema);

module.exports = clinicModel;
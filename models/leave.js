const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const leaveSchema = new schema({

    name: {
        type: String
    },

    email: {
        type: String,
    },

    role: {
        type: String
    },

    onleave: {
        type: Boolean
    },

    leaveDuration: {
        from: {
            type: String
        },
        to: {
            type: String
        }
    },

    medicalCertificate: {
        type: String,
        default: "Not Yet Applied"
    },

    medicalCertificateApproved: {
        type: Boolean,
        default: false
    },

    pendingJob: {
        type: String,
    }
});

const leaveModel = mongoose.model("leave", leaveSchema);

module.exports = leaveModel;
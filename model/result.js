const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    rollno: {
        type: Number
    },
    subject1: {
        type: Number
    },
    subject2: {
        type: Number
    },
    subject3: {
        type: Number
    },
    subject4: {
        type: Number
    },
    subject5: {
        type: Number
    },
    total: {
        type: Number
    },
    per: {
        type: Number
    },
    grade: {
        type: String
    },
    student_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "student"
    }
});



module.exports = mongoose.model('Result', resultSchema);

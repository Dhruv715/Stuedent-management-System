const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    image : {
        type : String
    },
    rollno : {
        type : Number,
        unique: true,
        required: true 
    },
    grno : {
        type : Number
    },
    name : {
        type :String
    },
    email : {
        type: String
    },
    password : {
        type :String
    },
    class : {
        type : String
    },
    batch : {
        type :String
    }
})

module.exports = mongoose.model('student',Schema);
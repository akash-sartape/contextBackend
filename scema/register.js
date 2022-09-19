let mongoose = require('mongoose');

let registerSchema = new mongoose.Schema({
       user_name : {
        type : String,
        minLength : 3,
        maxlength : 50,
        require : true
    },
    user_email : {
        type : String,
        require : true,
        unique : true
    },
    user_mobileNumber : {
        type : String,
        require : true,
        minLength:10,
        maxlength:10

    },
    user_password : {
        type : String,
        require : true,
        minLength:7
    }
})

let registermodel = mongoose.model('register',registerSchema);

module.exports = registermodel 


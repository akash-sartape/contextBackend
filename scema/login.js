let mongoose = require('mongoose');

let loginSchema = new mongoose.Schema({
    emp_profile : {
        type : String

    }
    
})

let loginmodel = mongoose.model('emp_profile',employeeSchema);

module.exports = loginmodel 


let mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    emp_salary : {
        type : String

    }
    
})

let employeesalarymodel = mongoose.model('emp_salary',employeeSchema);

module.exports = employeesalarymodel 


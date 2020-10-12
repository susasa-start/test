const mongoose = require('mongoose');
var StudentsSchema = mongoose.Schema({
    name: String,
    age: String,
    sex: String
});
var studentsModel = mongoose.model('students', StudentsSchema);
module.exports = studentsModel;
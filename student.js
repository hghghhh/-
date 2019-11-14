var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/itcast',{ useNewUrlParser: true });

var studentSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    gender:{
        type:Number,
        require:true,
        enum:[0,1],
        default:0
    },
    age:{
        type:Number
    },
    hobbies:{
        type:String
    }
})

module.exports = mongoose.model('Student',studentSchema);
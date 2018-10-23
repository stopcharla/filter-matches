var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var matchSchema = new Schema({
    display_name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    job_title:{
        type:String
    },
    height_in_cm:{
        type: Number
    },
    city:{
        type:String
    },
    loc:{
        type:Object
    },
    compatibility_score:{
        type:Number
    },
    contacts_exchanged:{
        type:Boolean,
        default:false
    },
    favourite:{
        type:Boolean,
        default:false
    },
    religion:{
        type:String
    },
    userId:{
        type:String,
        unique:true
    },
    main_photo:{
        type:String
    }
})

module.exports = mongoose.model("matches",matchSchema);
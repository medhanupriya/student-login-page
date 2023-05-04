const mongoose = require("mongoose");
const studData = new mongoose.Schema({
    regno:{                     //register number
        type:String,
        required:true
    },
    name:{                     //name 
        type:String,
        required:true
    },
    gender:{                       //gender
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    phone:{                      //phone number
        type:Number,
        required:true
    },
    dob:{                       //date of birth  
        type:String,
        required:true
    },
    cntry:{                     //country
        type:String,        
    },
    email:{                     //email
        type:String,        
    },
    pwd:{                       //password
        type:String,
    },
    StFl   : {                  // Status flag
        type : String, 
        enum :["A","D"],
        default: "A"
    } 
})
module.exports = { "mStuRecords" :mongoose.model('studrecords',studData) };
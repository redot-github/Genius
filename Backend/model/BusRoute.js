const mongoose = require('mongoose');
const schema =mongoose.Schema;
const useschema = new schema({

    Vehicle_Number :{
        type : String,
        require : true,
    },
    Bus_Start_Point:{
        Location:{
            type : String,
            require : true,
        },
        Time:{
            type : String,
            require : true,
        }
    },
    Stop_1:{
        Location:{
            type : String,
            require : true,
        },
        Time:{
            type : String,
            require : true,
        }
    },
    Stop_2:{
        Location:{
            type : String,
            require : true,
        },
        Time:{
            type : String,
            require : true,
        }
    },
    Stop_3:{
        Location:{
            type : String,
            require : true,
        },
        Time:{
            type : String,
            require : true,
        }
    },
    Driver_Name :{
        type : String,
        require : true,
    },
    Attender_Name :{
        type : String,
        require : true,
    },
})

module.exports=mongoose.model('BusRoute',useschema)
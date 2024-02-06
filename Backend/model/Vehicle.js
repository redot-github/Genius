const mongoose = require('mongoose');
const schema =mongoose.Schema;
const useschema = new schema({
    Vehicle_Number :{
        type : String,
        require : true,
    },
    Vehicle_Manufacturer :{
        type : String,
        require : true,
    },
    Registration_Date :{
        type : Date,
        require : true,
    },
    Owner_Name :{
        type : String,
        require : true,
    },
    Pollution_Certificate_Photo:{
        type : String,
        require : true,
    },
    Pollution_Certificate:{
        Start:{
            type : String,
            require : true,
        },
        Expire:{
            type : String,
            require : true,
        }
    },
    Insurance_Photo:{
        type : String,
        require : true,
    },
    Insurance:{
        Start:{
            type : String,
            require : true,
        },
        Expire:{
            type : String,
            require : true,
        }
    },
       Vehicle_Fitness_Certificate_Photo:{
        type : String,
        require : true,
    },
    Vehicle_Fitness_Certificate:{
        Start:{
            type : String,
            require : true,
        },
        Expire:{
            type : String,
            require : true,
        }
    },
    Speed_Governor_Installed:{
        type : String,
        require : true,
    },
    Speed_Limit:{
        type : String,
        require : true,
    },
    Accident_Claims:{
        type : String,
        require : true,
    },
    Vehicle_Status:{
        type : String,
        require : true,
    },
    Service_History:{
        type : String,
        require : true,
    },
    Seating_Capacity:{
        Driver:{
            type : Number,
            require : true,
        },
        Attender:{
            type : Number,
            require : true,
        },
        Passenger:{
            type : Number,
            require : true,
        }
    },

});

module.exports=mongoose.model('Vehicle',useschema);
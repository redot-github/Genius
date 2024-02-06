const Vehicle = require('../model/Vehicle');
const mongoose = require('mongoose'); 

// http://localhost:4500/Vehicle/VehicleRegistration

const VehiclePost=async(req,res)=>{
    const{
        Vehicle_Number,
        Vehicle_Manufacturer,
        Registration_Date,
        Owner_Name,
        Pollution_Certificate_Photo,
        Pollution_Certificate,
        Insurance_Photo,
        Insurance,
        Vehicle_Fitness_Certificate_Photo,
        Vehicle_Fitness_Certificate,
        Speed_Governor_Installed,
        Speed_Limit,
        Accident_Claims,
        Vehicle_Status,
        Service_History,
        Seating_Capacity,
    }=req.body;

    const NewRegister = new Vehicle({
        Vehicle_Number,
        Vehicle_Manufacturer,
        Registration_Date,
        Owner_Name,
        Pollution_Certificate_Photo,
        Pollution_Certificate,
        Insurance_Photo,
        Insurance,
        Vehicle_Fitness_Certificate_Photo,
        Vehicle_Fitness_Certificate,
        Speed_Governor_Installed,
        Speed_Limit,
        Accident_Claims,
        Vehicle_Status,
        Service_History,
        Seating_Capacity,
    })
    try{
        await NewRegister.save();
    }catch(err){
        console.log(err)
    }
    return res.status(200).json({NewRegister})
}

// http://localhost:4500/Vehicle/VehicleDetalis

    const VehicleDetalis = async(req,res)=>{
        let Display;
        try{
            Display = await Vehicle.find();
        }catch(err){
            console.log(err)
        }
        if(!Display){
            return res.status(404).json({message:'Page Error'})
        }
        return res.status(404).json({Display})
    }

// http://localhost:4500/Vehicle/VehicleDetailUpdate/:id
    
    const VehicleDetailUpdate = async(req,res) =>{
        const id = req.params.id;
        const{
            Vehicle_Number,
            Vehicle_Manufacturer,
            Registration_Date,
            Owner_Name,
            Pollution_Certificate_Photo,
            Pollution_Certificate,
            Insurance_Photo,
            Insurance,
            Vehicle_Fitness_Certificate_Photo,
            Vehicle_Fitness_Certificate,
            Speed_Governor_Installed,
            Speed_Limit,
            Accident_Claims,
            Vehicle_Status,
            Service_History,
            Seating_Capacity,
        }=req.body;

        const UpdateVehicle = await Vehicle.findByIdAndUpdate(id,{
            Vehicle_Number,
            Vehicle_Manufacturer,
            Registration_Date,
            Owner_Name,
            Pollution_Certificate_Photo,
            Pollution_Certificate,
            Insurance_Photo,
            Insurance,
            Vehicle_Fitness_Certificate_Photo,
            Vehicle_Fitness_Certificate,
            Speed_Governor_Installed,
            Speed_Limit,
            Accident_Claims,
            Vehicle_Status,
            Service_History,
            Seating_Capacity,
        },{new:true});
            
        if(!UpdateVehicle){
            return res.status(404).json({message : "User Not Found"});
        }
        return res.status(200).json({UpdateVehicle});
        
    }

// http://localhost:4500/Vehicle/VehicleDetailDelete/:id

    const VehicleDetailDelete = async(req,res)=>{
        let Delete ;
        const id = req.params.id;
        try{
            Delete = await Vehicle.findByIdAndDelete({_id:id})
        }catch(err){
            console.log(err)
        }
        if(!Delete){
            return res.status(404).json({message :"VehicleDetali Has Deleted Already"})
        }
        res.status(200).json(Delete)
    }


exports.VehiclePost = VehiclePost;
exports.VehicleDetalis = VehicleDetalis;
exports.VehicleDetailUpdate = VehicleDetailUpdate;
exports.VehicleDetailDelete = VehicleDetailDelete;
const BusRoute = require("../model/BusRoute");
const mongoose = require("mongoose");

// http://localhost:4500/Vehicle/BusRoutePost

const BusRoutePost = async (req, res) => {
  const {
    Vehicle_Number,
    Bus_Start_Point,
    Stop_1,
    Stop_2,
    Stop_3,
    Driver_Name,
    Attender_Name,
  } = req.body;
  const NewRegister = new BusRoute({
    Vehicle_Number,
    Bus_Start_Point,
    Stop_1,
    Stop_2,
    Stop_3,
    Driver_Name,
    Attender_Name,
  });
  try {
    await NewRegister.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(404).json(NewRegister);
};

// http://localhost:4500/Vehicle/BusRouteDetails

const BusRouteDetails = async (req, res) => {
  let Display;
  try {
    Display = await BusRoute.find();
  } catch (err) {
    console.log(err);
  }
  if (!Display) {
    return res.status(404).json({ message: "Page Error" });
  }
  return res.status(200).json({ Display });
};

// http://localhost:4500/Vehicle/BusRouteDetailUpdate/:id

const BusRouteDetailUpdate = async(req,res) =>{
    const id = req.params.id;
    const {
        Vehicle_Number,
        Bus_Start_Point,
        Stop_1,
        Stop_2,
        Stop_3,
        Driver_Name,
        Attender_Name,
      } = req.body;
      const UpdateRoute = await BusRoute.findByIdAndUpdate(id,{
        Vehicle_Number,
        Bus_Start_Point,
        Stop_1,
        Stop_2,
        Stop_3,
        Driver_Name,
        Attender_Name,
      },{new:true});
      if(!UpdateRoute){
        return res.status(404).json({message : "User Not Found"});
    }
    return res.status(200).json({UpdateRoute});
    
}  
// http://localhost:4500/Vehicle/BusRouteDetailDelete/:id

    const BusRouteDetailDelete = async(req,res)=>{
        let Delete;
        const id = req.params.id;
        try{
            Delete = await BusRoute.findByIdAndDelete({_id:id})
        }catch(err){
            console.log(err)
        }if(!Delete){
            return res.status(404).json({message:'Error'})
        }
        return res.status(200).json(Delete)
    }

exports.BusRoutePost = BusRoutePost;
exports.BusRouteDetails = BusRouteDetails;
exports.BusRouteDetailUpdate = BusRouteDetailUpdate;
exports.BusRouteDetailDelete = BusRouteDetailDelete;
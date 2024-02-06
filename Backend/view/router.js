const express = require('express')

const router = express.Router();

const VehicleRegistrationController=require('../controller/VehicleController')
const BusRouteController = require ('../controller/BusRouteController')

//Vehicle Registration Details
router.post('/VehiclePost',VehicleRegistrationController.VehiclePost);
router.get('/VehicleDetalis',VehicleRegistrationController.VehicleDetalis);
router.put('/VehicleDetailUpdate/:id',VehicleRegistrationController.VehicleDetailUpdate);
router.delete('/VehicleDetailDelete/:id',VehicleRegistrationController.VehicleDetailDelete);


//Bus Route Details
router.post('/BusRoutePost',BusRouteController.BusRoutePost);
router.get('/BusRouteDetails',BusRouteController.BusRouteDetails);
router.put('/BusRouteDetailUpdate/:id',BusRouteController.BusRouteDetailUpdate);
router.delete('/BusRouteDetailDelete/:id',BusRouteController.BusRouteDetailDelete);
module.exports=router;
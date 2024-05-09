const Vehicle = require("../models/vehicle");
const mongoose = require("mongoose");
const isEmpty = require("is-empty");
const vehicleRoute = require("../models/vehicleRoute");

// http://localhost:3002/admin/vehicleadmission

const VehiclePost = async (req, res) => {
  const pollutionCertificateFile =
    req.files && req.files.pollutionCertificate
      ? req.files.pollutionCertificate[0].filename
      : null;
  const insuranceFile =
    req.files && req.files.insurance ? req.files.insurance[0].filename : null;

  const maxTeacher = await Vehicle.findOne({}, { vehicleNumber: 1 }).sort({
    vehicleNumber: -1,
  });
  let nextvehicleNumber = "V0001";

  if (maxTeacher && maxTeacher.vehicleNumber) {
    const currentMaxId = maxTeacher.vehicleNumber;
    const seriesNumber = parseInt(currentMaxId.substring(1), 10) + 1;
    nextvehicleNumber = `V${seriesNumber.toString().padStart(4, "0")}`;
  }

  let NewRegister = new Vehicle({
    vehicleNumber: nextvehicleNumber,
    vehicleType: req.body.vehicleType,
    vehicleRegisterNumber: req.body.vehicleRegisterNumber,
    manufacturer: req.body.manufacturer,
    seatingCapacity: req.body.seatingCapacity,
    status: req.body.status,
    ownerName: req.body.ownerName,
    registrationDate: req.body.registrationDate,
    mileage: req.body.mileage,
    pollutionCertificate: pollutionCertificateFile,
    pollutionTestedDate: req.body.pollutionTestedDate,
    pollutionValidityDate: req.body.pollutionValidityDate,
    insurance: insuranceFile,
    insuranceStartDate: req.body.insuranceStartDate,
    insuranceEndDate: req.body.insuranceEndDate,
    isSpeedGovernorInstalled: req.body.isSpeedGovernorInstalled,
    speedLimit: req.body.speedLimit,
    fitnessCertificateNumber: req.body.fitnessCertificateNumber,
    fitnessTestedDate: req.body.fitnessTestedDate,
    accidentClaimsInfo: req.body.accidentClaimsInfo,
    serviceHistoryDetails: req.body.serviceHistoryDetails,
    usageType: req.body.usageType,
    vehicleRoute: req.body.vehicleRoute,
  });

  try {
    await NewRegister.save();
    return res.status(200).json({
      status: true,
      message: "Vehicle Details Added Successfully",
      NewRegister,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// http://localhost:3002/admin/VehicleDetailById

const VehicleDetailById = async (req, res) => {
  let Display;
  const id = req.params.id;
  try {
    Display = await Vehicle.findById({ _id: id });
  } catch (err) {
    console.log(err);
  }
  if (!Display) {
    return res.status(404).json({ message: "Page Error" });
  }
  return res.status(200).json({ status: true, result: Display });
};

// http://localhost:3002/admin/VehicleDetails

const VehicleDetails = async (req, res) => {
  let Display;
  try {
    Display = await Vehicle.find({});
  } catch (err) {
    console.log(err);
  }
  if (!Display) {
    return res.status(404).json({ message: "Page Error" });
  }
  return res.status(200).json({ status: true, result: Display });
};

// http://localhost:3002/admin/VehicleDetailUpdate/:id

const VehicleDetailUpdate = async (req, res) => {
  const id = req.params.id;
  let UpdateVehicle = {
    vehicleNumber: req.body.vehicleNumber,
    vehicleRegisterNumber: req.body.vehicleRegisterNumber,
    manufacturer: req.body.manufacturer,
    seatingCapacity: req.body.seatingCapacity,
    status: req.body.status,
    ownerName: req.body.ownerName,
    registrationDate: req.body.registrationDate,
    mileage: req.body.mileage,
    pollutionTestedDate: req.body.pollutionTestedDate,
    pollutionValidityDate: req.body.pollutionValidityDate,
    insuranceStartDate: req.body.insuranceStartDate,
    insuranceEndDate: req.body.insuranceEndDate,
    isSpeedGovernorInstalled: req.body.isSpeedGovernorInstalled,
    speedLimit: req.body.speedLimit,
    fitnessCertificateNumber: req.body.fitnessCertificateNumber,
    fitnessTestedDate: req.body.fitnessTestedDate,
    accidentClaimsInfo: req.body.accidentClaimsInfo,
    serviceHistoryDetails: req.body.serviceHistoryDetails,
    usageType: req.body.usageType,
    vehicleRoute: req.body.vehicleRoute,
  };

  if (
    !isEmpty(req.files) &&
    req.files.pollutionCertificate &&
    req.files.pollutionCertificate.length > 0
  ) {
    UpdateVehicle.pollutionCertificate =
      req.files.pollutionCertificate[0].filename;
  }
  if (
    !isEmpty(req.files) &&
    req.files.insurance &&
    req.files.insurance.length > 0
  ) {
    UpdateVehicle.insurance = req.files.insurance[0].filename;
  }

  let updatedVehicle = await Vehicle.findByIdAndUpdate(
    { _id: id },
    { $set: UpdateVehicle },
    { new: true }
  );

  if (!updatedVehicle) {
    return res
      .status(404)
      .json({ status: false, message: "Vehicle not found" });
  }

  return res
    .status(200)
    .json({ status: true, message: "Data Updated successfully" });
};

// http://localhost:3002/admin/VehicleDetailDelete/:id

const VehicleDetailDelete = async (req, res) => {
  let Delete;
  const id = req.params.id;
  const update = { active: 0 };
  try {
    const filter = { _id: id };

    Delete = await Vehicle.updateOne(filter, { $set: update });
    if (Delete && Delete.modifiedCount > 0) {
      return res
        .status(200)
        .json({ status: true, message: " Data Deleted successfully" });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "No matching records found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

const VehicleRouteAllocate = async (req, res) => {
  const routeModel = new vehicleRoute({
    ...req.body,
  });
  try {
    await routeModel.save();
    return res.status(200).json({
      status: true,
      message: "Bus route added successfully",
      routeModel,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: false, message: "Route not saved" });
  }
};

// http://localhost:3002/admin/showvehicleregistrationNumber/:id

const showvehicleregistrationNumber = async (req, res) => {
  let Display;
  const regnum = req.params.id;
  try {
    Display = await Vehicle.findOne({ vehicleRegisterNumber: regnum });

    if (!Display) {
      return res
        .status(404)
        .json({ status: false, message: "Vehicle not found" });
    }

    return res.status(200).json({ status: true, result: Display });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

// http://localhost:3002/admin/VehicleDetailsbyselectedvalues
const VehicleDetailsbyselectedvalues = async (req, res) => {
  let Display;
  try {
    Display = await Vehicle.find(
      {},
      { _id: 1, vehicleRoute: 1, vehicleRegisterNumber: 1 }
    );
  } catch (err) {
    console.log(err);
  }
  if (!Display) {
    return res.status(404).json({ message: "Page Error" });
  }
  return res.status(200).json({ status: true, result: Display });
};

const getVehicleRoute = async (req, res) => {
  let displaySingle;
  try {
    displaySingle = await vehicleRoute.findOne({ ...req.body });
  } catch (err) {
    console.log(err);
  }
  if (!displaySingle) {
    return res.status(404).json({ status: false, message: "No routes found" });
  }
  return res.status(200).json({ status: true, result: displaySingle });
};

const updateVehicleRoute = async (req, res) => {
  const id = { vehicleNumber: req.body.vehicleNumber };
  const { ...rest } = req.body;
  let UpdateRoute;
  try {
    UpdateRoute = await vehicleRoute.findOneAndUpdate(
      id,
      { ...rest },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  if (!UpdateRoute) {
    return res
      .status(404)
      .json({ status: false, message: "Bus route not updated" });
  }
  return res
    .status(200)
    .json({
      status: true,
      result: UpdateRoute,
      message: "Bus route successfully updated",
    });
};

module.exports = {
  VehiclePost,
  VehicleDetails,
  VehicleDetailUpdate,
  VehicleDetailDelete,
  VehicleDetailById,
  VehicleRouteAllocate,
  getVehicleRoute,
  updateVehicleRoute,
  showvehicleregistrationNumber,
  VehicleDetailsbyselectedvalues,
};

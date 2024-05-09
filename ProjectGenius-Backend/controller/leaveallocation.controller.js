const leaveAllocationModel = require("../models/leaveallocation");

const alloctaionFieldPost = async (req, res) => {
  const {
    medicalLeave,
    casualLeave,
    paternityLeave,
    unpaidLeave,
    employeeId,
    name,
  } = req.body;

  const annualLeave =
    parseInt(medicalLeave) +
    parseInt(paternityLeave) +
    parseInt(casualLeave) ;
   

  const addLeaveAllocation = new leaveAllocationModel({
    employeeId,
    name,
    medicalLeave,
    casualLeave,
    paternityLeave,
    unpaidLeave,
    annualLeave,
  });

  try {
    await addLeaveAllocation.save();
    return res
      .status(200)
      .json({ status: true, message: "Details added successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, message: "Error adding details" });
  }
};

const allocationFieldDisplay = async (req, res) => {
  let displayForm;
  try {
    displayForm = await leaveAllocationModel.find();
  } catch (err) {
    console.log(err);
  }
  if (!displayForm) {
    return res
      .status(404)
      .json({ status: false, message: "Details not found" });
  }
  return res.status(200).json({ status: true, result: displayForm });
};

const singleAllocationDisplay = async (req, res) => {
  const empId = req.params.id;
  let display;
  try {
    display = await leaveAllocationModel.findOne({ employeeId: empId }); // query using employeeId field
    console.log(display);
  } catch (err) {
    console.log(err);
  }

  if (!display) {
    return res.status(404).json({ status: false, message: "No leaves found" });
  }
  return res
    .status(200)
    .json({
      status: true,
      message: "Data viewed successfully",
      result: display,
    });
};



const allocationFieldEdit = async (req, res) => {
  const empId = req.params.id;
  try {
    const { medicalLeave, casualLeave, paternityLeave, ...rest } = req.body;
    let updation = {
      ...rest,
    };
    console.log(rest,'valueSSS;;;');
    const medicalLeaveValue = medicalLeave ? parseInt(medicalLeave) : 0;
    const paternityLeaveValue = paternityLeave ? parseInt(paternityLeave) : 0;
    const casualLeaveValue = casualLeave ? parseInt(casualLeave) : 0;

    const annualLeave =
      medicalLeaveValue + paternityLeaveValue + casualLeaveValue;

    // Update the leave allocation with the deducted leaves and total annual leave
    updation.medicalLeave = medicalLeave;
    updation.casualLeave = casualLeave;
    updation.paternityLeave = paternityLeave;
    updation.annualLeave = annualLeave;

    const allocationUpdate = await leaveAllocationModel.findOneAndUpdate(
      { employeeId: empId },
      { $set: updation },
      { new: true }
    );
    console.log(allocationUpdate,'updATED;;;');
    return res
      .status(200)
      .json({
        status: true,
        message: "Updated successfully",
        result: allocationUpdate,
      });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Allocation not found" });
  }
}

const allocationCasualFieldEdit = async (req, res) => {
  const { employeeId, casualLeave, unpaidLeave } = req.body;
  if (!employeeId || !casualLeave) {
    return res.status(400).json({ status: false, message: 'Employee ID and Casual Leave value are required' });
  }
  try {
    const employee = await leaveAllocationModel.findOne({ employeeId, active: 1 });
    if (!employee) {
      return res.status(404).json({ status: false, message: 'Employee not found' });
    }

    const existingCasualLeave = parseInt(employee.casualLeave);
    const updatedCasualLeave = existingCasualLeave + parseInt(casualLeave);

    const existingMedical = parseInt(employee.medicalLeave);
    const existingPaternity = parseInt(employee.paternityLeave);
    const existingUnpaidLeave = parseInt(unpaidLeave);
    const updatedAnnualLeave = existingMedical + existingPaternity + updatedCasualLeave;

    const updation = { casualLeave: updatedCasualLeave.toString(), medicalLeave: existingMedical.toString(), paternityLeave: existingPaternity.toString(), annualLeave: updatedAnnualLeave.toString(), unpaidLeave:existingUnpaidLeave.toString() };

    const allocationUpdate = await leaveAllocationModel.findOneAndUpdate(
      { employeeId },
      { $set: updation },
      { new: true }
    );

    // console.log(`Updated leave details for employee ${employeeId}`, allocationUpdate);

    return res.status(200).json({
      status: true,
      message: 'Leave details updated successfully',
      result: allocationUpdate
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};






const allocationFieldDelete = async (req, res) => {
  const empId = req.params.id;
  try {
    const deletedAllocation = await leaveAllocationModel.findOneAndDelete({
     employeeId : empId
    });
    console.log(deletedAllocation,'dellll....');
    if (!deletedAllocation) {
      return res.status(404).json({ status:false ,  message: "Allocation not found" });
    }
    return res.status(200).json({ status:true , message: "Allocation deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  alloctaionFieldPost,
  allocationFieldDisplay,
  allocationFieldEdit,
  allocationCasualFieldEdit,
  allocationFieldDelete,
  singleAllocationDisplay,
};

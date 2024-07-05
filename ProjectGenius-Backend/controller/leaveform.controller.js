const { json } = require("body-parser");
const leave = require("../models/leaverform");
const moment = require("moment");

// http://localhost:3002/admin/leaveapplication


const leaveapplication = async (req, res) => {
  const {
    currentDate,
    employeeId,
    name,
    fromDate,
    toDate,
    reason,
    approval,
    active,
    leaveType,
    numofDays,
  } = req.body;

  try {
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate();
      const month = formattedDate.toLocaleString("default", { month: "short" });
      const year = formattedDate.getFullYear();
      return `${day} ${month} ${year}`;
    };

    // Check if fromDate is before toDate
    if (new Date(fromDate) > new Date(toDate)) {
      return res
        .status(400)
        .json({ error: "From Date must be before To Date" });
    }

    // Check if the requested leave period overlaps with existing leave periods
    const existingLeave = await leave.findOne({
      employeeId: employeeId,
      $or: [
        {
          $and: [
            { "leaveDates.date": { $gte: formatDate(fromDate) } },
            { "leaveDates.date": { $lte: formatDate(toDate) } }
          ]
        },
        {
          $and: [
            { "fromDate": { $lte: formatDate(toDate) } },
            { "toDate": { $gte: formatDate(fromDate) } }
          ]
        }
      ]
    });

    if (existingLeave) {
      return res
        .status(400)
        .json({
          status:false,
          message: "Selected dates overlap with an existing leave period",
        })
    }

    // If no overlapping leave periods, proceed with registering the leave
    const currentDateFormatted = formatDate(new Date());
    const leaveDates = [];
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    while (startDate <= endDate) {
      leaveDates.push({
        date: formatDate(startDate),
        approval: approval,
        leaveType: leaveType,
        month: formatDate(startDate).split(" ")[1],
      });
      startDate.setDate(startDate.getDate() + 1);
    }

    const register = new leave({
      currentDate: currentDateFormatted,
      employeeId,
      name,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      numofDays,
      reason,
      approval,
      leaveType,
      active,
      leaveDates,
    });
 
    await register.save();
    res.status(201).json({
      status: true,
      message: "Leave application submitted successfully",
      result:register
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// http://localhost:3002/admin/LeavestatusEdit/:id

const leaveapplicationupdate = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      employeeId,
      name,
      fromDate,
      toDate,
      numofDays,
      reason,
      leaveType,
      approval,
      currentDate,
      reasonDecline,
    } = req.body;

    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    function formatDate(dateObj) {
      const day = dateObj.getDate();
      const monthIndex = dateObj.getMonth();
      const year = dateObj.getFullYear();
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${day} ${months[monthIndex]} ${year}`;
    }
    const formattedfromDate = formatDate(fromDateObj);
    const formattedtoDate = formatDate(toDateObj);

    const leaveDates = [];
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    while (startDate <= endDate) {
      leaveDates.push({
        date: formatDate(startDate),
        approval: approval,
      });
      startDate.setDate(startDate.getDate() + 1);
    }

    const updatedLeaveApplication = await leave.findByIdAndUpdate(
      id,
      {
        currentDate,
        employeeId,
        name,
        fromDate: formattedfromDate,
        toDate: formattedtoDate,
        numofDays,
        reason,
        leaveType,
        approval,
        reasonDecline,
        leaveDates,
      },
      { new: true }
    );

    if (!updatedLeaveApplication) {
      return res.status(404).json({ message: "Leave application not found" });
    }

    res.json(updatedLeaveApplication);
  } catch (error) {
    console.error("Error updating leave application:", error);
    res.status(500).json({ message: "Failed to update leave application" });
  }
};

// http://localhost:3002/admin/leaveDisplay

const leaveDisplay = async (req, res) => {
  let Display;
  try {
    Display = await leave.find({});
    return res.status(200).json({ status: true, result: Display });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: false, message: "Decline" });
  }
};

// http://localhost:3002/admin/leaveapplicationDelete

const leaveapplicationDelete = async (req, res) => {
  let Delete;
  const id = req.params.id;
  try {
    Delete = await leave.findByIdAndDelete({ _id: id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: false, message: "Decline" });
  }
  res.status(200).json({ status: true, message: "Deleted Successfully" });
};

module.exports = {
  leaveapplication,
  leaveDisplay,
  leaveapplicationDelete,
  leaveapplicationupdate,
};

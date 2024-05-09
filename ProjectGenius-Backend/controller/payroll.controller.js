const Payroll = require("../models/payroll");

// http://localhost:3002/admin/salaryform/:id

const salaryform = async (req, res) => {
  try {
    const { EmployeePaySlip } = req.body;
    const month = EmployeePaySlip[0].month;
    const year = EmployeePaySlip[0].year;

    let existingPayroll = await Payroll.findOne({ year });

    if (!existingPayroll) {
      existingPayroll = new Payroll({ year, months: [] });
    }

    const existingMonthIndex = existingPayroll.months.findIndex(
      (m) => m.month === month
    );

    if (existingMonthIndex !== -1) {
      // Update existing month's data
      existingPayroll.months[existingMonthIndex].EmployeePaySlip = EmployeePaySlip;
      await existingPayroll.save();

      res.status(200).json({
        status: true,
        message: "Payroll data updated successfully",
        months: existingPayroll.months,
      });
    } else {
      // Add new month's data
      existingPayroll.months.push({ month, EmployeePaySlip });

      existingPayroll.months.sort((a, b) => {
        const monthOrder = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
      });

      await existingPayroll.save();
      res.status(200).json({
        status: true,
        message: "Payroll data saved successfully",
        months: existingPayroll.months,
      });
    }
  } catch (error) {
    console.error("Error occurred while saving or updating payroll data:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

// http://localhost:3002/admin/salaryformUpdate/:month

const salaryformUpdate = async (req, res) => {
  try {
    const { employeePaySlipId, employeeId } = req.params;
    const { name, category, month, year, currentSalary, grossSalary, totaldaysformonth, totalworkingdays, numofDays, Netsalary } = req.body;

    const payrollDoc = await Payroll.findOne({ "months.EmployeePaySlip._id": employeePaySlipId });
    if (!payrollDoc) {
      return res.status(404).json({ status: false, message: `No data found for the provided employeePaySlipId ${employeePaySlipId}` });
    }

    const selectedMonthData = payrollDoc.months.find(entry => entry.EmployeePaySlip.find(paySlip => paySlip._id == employeePaySlipId));

    if (!selectedMonthData) {
      return res.status(404).json({ status: false, message: `No data found for the provided employeePaySlipId ${employeePaySlipId}` });
    }

    const selectedEmployeePaySlip = selectedMonthData.EmployeePaySlip.find(paySlip => paySlip._id == employeePaySlipId && paySlip.employeeId === employeeId);

    if (!selectedEmployeePaySlip) {
      return res.status(404).json({ status: false, message: `No data found for the provided employeePaySlipId ${employeePaySlipId} and employeeId ${employeeId}` });
    }

    // Update month and year
    if (month) selectedMonthData.month = month;
    if (year) payrollDoc.year = year;

    // Update other fields
    if (name) selectedEmployeePaySlip.name = name;
    if (category) selectedEmployeePaySlip.category = category;
    if (currentSalary) selectedEmployeePaySlip.currentSalary = currentSalary;
    if (grossSalary) selectedEmployeePaySlip.grossSalary = grossSalary;
    if (totaldaysformonth) selectedEmployeePaySlip.totaldaysformonth = totaldaysformonth;
    if (totalworkingdays) selectedEmployeePaySlip.totalworkingdays = totalworkingdays;
    if (numofDays) selectedEmployeePaySlip.numofDays = numofDays;
    if (Netsalary) selectedEmployeePaySlip.Netsalary = Netsalary;

    await payrollDoc.save();
    res.json({status:true,selectedEmployeePaySlip});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// http://localhost:3002/admin/salarypayrollDislay/:month

const salarypayrollDislay = async (req, res) => {
  try {
    const selectedMonth = req.params.month;

    const payrollDoc = await Payroll.findOne({});

    if (!payrollDoc) {
      return res.status(404).json({ status: false, message: "No data found for the provided ID" });
    }

    const selectedMonthData = payrollDoc.months.find(entry => entry.month === selectedMonth);

    if (!selectedMonthData) {
      return res.status(404).json({ status: false, message: `No data found for the month: ${selectedMonth}` });
    }

    return res.status(200).json({ status: true, result: selectedMonthData.EmployeePaySlip });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// http://localhost:3002/admin/salarypayrolllist

const payrollListmonth = async (req, res) => {
  try {
    const payrollData = await Payroll.findOne();
    const monthsList = payrollData.months.map(month => month.month);
    return res.status(200).json({ status: true, result: monthsList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
}




module.exports = { salaryform, salaryformUpdate,salarypayrollDislay ,payrollListmonth};

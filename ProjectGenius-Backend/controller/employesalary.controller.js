const Empsalary = require("../models/employesalary");

//http://localhost:3002/admin/Employee-Salary

const EmployeSalary = async (req, res) => {
  const { ...rest } = req.body;

  const register = new Empsalary({
    ...rest,
  });

  try {
    await register.save();
    res
      .status(200)
      .json({ status: true, message: "PayRoll Successfully Submited" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: false, error: "Failed to save employee salary." });
  }
};

//http://localhost:3002/admin/Employee-Display

const EmployesalaryView = async (req, res) => {
  let Display;
  try {
    Display = await Empsalary.find();
  } catch (err) {
    console.log(err);
  }
  if (!Display) {
    return res.status(404).json({ message: "Page Error" });
  }
  return res.status(200).json({ status: true, result: Display });
};

//http://localhost:3002/admin/Employee-SalaryUpdate

const SalaryUpdate = async (req, res) => {
  const { basicSalary, netSalary, grossSalary, Lop, ...rest } = req.body;
  const id = req.params.id;
  const parsedBasicSalary = parseFloat(basicSalary);
  const parsedLop = parseFloat(Lop);
  const cmpLeave = 2;
  let gross = parsedBasicSalary + 1110;
  let salary = parsedBasicSalary + 1110;
  const TotalLop = parsedLop;

  if (TotalLop > cmpLeave) {
    salary -= (TotalLop - cmpLeave) * (salary / 30);
  }

  const roundedSalary = Math.round(salary / 10) * 10;
  const updating = {
    basicSalary: parsedBasicSalary,
    grossSalary: gross,
    Lop: parsedLop,
    netSalary: TotalLop <= cmpLeave ? salary : roundedSalary,
    ...rest,
  };
  try {
    const update = await Empsalary.findByIdAndUpdate(id, updating, {
      new: true,
    });
    if (!update) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ update });
  } catch (err) {
    console.log(err);
  }
};

//http://localhost:3002/admin/Employee-SalaryDelete

const SalaryDelete = async (req, res) => {
  let Delete;
  const id = req.params.id;
  const update = { active: 0 };
  try {
    Delete = await Empsalary.updateOne(
      { _id: id },
      { $set: update },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({ Delete });
};

module.exports = {
  EmployeSalary,
  EmployesalaryView,
  SalaryUpdate,
  SalaryDelete,
};

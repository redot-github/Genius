import axios from "../config/axios";

export const login = async (data) => {
  try {
    let respData = await axios({
      url: "/login",
      method: "post",
      data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      token: respData.data.token,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};
export const verify = async (data) => {
  try {
    let respData = await axios({
      url: "/verification",
      method: "post",
      data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};
export const Reverify = async () => {
  try {
    let respData = await axios({
      url: "/re-verification",
      method: "get",
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};
export const registerStudent = async (formData) => {
  try {
    let respData = await axios({
      url: "/admission",
      method: "post",
      data: formData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};
export const registerStudentValid = async () => {
  try {
    let respData = await axios({
      url: "/admission-valid",
      method: "post",
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};
export const studentAadhar = async () => {
  try {
    let respData = await axios({
      url: "/getstudentaadhaar",
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "---err");
  }
};
export const viewStudent = async () => {
  try {
    let respData = await axios({
      url: "/viewstudent",
      method: "post",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
      imageUrl: respData.data.imageUrl,
      result2: respData.data.result2,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const deleteStudent = async (id) => {
  try {
    let respData = await axios({
      url: "/deletestudent/" + id,
      method: "get",
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const getSinglestudent = async (id) => {
  try {
    let respData = await axios({
      url: "/getsingle-student/" + id,
      method: "get",
    });

    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};
export const updateStudent = async (formData) => {
  try {
    let respData = await axios({
      url: "/updatestudent",
      method: "post",
      data: formData,
    });

    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};
export const feeSetup = async (data) => {
  try {
    let respData = await axios({
      url: "/feessetup",
      method: "post",
      data: data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};

export const viewFees = async () => {
  try {
    let respData = await axios({
      url: "/viewfees",
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const getSinglefees = async (id) => {
  try {
    let respData = await axios({
      url: "/getsingle-fees/" + id,
      method: "get",
    });

    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};

export const feeUpdate = async (data) => {
  try {
    let respData = await axios({
      url: "/feesupdate",
      method: "post",
      data: data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};

export const feeCollection = async (data) => {
  try {
    let respData = await axios({
      url: "/feescollection",
      method: "post",
      data: data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};
export const feesPaid = async (data) => {
  try {
    let respData = await axios({
      url: "/feespaid",
      method: "post",
      data: data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err);
  }
};
export const feesStatus = async (Data) => {
  try {
    let respData = await axios({
      url: "/feesstatus",
      method: "post",
      data: Data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err);
  }
};
export const Sectionallocation = async (data) => {
  try {
    let respData = await axios({
      url: "/singlesectionallocate",
      method: "post",
      data: data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};
export const Verifysinglesection = async (Sectiondata) => {
  try {
    let respData = await axios({
      url: "/singlesectionverify",
      method: "post",
      data: Sectiondata,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "--err");
  }
};
export const updatesinglesection = async (Updatedata) => {
  try {
    let respData = await axios({
      url: "/updatesinglesection",
      method: "post",
      data: Updatedata,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err, "--err");
  }
};
export const Groupsectionallocation = async (finalData) => {
  try {
    let respData = await axios({
      url: "/groupsectionallocate",
      method: "post",
      data: finalData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err);
  }
};
export const GroupVerifysection = async (Sectiondata) => {
  try {
    let respData = await axios({
      url: "/groupsectionverify",
      method: "post",
      data: Sectiondata,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "--err");
  }
};
export const registerTeacher = async (formData) => {
  try {
    let respData = await axios({
      url: "/teacheradmission",
      method: "post",
      data: formData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};

export const viewTeacher = async () => {
  try {
    let respData = await axios({
      url: "/viewteacher",
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
      imageUrl: respData.data.imageUrl,
      result2: respData.data.result2,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};
export const teacherAadhar = async () => {
  try {
    let respData = await axios({
      url: "/getteacheraadhaar",
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "---err");
  }
};

export const updateTeacher = async (formData) => {
  try {
    let respData = await axios({
      url: "/updateteacher",
      method: "post",
      data: formData,
    });

    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};
export const getSingleteacher = async (id) => {
  try {
    let respData = await axios({
      url: "/getsingle-teacher/" + id,
      method: "get",
    });

    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};
export const deleteTeacher = async (id) => {
  try {
    let respData = await axios({
      url: "/deleteteacher/" + id,
      method: "get",
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};
export const createteacherschedule = async (data) => {
  try {
    let respData = await axios({
      url: "/teacherschedule",
      method: "post",
      data: data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "--err");
  }
};
export const getTeacherSchedule = async (teacherId) => {
  try {
    let respData = await axios({
      url: "/getteacherschedule/" + teacherId,
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
      result2: respData.data.result2,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};
export const getfixedschedule = async (data) => {
  try {
    let respData = await axios({
      url: "/getfixedschedule",
      method: "get",
      params: data,
    });

    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};
export const findschedulefordetails = async (Scheduledata) => {
  try {
    let respData = await axios({
      url: "/findschedulefordetails",
      method: "post",
      params: Scheduledata, // Use params for GET requests
    });

    return {
      status: respData.data.status,
      result: respData.data.result,
      result2: respData.data.result2,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};
export const teacherAllocation = async (data) => {
  try {
    let respData = await axios({
      url: "/teacherallocation",
      method: "post",
      data: data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};
export const findClass = async (Classdata) => {
  try {
    let respData = await axios({
      url: "/findteacherclass",
      method: "get",
      params: Classdata,
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};
export const findWholeClass = async () => {
  try {
    let respData = await axios({
      url: "/findteacherwholeclass",
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};
export const createAttendance = async (Attendata) => {
  try {
    let respData = await axios({
      url: "/teacherattendance",
      method: "post",
      data: Attendata,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};
export const findAttendance = async (attendata) => {
  try {
    let respData = await axios({
      url: "/findteacherattendance",
      method: "get",
      params: attendata,
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};
export const findAttendanceForMonth = async (MonthData) => {
  try {
    let respData = await axios({
      url: "/findmonthlyattendance",
      method: "get",
      params: MonthData,
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};

export const registerDriver = async (formData) => {
  try {
    let respData = await axios({
      url: "/driveradmission",
      method: "post",
      data: formData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "--err");
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const driverAadhar = async () => {
  try {
    let respData = await axios({
      url: "/getdriveraadhaar",
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "---err");
  }
};

export const viewDriver = async () => {
  try {
    let respData = await axios({
      url: "/viewdriver",
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
      imageUrl: respData.data.imageUrl,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const getSingleDriver = async (id) => {
  try {
    let respData = await axios({
      url: `/getSingleDriver/${id}`,
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const updateDriver = async (formData, id) => {
  try {
    let respData = await axios({
      url: `/updateDriverDetail/${id}`,
      method: "put",
      data: formData,
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const busRouteAllocate = async (formData, id) => {
  try {
    let respData = await axios({
      url: `/allocateBusRoute/${id}`,
      method: "post",
      data: formData,
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const displayBusAllocation = async () => {
  try {
    let respData = await axios({
      url: "/DisplayBusAllocation",
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
      imageUrl: respData.data.imageUrl,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const displayBusAllocationId = async (driverId) => {
  try {
    let respData = await axios({
      url: `/displayBusAllocation/${driverId}`, // Include driverId in the URL
      method: 'get',
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
      imageUrl: respData.data.imageUrl,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const getSingleBusAllocate = async (id) => {
  try {
    let respData = await axios({
      url: `/singleAllocationDisplay/${id}`,
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const deleteDriver = async (id) => {
  try {
    let respData = await axios({
      url: `/deleteDriverDetail/${id}`,
      method: "put",
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const deleteBusAllocation = async (id) => {
  try {
    let respData = await axios({
      url: `/deleteBusAllocate/${id}`,
      method: "put",
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

// export const VehicleDetailsURL = `http://localhost:3002/admin/vehicleadmission`;

export const VehicleURL = async (formData) => {
  try {
    let respData = await axios({
      url: "/vehicleadmission",
      method: "post",
      data: formData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};

export const getAllVehicle = async () => {
  try {
    let respData = await axios({
      url: "/VehicleDetails",
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};

export const getSingleVehicle = async (Id) => {
  try {
    let resData = await axios({
      url: `/VehicleDetailById/${Id}`,
      method: "get",
    });
    return {
      status: resData.data.status,
      result: resData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};

export const updateVehicle = async (formData, Id) => {
  try {
    let respData = await axios({
      url: "/VehicleDetailUpdate/" + Id,
      method: "put",
      data: formData,
    });

    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const deleteVehicleDetail = async (id) => {
  try {
    let respData = await axios({
      url: `/VehicleDetailDelete/${id}`,
      method: "get",
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

//Vehicle Route

export const vehicleAllocate = async (formData) => {
  try {
    let respData = await axios({
      url: "/routeAllocation",
      method: "post",
      data: formData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const getVehicleRouteData = async (vehicleData) => {
  try {
    let respData = await axios({
      url: `/vehicleRouteDetails`,
      method: "post",
      data: vehicleData,
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const updateVehicleRouteData = async (routeData) => {
  try {
    let respData = await axios({
      url: `/updateVehicleRoute`,
      method: "put",
      data: routeData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const LeaveFormUrl = async (routeData) => {
  try {
    let respData = await axios({
      url: `/leaveapplication`,
      method: "post",
      data: routeData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};
//leaveform
export const leaveformapply = async (formData) => {
  try {
    let respData = await axios({
      url: "/leaveapplication",
      method: "post",
      data: formData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};

//leaveapply
export const applyLeave = async (formData) => {
  try {
    let respData = await axios({
      url: "/leaveapplication",
      method: "post",
      data: formData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};

//Leave List

export const leaveDisplay = async () => {
  try {
    let respData = await axios({
      url: "/leaveDisplay",
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};

//Leave-Approval
export const leavesanction = async (formData, id) => {
  try {
    let respData = await axios({
      url: `/LeavestatusEdit/${id}`,
      method: "put",
      data: formData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};


// export const leaveAllocate = async (formData) => {
//   try {
//     let respData = await axios({
//       url: "/alloctaionFieldPost",
//       method: "post",
//       data: formData,
//     });
//     return {
//       status: respData.data.status,
//       message: respData.data.message,
//       result: respData.data.result,
//     };
//   } catch (err) {
//     console.log(err);
//   }
// };

//employesalaryform
export const employesalaryform = async (formData) => {
  try {
    let respData = await axios({
      url: "/Employee-Salary",
      method: "post",
      data: formData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};


//fetchExistingLeaveDates
export const fetchExistingLeaveDates = async (formData) => {
  try {
    let respData = await axios({
      url: "/fetchExistingLeaveDates",
      method: "get",
      data: formData,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};


export const leaveAllocate = async(formData)=>{
  try{
    let respData = await axios({
      url:"/alloctaionFieldPost",
      method:"post",
      data:formData
    
    })
    return{
      status: respData.data.status,
      message:respData.data.message,
      result:respData.data.result
    }
  }
  catch(err){
    console.log(err);
  }
}

export const leaveAllocateDisplay = async()=>{
  try{
    let respData = await axios({
      url:"/allocationFieldDisplay",
      method:"get",
    
    
    })
    return{
      status: respData.data.status,
      message:respData.data.message,
      result:respData.data.result
    }
  }
  catch(err){
    console.log(err);
  }
}

export const singleAllocateDisplay = async(id)=>{
  try{
    let respData = await axios({
      url:`/singleAllocationDisplay/${id}`,
      method:"get",
    
    
    })
    return{
      status: respData.data.status,
      message:respData.data.message,
      result:respData.data.result
    }
  }
  catch(err){
    console.log(err);
  }
}

// actions/adminAction.js

export const leaveAllocateEdit = async(formData)=>{
  try{
    const respData = await axios.put(`/allocationFieldEdit/${formData.employeeId}`, formData);
    return{
      status: respData.data.status,
      message:respData.data.message,
      result:respData.data.result
    };
  }
  catch(err){
    console.log(err);
  }
}



export const casualLeaveAllocateEdit = async (formData) => {
  try {
    const respData = await axios.put(`/allocationCasualFieldEdit/${formData.employeeId}`, formData);
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result  // Return the updated data
    };
  } catch (err) {
    console.log(err);
  }
};



export const leaveAllocateDelete = async(formData)=>{
  try{
    const respData = await axios.delete(`/allocationFieldDelete/${formData.employeeId}`, formData);
    return{
      status: respData.data.status,
      message:respData.data.message,
      result:respData.data.result
    };
  }
  catch(err){
    console.log(err);
  }
}

export const payrollsalary = async (EmployeePaySlip) => {
  try {
    let respData = await axios({
      url: "/payrollsalary",
      method: "post",
      data: EmployeePaySlip,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    console.log(err, "errrr");
  }
};

//salaryformUpdate
export const salaryformUpdate = async (formData, employeePaySlipId, employeeId) => {
  try {
    const respData = await axios.put(`/salaryformUpdate/${employeePaySlipId}/${employeeId}`, formData);
    return {
      status: respData.data.status,
      message: respData.data.message,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};



//salarypayrollDislay

export const salarypayrollDislay = async (month) => {
  try {
    let respData = await axios({
      url: `/salarypayrollDislay/${month}`,
      method: "get",
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result : respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const payrollListmonth = async()=>{
  try{
    let respData = await axios({
      url:"/payrollListmonth",
      method:"get",
    
    
    })
    return{
      status: respData.data.status,
      message:respData.data.message,
      result:respData.data.result
    }
  }
  catch(err){
    console.log(err);
  }
}
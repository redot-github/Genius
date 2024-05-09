import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { busRouteAllocate, getAllVehicle, getSingleBusAllocate, getSingleDriver, updateDriver, viewDriver } from '../actions/adminAction';
import toastAlert from "../lib/toast";

const BusAllocate = () => {
  const [formValue, setFormValue] = useState({
    role:"",
    vehicleRoute: "",
    vehicleRegisterNumber: "",
  });
  const [VehicleList, setVehicleList] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState({});
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const { Id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const { status, result } = await getSingleDriver(Id);
        if (status === true) {
          setFormValue(result);
          setSelectedRoute(result);
        } else if (status === false) {
          navigate("/driverview");
        }
      } catch (err) {
        console.log(err, "--err");
      }
    };
    getData();
  }, [Id, navigate]);

  useEffect(() => {
    const displayData = async () => {
      try {
        const vehicleDetails = await getAllVehicle();
        setVehicleList(vehicleDetails.result);
      } catch (err) {
        console.log(err);
      }
    };
    displayData();
  }, []);

  const getData2 = async () => {
    try {
      let { status, result} = await viewDriver();
      if (status === true) {
        const driverData = await result.filter(each => each.active === 1 && each.name.toLowerCase() && each.role === 'Attender')
        setData(driverData)
        console.log(driverData,'attender..jjs.');
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData2();
  }, []);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  

  const handlerouteselection = (e) => {
    const selectedNumber = e.target.value;
    const selectedRoute = VehicleList.find(
      (vehicleRoute) => vehicleRoute.vehicleRegisterNumber === selectedNumber
    );
    setSelectedRoute({
      vehicleRoute: selectedRoute ? selectedRoute.vehicleRoute : "",
      vehicleRegisterNumber: selectedNumber,
    });
    setFormValue({
      ...formValue,
      vehicleRoute: selectedRoute ? selectedRoute.vehicleRoute : "",
      vehicleRegisterNumber: selectedNumber,
    });
  };

  const handleCancel = ()=>{
    navigate('/driverview')
  }
  const handleSubmit = async () => {
    try {
      // Update the driver's vehicle route and number
      const updateDriverData = {
        vehicleRoute: formValue.vehicleRoute,
        vehicleRegisterNumber: formValue.vehicleRegisterNumber,
      };
      const updateDriverResponse = await updateDriver(updateDriverData, Id);
  
      // Check if the driver update was successful
      if (updateDriverResponse.status === true) {
        // Proceed with bus allocation
        const busAllocationResponse = await busRouteAllocate(formValue, Id);
        if (busAllocationResponse.status === true) {
          toastAlert("success", busAllocationResponse.message);
          navigate("/busallocateview");
        } else {
          toastAlert("error", busAllocationResponse.message);
        }
      } else {
        toastAlert("error", updateDriverResponse.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <>
      <h3 className="editname">Edit Driver: {formValue.name}</h3>
      <div className="container-one container-edit">
        <div className="right-content">
          <div className="teacher-details" style={{ minHeight: 420 }}>
            <div className="teacher-header">
              <ion-icon name="person" />
              <span>Bus Allocation Details</span>
            </div>
            <form action="" className="teacher-form">
              <div className="teach-box">
                <label>
                  Bus Stop<sup>*</sup>
                </label>
                <select
                  name="vehicleRoute"
                  value={selectedRoute.vehicleRegisterNumber}
                  onChange={handlerouteselection}
                >
                  <option value=""></option>
                  {VehicleList.map((route) => (
                    <option
                      key={route.vehicleRegisterNumber}
                      value={route.vehicleRegisterNumber}
                    >
                      {route.vehicleRoute}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field-box">
                <label>
                  Bus Number<sup>*</sup>
                </label>
                <input
                  name="vehicleRegisterNumber"
                  value={selectedRoute.vehicleRoute ? selectedRoute.vehicleRegisterNumber : ''}
                  onChange={handlerouteselection}
                />
              </div>
              <div className="field-box">
                <label>
                  Attender<sup>*</sup>
                </label>
                <select
                  name="attender"
                  value={data.name}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {data.map((route) => (
                    <option
                      key={route.name}
                      value={route.name}
                    >
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="sub-btnn">
            <button onClick={handleCancel}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusAllocate;

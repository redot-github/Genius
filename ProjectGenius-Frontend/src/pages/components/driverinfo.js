import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const DriverInfo = (props) => {
  const { driverDetails, toggleDriverInfo, IMAGE_URL } = props
  //destructuring of studentDetails
  const { name, role, licenceexpirydate, licencetype, driverphoto,licencenumber , driverId } = driverDetails
  console.log(driverDetails,'driver........ ');
 
  return (

            <div className="student-right">
        <button className='close-btn' onClick={() => toggleDriverInfo(false)}><FontAwesomeIcon icon={faXmark} /></button>
        <div className="std-personal-info" id="information">
          <div className="std-image">
            <img src={`${IMAGE_URL}/${driverphoto}`} alt="" />
          </div>
          <div className="std-name">
            <span>{driverDetails.name}({role})</span>
          </div>
          <div className="std-history">
          <div className="std-name">
            <span>Licence Details</span>
          </div>
            <div className="adrs">
             <p>Number : </p>
              <span>{licencenumber && licencenumber ? licencenumber : "Nill"}</span>
            </div>
            <div className="adrs">
              <p>Type : </p>
              <span>{licencetype && licencetype ? licencetype : "Nill"}</span>
            </div>
            <div className="adrs">
            <p>ExpiryDate : </p>
              <span>{licenceexpirydate && licenceexpirydate ? licenceexpirydate : "Nill"}</span>
            </div>
          </div>
        </div>
      </div>
  
  );
}
export default DriverInfo;
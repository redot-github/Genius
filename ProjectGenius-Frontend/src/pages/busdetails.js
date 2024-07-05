import React from "react";
import { IoMdCall } from "react-icons/io";
import ParentHeader from "./components/parentheader";
import ParentNavBar from "./components/parentnavbar";

const BusDetails = () => {
  return (
    <div className="bus-details-page">
      <ParentHeader headerTitle={'Bus details'} />
      <div className="bus-details-container">
      <div className="bus-details-card">
          <h2>Bus Details</h2>
          <div className="details-card-container">
            <div>
              <p>Bus Number</p>
              <h3>Bus No.26</h3>
            </div>
            <hr />
            <div>
              <p>Number Plate</p>
              <h3>TN 59 A 1234</h3>
            </div>
          </div>
        </div>
        <div className="bus-incharge-container">
          <h2>Bus-Incharge Info</h2>
          <div className="bus-incharge-info">
            <div className="bus-incharge-img">
              <img src="https://xsgames.co/randomusers/assets/avatars/male/37.jpg" alt="driver" />
            </div>
            <div className="bus-incharge-details">
              <div className="bus-incharge-name">
                <h3>Mr. Kumaran</h3>
                <p>Bus Driver</p>
              </div>
              <div className="bus-incharge-contact">
                <IoMdCall />
                <span>Contact</span>
                <p>(+91) (68757878120)</p>
              </div>
            </div>
          </div>
          <div className="bus-incharge-info">
            <div className="bus-incharge-img">
              <img src="https://xsgames.co/randomusers/assets/avatars/female/73.jpg" alt="attendant" />
            </div>
            <div className="bus-incharge-details">
              <div className="bus-incharge-name">
                <h3>Mrs. Bharahi</h3>
                <p>Bus Attendant</p>
              </div>
              <div className="bus-incharge-contact">
                <IoMdCall />
                <span>Contact</span>
                <p>(+91) (68757878100)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ParentNavBar />
    </div>
  );
};

export default BusDetails;

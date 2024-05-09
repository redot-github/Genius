import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHistory, faUpload } from '@fortawesome/free-solid-svg-icons';
import { getAllVehicle} from '../../actions/adminAction';

const TeacherHistory = (props) => {
    const { formValue, setFormValue, handlePreClick,handleNextClick} = props

    const [onFocusEmergrncyNum, setFocusOnEmergrncyNum] = useState(false)
    const [fileErrorMsg, setFileErrorMsg] = useState('');

    const [VehicleList, setVehicleList] = useState([]);


    const getData = async()=>{
        try {
            const vehicleDetails = await getAllVehicle();
            const data = vehicleDetails.result;
            setVehicleList(data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        getData()
    
     },[])

   const [SelectedBusRoute, setSelectedBusRoute] = useState({
    vehicleRoute: "",
    vehicleRegisterNumber : ""
   })

   const handlerouteselection = (e) => {
    const selectedNumber = e.target.value;
    const selectedRoute = VehicleList.find(
        (vehicleRoute) => vehicleRoute.vehicleRegisterNumber === selectedNumber);

    setSelectedBusRoute({
        vehicleRoute: selectedRoute ? selectedRoute.vehicleRoute : "",
        vehicleRegisterNumber: selectedNumber,
    });

    setFormValue({
        ...formValue,
        vehicleRoute: selectedRoute ? selectedRoute.vehicleRoute : "",
        vehicleRegisterNumber: selectedNumber,
    });
};

useEffect(()=>{

    setSelectedBusRoute({
        vehicleRoute: formValue.vehicleRoute ,
        vehicleRegisterNumber: formValue.vehicleRegisterNumber,
    })
},[formValue])


      const triggerNextForm = () => {
      handleNextClick()
    }

    const triggerPreviousForm = () => {
        handlePreClick()
    }



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
        console.log(formValue);
    }

    const handleFileChange = (event) => {
        const { name, files } = event.target;
      const supportedExtension = [".jpg", ".png", ".jpeg", ".gif", ".pdf", ".doc"]
      const selectedFile = files[0];
      
      if (selectedFile) {
        const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf(".")).toLowerCase();
      
      if  (!supportedExtension.includes(fileExtension)) {
        setFileErrorMsg("Please upload a valid signature file (jpg, jpeg, png, gif, pdf, doc).")
        setFormValue({ ...formValue, ...{ [name]: '' } })
      } else if (selectedFile.size > 300000 || selectedFile.size < 30000) {
        setFileErrorMsg("File size should be Minimum 30Kb to Maximum 300Kb")
        setFormValue({ ...formValue, ...{ [name]: '' } })  
      } else {
        setFileErrorMsg("")
        setFormValue({ ...formValue, ...{ [name]: selectedFile } })
      }
      }
      };

    const displayFile = (file) => {
        if (file) {
            const url = URL.createObjectURL(file);
            if (file.type.startsWith("image/")) {
                return <img src={url} style={{ width: "70px" , marginTop:'5px'}} alt="Uploaded File" />;
            } else if (file.type === "application/pdf") {
                return <embed src={url} type="application/pdf" width="70px" height="70px"  style={{marginTop:'5px'}} />;
            }
        }
        return null;
    };
    
    const { subjects, higherqualification, teachingexperience, bloodgroup, vaccination, emergencycontactNumber, teachersignature, teachingcertificates , vehicleRegisterNumber , vehicleRoute} = formValue;

    const isButtonDisable = (teachingcertificates !== "" && subjects !== "" && higherqualification !== "" && teachingexperience !== "" && bloodgroup !== "" && vaccination !== "" && emergencycontactNumber !== "" && teachersignature !== "" );



    return (
        <>
            <div className="teacher-details" style={{ minHeight: 420 }}>
                <div className="teacher-header">
                    <ion-icon name="person" />
                    <span>Teacher History</span>
                </div>
                <form action="" className="teacher-form">                    
                    <div className="teach-box">
                        <label htmlFor="">
                            Educational Qualifications(Highest Degree)<sup>*</sup>
                        </label>
                        <select name="higherqualification" value={higherqualification} onChange={handleChange}>
                            <option></option>
                            <option>High School Diploma</option>
                            <option>Associate's Degree</option>
                            <option>Bachelor's Degree</option>
                            <option>Bachelor's Degree in Education</option>
                            <option>Master's Degree</option>
                            <option>Master's Degree in Education</option>
                            <option>Doctorate (Ph.D.) in Education</option>
                            <option>Teaching Certificate</option>
                            <option>Postgraduate Certificate in Education</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="teach-box">
                        <label htmlFor="">
                            Blood Group<sup>*</sup>
                        </label>
                        <select name="bloodgroup" value={bloodgroup} onChange={handleChange}>
                            <option />
                            <option>A+ve</option>
                            <option>A-ve</option>
                            <option>B+ve</option>
                            <option>B-ve</option>
                            <option>AB+ve</option>
                            <option>AB-ve</option>
                            <option>O+ve</option>
                            <option>O-ve</option>
                            <option>A1B+</option>
                            <option>A1B-</option>
                            <option>A2B+</option>
                            <option>A2B-</option>
                            <option>Bombay Blood Group</option>
                        </select>
                    </div>
                    <div className="teach-box">
                        <label htmlFor="">
                            Previous Teaching Experience (in Years)<sup>*</sup>
                        </label>
                        <input type="text" name="teachingexperience" value={teachingexperience} onChange={handleChange} />
                    </div>
                    <div className="teach-box">
                        <label htmlFor="">
                            Vaccination Details<sup>*</sup>
                        </label>
                        <input type="text" name="vaccination" value={vaccination} onChange={handleChange} />
                    </div>
                    <div className="teach-box">
                        <label htmlFor="">
                            Subject(s) Taught<sup>*</sup>
                        </label>
                        <input type="text" name="subjects" value={subjects} onChange={handleChange} />
                    </div>
                    <div className="teach-box">
                        <label htmlFor="">
                            Emergency Contact Number<sup>*</sup>
                        </label>
                        <input type="text" name="emergencycontactNumber" value={emergencycontactNumber} onChange={handleChange} maxLength={10} onBlur={() => (emergencycontactNumber.length < 10  ? setFocusOnEmergrncyNum(true) : setFocusOnEmergrncyNum (false))} />
                        {emergencycontactNumber.length < 10 && onFocusEmergrncyNum && <span className='text-error'>Please enter valid Mobile Number</span> }
                    </div>

                    <div className="teach-box">
          <label htmlFor="">
              Bus Stop<sup>*</sup>
            </label>
            <select
              name="vehicleRoute"
              value={SelectedBusRoute.vehicleRegisterNumber}
              onChange={handlerouteselection}
            >
              <option value=""></option>
              {VehicleList.map((route) => (
                <option key={route.vehicleRegisterNumber} value={route.vehicleRegisterNumber}>
                  {route.vehicleRoute}
                </option>
              ))}
            </select>
          </div>

          <div className="field-box">
            <label htmlFor="">
            Bus Number<sup>*</sup>
            </label>
            <input
              name="vehicleRegisterNumber"
              value={SelectedBusRoute.vehicleRegisterNumber}
              onChange={handlerouteselection}
            />
          </div>



                    <div className="teach-box">
                        <label htmlFor="">
                            Teaching Certifications(if any)<sup>*</sup>
                        </label>
                        <input type="text" name="teachingcertificates" value={teachingcertificates} onChange={handleChange} />
                    </div>
                    <div className="teach-box">
                        <label>
                            Digital Signature
                        </label>
                        <input type="file" id="file" name="teachersignature" onChange={handleFileChange} accept="image/*,application/pdf" />
                        <label htmlFor="file" className="t-photo">
                            <div style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faUpload} /></div>
                            {teachersignature ? (<span>{teachersignature.name}</span>) : <span>Drag and Drop or Browse Files</span>}
                        </label>
                        {displayFile(teachersignature)}
                        <span className='text-error'>{fileErrorMsg}</span>
                        {teachersignature === "" && fileErrorMsg === "" && <span className='text-error'>*No file uploaded</span>}
                    </div>                    
                </form>
            </div>
            <div className="btnn">
                <button
                    className='previous'
                    onClick={triggerPreviousForm}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className='myarrow' />
                    Previous
                </button>
                <button
        onClick={triggerNextForm}
        disabled={!isButtonDisable}
        style={{ backgroundColor: isButtonDisable ? '#ff80a6' : 'gray' }}
      >
        Next
        <img src="images/arrow.png" alt="" />
      </button>
            </div>
        </>
    )
}
export default TeacherHistory;
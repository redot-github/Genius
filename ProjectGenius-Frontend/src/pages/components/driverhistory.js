import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';

const DriverHistory = (props) => {
    const { formValue, setFormValue, handlePreClick, handleNextClick } = props

    const [fileErrorMsg, setFileErrorMsg] = useState('');


    const triggerPreviousForm = () => {
        handlePreClick()
    }

    const triggerNextForm = () => {
        handleNextClick()
      }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        const supportedExtension = [".jpg", ".png", ".jpeg", ".gif", ".pdf", ".doc"]
        const selectedFile = files[0];

        if (selectedFile) {
            const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf(".")).toLowerCase();

            if (!supportedExtension.includes(fileExtension)) {
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
                return <img src={url} style={{ width: "70px", marginTop: '5px' }} alt="Uploaded File" />;
            } else if (file.type === "application/pdf") {
                return <embed src={url} type="application/pdf" width="70px" height="70px" style={{ marginTop: '5px' }} />;
            }
        }
        return null;
    };

    const { role, higherqualification, drivingexperience, bloodgroup, licenceexpirydate, licencetype, licencephoto, licencenumber } = formValue;

    const isButtonDisable = (role !== "" && higherqualification !== "" && drivingexperience !== "" && bloodgroup !== ""  && licencephoto !== "");
    
    const isRoleselected = (role === "Attender")
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
                            Job Role<sup>*</sup>
                        </label>
                        <select name="role" value={role} onChange={handleChange}>
                            <option />
                            <option>Driver</option>
                            <option>Attender</option>
                        </select>
                    </div>
                    <div className="teach-box">
                        <label htmlFor="">
                            Licence Number<sup>*</sup>
                        </label>
                        <input type="text" name="licencenumber" value={licencenumber} onChange={handleChange}  disabled={isRoleselected} style={{ backgroundColor: isRoleselected ? 'transparent' : 'white' }}/>
                    </div>
                    <div className="teach-box">
                        <label htmlFor="">
                           Licence Type<sup>*</sup>
                        </label>
                        <select name="licencetype" value={licencetype} onChange={handleChange}  disabled={isRoleselected} style={{ backgroundColor: isRoleselected ? 'transparent' : 'white' }}>
                            <option />
                            <option>LMV</option>
                            <option>HMV</option>
                        </select>
                    </div>
                    <div className="teach-box">
                        <label htmlFor="">
                           Licence Expiry Date<sup>*</sup>
                        </label>
                        <div className='date-input-container '>
                            <input type="text" style={{ borderRadius: '4px 0px 0px 4px ' }} value={licenceexpirydate} placeholder='DD/MM/YYYY' readOnly  disabled={isRoleselected} />
                            <input type='date' name='licenceexpirydate' onChange={handleChange}   disabled={isRoleselected} style={{ backgroundColor: isRoleselected ? 'transparent' : 'white' }} />
                        </div>
                    </div>
                    <div className="teach-box">
                        <label htmlFor="">
                            Educational Qualifications(Highest Degree)<sup>*</sup>
                        </label>
                        <select name="higherqualification" value={higherqualification} onChange={handleChange}>
                            <option></option>
                            <option>SSLC</option>
                            <option>Higher Secondary</option>
                            <option>ITI/Diploma</option>
                            <option>Degree</option>
                            <option>Below SSLC</option>
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
                            Previous Driving Experience (in Years)<sup>*</sup>
                        </label>
                        <input type="text" name="drivingexperience" value={drivingexperience} onChange={handleChange} />
                    </div>
                    <div className="teach-box">
                        <label>
                           Upload Licence Photo<sup>*</sup>
                        </label>
                        <input type="file" id="file" name="licencephoto" onChange={handleFileChange} accept="image/*,application/pdf" />
                        <label htmlFor="file" className="t-photo">
                            <div style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faUpload} /></div>
                            {licencephoto ? (<span>{licencephoto.name}</span>) : <span>Drag and Drop or Browse Files</span>}
                        </label>
                        {displayFile(licencephoto)}
                        <span className='text-error'>{fileErrorMsg}</span>
                        {licencephoto === "" && fileErrorMsg === "" && <span className='text-error'>*No file uploaded</span>}
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
export default DriverHistory;
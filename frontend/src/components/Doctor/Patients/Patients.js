import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import DoctorDashboard from "../DoctorDashboard/DoctorDashboard";
// import './DoctorDashboard.css'

const PatientInformation = () => {
    const [patient, setpatient] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3005/doctor/appointmentList")
            .then(response => {
                setpatient(response.data.Data);
                
            }).catch(err => {
                console.log(err);
            })
    }, []);
    

    return <>
    <DoctorDashboard/>
    <div className="conatiner">
        <div className="row">
            <div className="col"></div>
        </div>
    </div>
    <div className="home">
            {/* <div className="containerr d-flex align-items-center justify-content-center flex-wrap"> */}
                <div className="containerr-inline d-flex align-items-center justify-content-center m-1 flex-wrap col-lg-6" style={{ gap: "0" }}>
                    {patient.map((patientsinfo, index) => <div key={index}>
                        <div className="remede-box  d-flex flex-column align-items-center justify-content-start m-4 text-center" style={{height:"390px",width:"300px"}}>
                            <div className="remede-img m-3"> <FaRegUserCircle style={{ height: "85%", width: '85%',color: "var(--green)" }} /></div>
                            {/* <div className="remede-value d-flex flex-column justify-content-center align-items-center"> */}
                                <span className="fs-5  ms-2 me-2">Name:{patientsinfo.name}</span>
                                <span className="fs-5  ms-2 me-2">Age :{patientsinfo.age},{patientsinfo.gender}</span>
                                <span className="d-flex flex-wrap fs-5 m-1">Phone No.{patientsinfo.phone}</span>
                                <span className="d-flex flex-wrap  fs-5 m-1">Email:{patientsinfo.email}</span>
                            {/* </div> */}
                        </div>
                    </div>
                    )}
                </div>
            </div>
        {/* </div> */}
    </>
}
export default PatientInformation;
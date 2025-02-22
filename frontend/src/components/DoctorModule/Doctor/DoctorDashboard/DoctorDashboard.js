import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserDoctor } from "react-icons/fa6";
import './DoctorDashboard.css'
import { Link, Outlet } from "react-router-dom";


const DoctorDashboard = () => {
    const [doctorConsult, setDoctorConsult] = useState({ "id": 10, "qualification": "BAMS (Bachelor of Ayurvedic Medicine and Surgery)", "experience": 5, "gender": "male", "language": "English", "clinicAddress": "asdfasdasd", "doctorimage": "C:\\fakepath\\Screenshot 2024-02-21 000352.png", "specialization": "asdfasdf", "doctorId": 16, "createdAt": "2024-05-10T09:12:55.000Z", "updatedAt": "2024-05-10T09:12:55.000Z", "doctor": { "id": 16, "doctorName": "raj", "email": "raj@gmail.com", "password": "$2a$10$qsCHKQbmzOYgn6j42yIx..7Wbk2i2hgnMlQNYeJWh5QIOAqt7/Yp.", "contactNumber": "8767656545", "registrationNumber": "124352", "createdAt": "2024-05-10T06:48:19.000Z", "updatedAt": "2024-05-10T06:48:19.000Z" } });
    useEffect(() => {
        axios.post("http://localhost:3005/doctor/doctorProfile", { id: localStorage.getItem("doctorId") })
            .then(response => {
                setDoctorConsult(response.data.data);
            }).catch(err => {
                console.log(err);
            })
    }, [localStorage.getItem("doctorId")]);

    return <>

        <div className="container mt-3">
            <div className="main-body">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="position-relative d-flex flex-column bg-white border border-0 rounded mb-1 card" style={{ minWidth: "0", wordWrap: "break-word", backgroundClip: "border-box", boxShadow: "0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%)" }}>
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={doctorConsult.doctorimage} alt="Admin" className="rounded-circle bg-light" width="110" />
                                    <div className="mt-3">
                                        <h4>{doctorConsult.doctor.doctorName}</h4>

                                        <p className="text-muted font-size-sm">{doctorConsult.specialization}</p>
                                        {/* <button className="btnn text-white">Message</button> */}
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <ul className="list-group list-group-flush rounded-2" style={{ background: "var(--green)" }}>
                                    <Link to="" className="link" >
                                        <li role='button' className="rounded-2 bg-transparent list-group-item text-white cursor-pointer d-flex justify-content-between align-items-center flex-wrap" >
                                            <h6 className="m-0 p-2 rounded-2 bg-transparent h-100 w-100">Appointments</h6>
                                        </li>
                                    </Link>
                                    <hr className='m-0 border-white border' />
                                    <Link to="doctorconsultation" className="link">
                                        <li role='button' className="rounded-2 bg-transparent list-group-item text-white cursor-pointer d-flex justify-content-between align-items-center flex-wrap" >
                                            <h6 className="m-0 p-2 rounded-2 bg-transparent h-100 w-100">Consult</h6>
                                        </li>
                                    </Link>
                                    <hr className='m-0 border-white border' />
                                    <Link to="profilesetting" className="link">
                                        <li role='button' className="rounded-2 bg-transparent list-group-item text-white cursor-pointer d-flex justify-content-between align-items-center flex-wrap" >
                                            <h6 className="m-0 p-2 rounded-2 bg-transparent h-100 w-100">Profile Setting</h6>
                                        </li>
                                    </Link>
                                    <hr className='m-0 border-white border' />
                                    <Link to="/" onClick={() => { localStorage.removeItem("doctorId") }} className="link">
                                        <li role='button' className="rounded-2 bg-transparent list-group-item text-white cursor-pointer d-flex justify-content-between align-items-center flex-wrap" >
                                            <h6 className="m-0 p-2 rounded-2 bg-transparent h-100 w-100">LogOut</h6>
                                        </li>
                                    </Link>
                                    <hr className='m-0 border-white border' />
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>


    </>
}
export default DoctorDashboard;
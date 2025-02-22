import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserDoctor } from "react-icons/fa6";
import './DoctorDashboard.css'
import { Link, Outlet } from "react-router-dom";


const DoctorDashboard = () => {
    const [doctorConsult, setDoctorConsult] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3005/doctor/doctorconsult")
            .then(response => {
                console.log(response.data.result);
                setDoctorConsult(response.data.result);
            }).catch(err => {
                console.log(err);
            })
    }, []);
    

    return <>

        <div>
            <h1>Dashboard</h1>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        {doctorConsult.map((doctor, index) => (
                            <div key={index}>
                                <div className="doctor-profile container border shadow-lg p-3 mb-5 bg-body rounded mt-5 mb-4">
                                    <div className='row mt-3 mb-2 '>
                                        <div className="doctor-imgs d-flex justify-content-center align-item-center ">
                                            <img src={doctor.doctordetail.doctorImage} alt="Doctor Image" className="doctor-image rounded-circle" />
                                        </div>

                                        <div className=' profile-info mt-2 ms-5 d-flex justify-content-center align-item-center flex-column'>
                                            <h1 className="fs-5">{doctor.doctorName}</h1>
                                            <div className='doctor-details'>
                                                <div>
                                                    <FaUserDoctor style={{fontSize:"14px"}} />
                                                    <span style={{ margin: "15px",fontSize:"14px" }}>{doctor.doctordetail.specialization}</span>
                                                </div>
                                                <div>

                                                </div>
                                            </div>
                                           
                                        </div>
                                        <div className=" d-flex justify-content-center align-item-center">
                                                <ul className="mt-2 list-group " style={{listStyle:"none"}}>
                                                    <li className="border shadow-lg p-3  bg-body rounded px-5 ">Dashboard</li>
                                                    <li className="border shadow-lg p-3  bg-body rounded px-5 ">Appointments</li>
                                                    <li className="border shadow-lg p-3  bg-body rounded  px-5">My Patients</li>
                                                    <Link to="doctorconsultation">
                                                    <li className="border shadow-lg p-3  bg-body rounded  px-5">Consultr</li>
                                                    </Link>
                                                    <li className="border shadow-lg p-3  bg-body rounded px-5">Profile Setting</li>
                                                    <li className="border shadow-lg p-3  bg-body rounded px-5">LogOut</li>
                                                </ul>
                                            </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-8">
                        {/* <Link to="">
                        
                        </Link> */}
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default DoctorDashboard;
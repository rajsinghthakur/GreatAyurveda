import axios from "axios";
import { useEffect, useState } from "react";
const DoctorAppointment = () => {
    const doctorId = localStorage.getItem("doctorId");
    const [doctorAppointment, setDoctorAppointment] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:3005/doctor/appointmentList", { doctorid: doctorId })
            .then(response => {
                // console.log(response.data.Data);
                setDoctorAppointment(response.data.Data);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    return <>
        <div className="p-0 m-0 qwerty">
            <h2 className="d-flex justify-content-center align-items-center" style={{ color: "var(--green)" }}>Appointment</h2>
            <div className="shadow-lg p-3 mt-2 b
            g-body rounded  table-responsive">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Appointment Date</th>
                            <th>Time</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorAppointment.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.name}</td>
                                <td>{patient.appointmentDate.split("T")[0]}</td>
                                <td>{patient.appointmentTime}</td>
                                <td>{patient.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
export default DoctorAppointment;




import axios from "axios";
import { useEffect, useState } from "react";
// const doctorid = localStorage.getItem("doctorId");
const doctorid = 8;

const DoctorConsultation = () => {
    const [doctorConsultation, setDoctorConsultation] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:3005/consult/getconsultdata", { doctorid: 1 })
            .then(response => {
                if (response.data[0])
                    setDoctorConsultation(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return <>
        <div className="qwerty">
            <h2 className="d-flex justify-content-center align-items-center" style={{ color: "var(--green)" }}>Consultation</h2>
            <div className="container shadow-lg p-3 mt-3 mb-5 b
            g-body rounded table-responsive ">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Phone Number</th>
                            <th>Symptoms</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorConsultation.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.name}</td>
                                <td>{patient.phone}</td>
                                <td>{patient.message}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
        </div>
    </>


}
export default DoctorConsultation;




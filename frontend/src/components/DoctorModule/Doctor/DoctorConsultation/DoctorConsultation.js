import axios from "axios";
import { useEffect, useState } from "react";

const DoctorConsultation = () => {
    const [doctorConsultation, setDoctorConsultation] = useState([]);
    const doctorId = localStorage.getItem("doctorId");
    useEffect(() => {
        axios.post("http://localhost:3005/consult/getconsultdata", { doctorid: doctorId })
            .then(response => {
                // setDoctorConsultation(response.data.Data);
                console.log("response", response);
            }).catch(err => {
                console.log("err", err);
            })
    }, []);

    return <>
        <div className="border border-dark p-0 m-0 qwerty">
            <h1 >Consultation</h1>
            <div className="table-responsive border shadow-lg p-3 mt-2 b
            g-body rounded ">

                <table className="table ">
                    <thead>
                        <tr>
                            <th> Patient Name</th>
                            <th>Phone Number</th>
                            <th>Symptoms</th>
                            +
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




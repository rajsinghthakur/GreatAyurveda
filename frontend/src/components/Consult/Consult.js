import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { LiaLanguageSolid } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import "./Consult.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";





const Consult = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const doctorId = localStorage.getItem("doctorId");

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: '',
        doctorId: state.doctorId
    });
    // console.log(state.doctorId);
    const [successMessage, setSuccessMessage] = useState('');
    const [failureMessage, setFailureMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Clear previous errors for the field
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateFormData(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios.post(process.env.React_APP_SECRET_KEY_DoctorConsult, { formData })
            .then(response => {
                setSuccessMessage("Message sent successfullly !");
                toast.success("Message sent successfullly !");
                setFormData({
                    name: '',
                    phone: "",
                    message: " ",
                    doctorId: state.doctorId
                });
                setShowModal(true);
            })
            .catch(err => {
                console.log(err);
                setFailureMessage('Failed to send message. Please try again later.');
                toast.error('Failed to send message. Please try again later.');

            })
    };

    const validateFormData = (data) => {
        const errors = {};

        if (!data.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!data.phone.trim()) {
            errors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(data.phone)) {
            errors.phone = 'Invalid phone number';
        }
        if (!data.message.trim()) {
            errors.message = 'Message is required';
        }

        return errors;
    };

    const back = () => {
        navigate(-1)
    }

    return (
        <>
            <ToastContainer />
            <div className="doctor-consult container  rounded my-4 shadow-lg p-3 mt-0 bg-body rounded">
                <div className='row mb-2 alldata pt-2 pb-2 '>
                    <div className='col-4'>
                        <div className="doctor-img">
                            <img src={state.doctorimage} alt="Doctor Image" className="doctor-images rounded-circle border-3" />
                        </div>
                    </div>
                    <div className='col-8 profile-info'>
                        <h1>{state.doctor.doctorName}</h1>
                        <div className='doctor-detail'>
                            <div><FaUserDoctor /><span style={{ margin: "15px" }}>{state.specialization}</span></div>
                            <div><MdWorkHistory /><span style={{ margin: "15px" }}>{state.experience} years of experience</span></div>
                            <div><FaGraduationCap /><span style={{ margin: "15px" }}>{state.qualification}</span></div>
                            <div><LiaLanguageSolid /><span style={{ margin: "15px" }}>{state.language}</span></div>
                            <div className="contact-info">
                                <div className="address">
                                    <IoLocationOutline />
                                    <span style={{ margin: "15px" }}>{state.clinicAddress}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <form>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-8 form-data">
                                    <div className="form-group">
                                        <label htmlFor="name">Name<span> *</span></label>
                                        <input type="text" className="form-control form-control-sm custom-input mb-3" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                        {errors.name && <div className="text-danger">{errors.name}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone<span> *</span></label>
                                        <input type="tel" className="form-control form-control-sm custom-input mb-3" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Tell us your symptom or health problem<span> *</span></label>
                                        <input type="text" className="form-control form-control-sm custom-input mb-3" id="message" name="message" value={formData.message} onChange={handleChange} required />
                                        {errors.message && <div className="text-danger">{errors.message}</div>}
                                    </div>
                                    <div>
                                        <button onClick={back} className="btnn text-white mt-3">Back</button>
                                        <button onClick={handleSubmit} type="submit" className="btnn text-white mb-3 ms-3">Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default Consult;

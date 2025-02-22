import React, { useState } from "react";
import axios from "axios";

export const DoctorDetailsForm = () => {
    const [formData, setFormData] = useState({
        doctorName: "",
        email: "",
        contactNumber: "",
        registrationNumber: "",
        qualification: "",
        experience: "",
        gender: "",
        language: "",
        clinicAddress: "",
        doctorImage: "",
        specialization: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:3005/doctor/doctorFormDetails', formData)
                .then(res => {
                    console.log('Form data sent successfully:', res.data);
                    // Optionally, you can reset the form here
                    setFormData({
                        doctorName: "",
                        email: "",
                        contactNumber: "",
                        registrationNumber: "",
                        qualification: "",
                        experience: "",
                        gender: "",
                        language: "",
                        clinicAddress: "",
                        doctorImage: "",
                        specialization: ""
                    });
                    setErrors({});
                })
                .catch(err => {
                    console.error('Error sending form data:', err);
                });
        }
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!formData.doctorName) {
            formIsValid = false;
            errors["doctorName"] = "Please enter doctor's name.";
        }

        if (!formData.email) {
            formIsValid = false;
            errors["email"] = "Please enter email address.";
        } else if (!formData.email.match(/^[^\s@]+@gmail\.com$/)) {
            formIsValid = false;
            errors["email"] = "Please enter a valid Gmail address.";
        }

        // Add validation for other fields as needed...

        setErrors(errors);
        return formIsValid;
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="doctorName" className="form-label">Doctor's Name:</label>
                    <input type="text" className="form-control" id="doctorName" name="doctorName" value={formData.doctorName} onChange={handleChange} />
                    <div className="text-danger">{errors["doctorName"]}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                    <div className="text-danger">{errors["email"]}</div>
                </div>
                {/* Add other form fields similarly */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

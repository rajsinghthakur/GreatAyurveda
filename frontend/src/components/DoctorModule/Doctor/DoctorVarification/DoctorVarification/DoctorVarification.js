import React, { useState } from "react";
import "./DoctorVarification.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorVarification = () => {
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [language, setLanguage] = useState("");
  const [time, setTime] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [doctorImage, setDoctorImage] = useState("");
  const [gender, setGender] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setDoctorImage("base64String");
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const addDoctorDetails = () => {
    if (
      qualification &&
      experience &&
      language &&
      time &&
      specialization &&
      clinicAddress &&
      doctorImage &&
      gender
    ) {
      axios
        .post("http://localhost:3005/doctor/addDoctordetail", {
          qualification,
          experience,
          language,
          time,
          specialization,
          gender,
          clinicAddress,
          doctorImage,
          doctorId: localStorage.getItem("doctorId"),
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Data added successfully.");
            navigate("/doctorDashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to add data.");
        });
    } else {
      toast.info("Please fill in all details.");
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-center mt-2 mb-2">Doctor Verification</h1>
      <div className="container mt-3 p-3 mb-3 border">
        <div className="row">
          <div className="col-md-6">
            Qualification
            <select
              name="qualification"
              className="form-control"
              id="qualification"
              onChange={(e) => setQualification(e.target.value)}
            >
              <option value="">Select Qualification</option>
              <option value="BAMS">BAMS</option>
              <option value="MD">MD</option>
              <option value="MS">MS</option>
            </select>
          </div>
          <div className="col-md-6">
            Experience
            <input
              type="text"
              className="form-control"
              placeholder="Enter Experience"
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-3">
            Language
            <select
              name="language"
              className="form-control"
              id="language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="col-md-6 mt-3">
            Specialization
            <input
              type="text"
              className="form-control"
              placeholder="Specialization"
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-3 genderClass">
            Gender
            <div>
              <label htmlFor="male" className="ms-2">
                Male
              </label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female" className="ms-2">
                Female
              </label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 mt-3">
            Doctor Image
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-3">
            Select Time
            <select
              name="time"
              className="form-control"
              id="time"
              multiple
              onChange={(e) => setTime(Array.from(e.target.selectedOptions).map(option => option.value))}
            >
              <option value="10:00 AM">10:00 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="12:30 PM">12:30 PM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="01:30 PM">01:30 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="02:30 PM">02:30 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="03:30 PM">03:30 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="04:30 PM">04:30 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="05:30 PM">05:30 PM</option>
              <option value="06:00 PM">06:00 PM</option>
              <option value="06:30 PM">06:30 PM</option>
            </select>
          </div>
          <div className="col-md-6 mt-3">
            Clinic Address
            <textarea
              className="form-control"
              placeholder="Enter Clinic Address"
              onChange={(e) => setClinicAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <button
              type="submit"
              onClick={addDoctorDetails}
              className="btn btn-primary"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorVarification;

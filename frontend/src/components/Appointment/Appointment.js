import { useLocation, useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import React, { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { LiaLanguageSolid } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import "./Appointment.css";
import ReactHorizontalDatePicker from 'react-horizontal-strip-datepicker';
import 'react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css';
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Appointment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const back = () => {
        navigate("/");
        navigate("/doctorConsult");
    };
    const currentDate = new Date();
    const [selectedTime, setSelectedTime] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDate, setSelectedDate] = useState("");
    const [time, setTime] = useState("");

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleTimeSelection = (time) => {
        setTime(time);
        setSelectedTime(time);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            name: name,
            phone: phone,
            email: email,
            age: age,
            gender: selectedOption,
            appointmentTime: time,
            appointmentDate: selectedDate,
            doctorId: state.doctorId
        };

        try {
            if (name && phone && email && age && selectedOption && time && selectedDate) {
                axios.post(process.env.React_APP_SECRET_KEY_DoctorAppointment, formData).then(res => {
                    toast.success("Appointment booked successfully");
                }).catch(err => {
                    console.log("hello", err);
                });
            } else {
                toast.error("Please fill all the fields");
            }

            setName('');
            setPhone('');
            setAge('');
            setSelectedOption('');
            setSelectedTime('');
            setSelectedDate('');
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
        console.log(formData);
    };

    return (
        <>
            <ToastContainer />
            <div className="doctor-consult container rounded my-5 shadow-lg p-0 bg-body rounded">
                <RxCross2 className="closeicon text-white mt-2" onClick={back} />
                <h1 className="fs-3 text-center text-white p-2" style={{ background: "var(--green)" }}>Schedule Appointment</h1>
                <div className='m-2 py-2 row alldata'>
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
                                    <IoLocationOutline /><span style={{ margin: "15px" }}>{state.clinicAddress}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="calender">
                    <ReactHorizontalDatePicker
                        selectedDay={handleDateSelection}
                        enableScroll={true}
                        enableDays={180}
                    />
                </div>
                <div className="timing-slots">
                    <div className="time mb-2 mt-2 ">
                        {state.time.split("M")?.filter(timeValue => timeValue).map((timeValue, index) => (
                            <span
                                key={index}
                                onClick={() => handleTimeSelection(timeValue + "M")}
                                className={`time mb-2 mt-2 time-span border border-dark ${selectedTime === timeValue + "M" ? 'selected' : ''}`}
                            >
                                {timeValue}M
                            </span>
                        ))}
                    </div>
                </div>

                <form>
                    <div className="form-group">
                        <div className="row">
                            <div className="mx-3 col-md-8 form-data">
                                <div className="form-group"><br></br><label htmlFor="name">Name<span> *</span></label>
                                    <input type="text" className="form-control form-control-sm custom-input custom-input mb-3" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Phone">Phone<span> *</span></label>
                                    <input type="text" className="form-control form-control-sm custom-input custom-input mb-3" id="Phone" name="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="[0-9]{10}" title="Please enter a 10 digit phone number." />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email<span> *</span></label>
                                    <input type="text" className="form-control form-control-sm custom-input custom-input mb-3" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Please enter a valid email address." />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Age">Age<span> *</span></label>
                                    <input type="text" className="form-control form-control-sm custom-input custom-input mb-3" id="Age" name="Age" value={age} onChange={(e) => setAge(e.target.value)} required min="1" max="100" title="Please enter a valid age between 1 and 100." />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Gender">Gender<span> *</span></label><br></br><br></br>
                                    <label htmlFor="Gender">
                                        male
                                        <input
                                            type="radio"
                                            className=" ms-2"
                                            value="male"
                                            checked={selectedOption === 'male'}
                                            onChange={handleOptionChange}
                                        />
                                    </label>
                                    <label className=" ms-4">
                                        female
                                        <input
                                            type="radio"
                                            className=" ms-2"
                                            value="female"
                                            checked={selectedOption === 'female'}
                                            onChange={handleOptionChange}
                                        />
                                    </label>
                                    <label className=" ms-4">
                                        other
                                        <input
                                            type="radio"
                                            className=" ms-2"
                                            value="other"
                                            checked={selectedOption === 'other'}
                                            onChange={handleOptionChange}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <button onClick={handleSubmit} type="submit" className="btnnn text-white mb-3 ms-3 mt-4">Book Appointment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Appointment;

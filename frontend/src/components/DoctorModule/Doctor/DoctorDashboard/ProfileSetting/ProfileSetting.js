import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
// import './DoctorDashboard.css'
import { toast, ToastContainer } from "react-toastify";

const ProfileSetting = () => {

    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setcontactNumber] = useState("");

    let [email2, setemail2] = useState("");
    let [password2, setpass2] = useState("");
    let [doctorname2, setdoctorname2] = useState("");
    let [number2, setnumber2] = useState("");
    
    const Submit = () => {
                             
        if ((name === "") && (email === "") && (password === "") && (contactNumber === "") || ((name === "" || (email === "") || (password === "") || (contactNumber === "")))) {
            toast.error("First Fill information")
        }
        else {
            axios.put("http://localhost:3005/doctor/updateProfile", { name, email, password, contactNumber })
                .then(response => {
                    toast.success("Profile Updated Successfully");
                }).catch(err => {
                    toast.error("No update Profile");
                })
        }
    }

    return <>
        <ToastContainer />
    <div class="container p-3 " >
    <form className=" d-flex justify-content-center align-items-center flex-column">
        <h2 className="mb-4" style={{color:"var(--green)"}}>Docter Profile Update</h2>
      <div class="form-group col-md-9">
        <label for="Email">Email</label>
        <input className ="form-control"  onChange={(event) => { (event.target.value === "") ? setemail2("email is required") : (!event.target.value.match(/^[^\s@]+@/)) ? setemail2("Email must start with valid characters.") : (!event.target.value.match(/@gmail\.com$/)) ? setemail2("Email must end with '@gmail.com'.") : setemail2(""); setEmail(event.target.value); }} type="email" placeholder=" enter Email" />
        <small className="text-danger" style={{ fontSize: "12px" }}>{email2}</small>
      </div>
      <div class="form-group col-md-9">
        <label for="password">Password</label>
        <input className ="form-control"  onChange={(event) => { (event.target.value === "") ? setpass2("password is required") : (!event.target.value.match(/^(?=.\d)/)) ? setpass2("Password must contain at least one digit.") : (!event.target.value.match(/^(?=.[a-zA-Z])/)) ? setpass2("Password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setpass2("Password must be at least 5 characters long.") : setpass2(""); setPassword(event.target.value); }} type="password" placeholder="  Password" />
        <small className="text-danger" style={{ fontSize: "12px" }}>{password2}</small>
      </div>
      <div class="form-group col-md-9">
        <label for="Docter Name">Doctor Name</label>
        <input className ="form-control"  onChange={(event) => { (event.target.value === "") ? setdoctorname2("name is required") : (!event.target.value.match("^[a-z A-Z]+$")) ? setdoctorname2("name contains only charecters") : (!event.target.value.match("^[a-z A-Z]{2,20}$")) ? setdoctorname2("name must be at least 2 characters long.") : setdoctorname2(""); setname(event.target.value); }} type="text" placeholder="  Name" />
       <small className="text-danger" style={{ fontSize: "12px" }}>{doctorname2}</small>
      </div>
      <div class="form-group col-md-9">
        <label for="Contact No">Contact No</label>
        <input className ="form-control"  type="tel" onChange={(event) => { (event.target.value === "") ? setnumber2("number is required") : (!event.target.value.match(/^[0-9]+$/)) ? setnumber2("Number must contain only digits.") : (!event.target.value.match(/^\d{10}$/)) ? setnumber2("Number must only 10 digits.") : setnumber2(""); setcontactNumber(event.target.value); }} placeholder="  Number" />
        <small className="text-danger" style={{ fontSize: "12px" }}>{number2}</small>
        <br></br>
      <button type="submit" class="btn btn-primary mt-3" style={{background:"var(--green)", height:"40px",width:"150px", }}>Submit</button>
      </div>
     
    </form>
  </div>
    </>
}
export default ProfileSetting;
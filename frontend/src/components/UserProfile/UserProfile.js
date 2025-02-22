import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
export default function UserProfile() {
    const Name = document.getElementById('name');
    const Email = document.getElementById('email');
    const ContactNumber = document.getElementById('contactNumber');
    const State = document.getElementById('state');
    const City = document.getElementById('city');
    const Address = document.getElementById('address');
    const Pincode = document.getElementById('pincode');

    const [userData, setuserData] = useState([]);
    const [userData2, setuserData2] = useState([]);
    let id = localStorage.getItem('userId');
    const UserInformation = () => {
        setbuttondisplyblock(true)
        setbuttondisplyblock2(true)
        axios.post(process.env.React_APP_SECRET_KEY_GetUser, { id })
            .then(response => {
                setuserData(response.data.data);
                setuserData2(response.data.data);
                setdisabledinput(1);
            }).catch(err => {
                console.log(err);
            })
    };
    useEffect(() => {
        UserInformation();
    }, [localStorage.getItem('userId')]);

    const [disabledinput, setdisabledinput] = useState(1);
    const [buttondisplyblock, setbuttondisplyblock] = useState(true);
    const [buttondisplyblock2, setbuttondisplyblock2] = useState(true);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [contactNumber, setcontactNumber] = useState("");
    const [gender, setgender] = useState("");
    const [state, setstate] = useState("");
    const [city, setcity] = useState("");
    const [address, setaddress] = useState("");
    const [pincode, setpincode] = useState("");
    const [oldpassword, setoldpassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [conformpassword, setconformpassword] = useState("");

    const PersonalInformation = () => {
        if (id !== "" && name !== "" && email !== "" && contactNumber !== "" && gender !== "") {
            if (userData2 !== "") {
                toast.info("every thing is uptodate")
            } axios.put(process.env.React_APP_SECRET_KEY_UpdateProfile, { id, name, email, contactNumber, gender })
                .then(response => {
                    toast.success("Personal Information updated !");
                    UserInformation();
                }).catch(err => {
                    console.log(err);
                    toast.error("Incorrect Information");
                })
        } else {
            if (userData2 !== "") {
                toast.info("every thing is uptodate")
            } else {
                toast.warning("Plese fill the all fields !");
            }
        }
    };
    const MyAddress = () => {
        if (id !== "" && state !== "" && city !== "" && address !== "" && pincode !== "") {
            if (userData2 !== "") {
                toast.info("every thing is uptodate")
            } axios.put(process.env.React_APP_SECRET_KEY_UpdateAddress, { id, state, city, address, pincode })
                .then(response => {
                    toast.success("Address Updated !");
                    UserInformation();
                }).catch(err => {
                    console.log(err);
                    toast.error("Incorrect Information");
                })
        } else {
            if (userData2 !== "") {
                toast.info("every thing is uptodate")
            } else {
                toast.warning("Plese fill the all fields !");
            }
        }
    };
    const ChangePassword = () => {
        if (id !== "" && oldpassword !== "" && newpassword !== "" && conformpassword !== "") {
            if (newpassword === conformpassword) {
                axios.put(process.env.React_APP_SECRET_KEY_UpdatePassword, { id, oldpassword, newpassword })
                    .then(response => {
                        if (response.status === 200) {
                            toast.success("Password Successfuly Chenged....")
                        } else {
                            toast.info("Old Password Dos't Match....")
                        }
                    }).catch(err => {
                        console.log(err);
                        toast.error("Old Password Dos't Match....")
                    })
            } else {
                toast.warning("confirm both password are same !");
            }
        } else {
            toast.warning("Plese fill the all fields !");
        }

    };

    const [visibleDiv, setVisibleDiv] = useState(1);
    const handleButtonClick = (divId) => {
        setVisibleDiv(divId);
    };

    return <>
        <div className="container mt-3">
            <div className="main-body">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="position-relative d-flex flex-column bg-white border border-0 rounded mb-1 card" style={{ minWidth: "0", wordWrap: "break-word", backgroundClip: "border-box", boxShadow: "0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%)" }}>
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={(userData.gender) === "male" ? "https://bootdey.com/img/Content/avatar/avatar7.png" : ((userData.gender) === "female") ? "https://img.freepik.com/premium-photo/fantasy-woman-art_862994-22519.jpg?w=740" : "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-18.jpg"} alt="Admin" className="rounded-circle bg-light" width="110" />
                                    <div className="mt-3">
                                        <h4>{userData.name}</h4>
                                        <p className="text-secondary mb-1">{userData.contactNumber}</p>
                                        <p className="text-muted font-size-sm">{userData.email}</p>
                                        <button className="btnn text-white">Message</button>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <ul className="list-group list-group-flush rounded-2" style={{ background: "var(--green)" }}>
                                    <li role='button' className="rounded-2 bg-transparent list-group-item text-white cursor-pointer d-flex justify-content-between align-items-center flex-wrap" onClick={() => { handleButtonClick(1); UserInformation(); }}>
                                        <h6 className="m-0 p-2 rounded-2 bg-transparent h-100 w-100">Personal Information</h6>
                                    </li>
                                    <hr className='m-0 border-white border' />
                                    <li role='button' className="rounded-2 bg-transparent list-group-item text-white cursor-pointer d-flex justify-content-between align-items-center flex-wrap" onClick={() => { handleButtonClick(2); UserInformation(); }}>
                                        <h6 className="m-0 p-2 rounded-2 bg-transparent h-100 w-100">My Address</h6>
                                    </li>
                                    <hr className='m-0 border-white border' />
                                    <li role='button' className="rounded-2 bg-transparent list-group-item text-white cursor-pointer d-flex justify-content-between align-items-center flex-wrap" onClick={() => { handleButtonClick(3); }}>
                                        <h6 className="m-0 p-2 rounded-2 bg-transparent h-100 w-100">Change Password</h6>
                                    </li>
                                    <hr className='m-0 border-white border' />
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="position-relative d-flex flex-column bg-white border border-0 rounded mb-1 card" style={{ minWidth: "0", wordWrap: "break-word", backgroundClip: "border-box", boxShadow: "0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%)" }}>
                            {/* Personal Information ======================================================= */}
                            <div className="card-body pt-1" style={{ display: visibleDiv === 1 ? "block" : "none" }}>
                                <h4 className="mb-4 fw-bold text-center" style={{ color: "var(--green)" }}>Personal Information</h4>
                                <div className="row mb-3">
                                    <div className="col-sm-3 mb-2">
                                        <h6 className="mb-0">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control fs-6 bg-transparent" onChange={(event) => setname(event.target.value)} id='name' placeholder='Enter Full Name' disabled={disabledinput} value={userData2.name} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3 mb-2">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control fs-6 bg-transparent" onChange={(event) => setemail(event.target.value)} id='email' placeholder='Enter Email' disabled={disabledinput} value={userData2.email} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3 mb-2">
                                        <h6 className="mb-0">Mobile</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="number" className="form-control fs-6 bg-transparent" onChange={(event) => setcontactNumber(event.target.value)} id='contactNumber' placeholder='Enter Contact Number' disabled={disabledinput} value={userData2.contactNumber} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3 mb-2">
                                        <h6 className="mb-0">Gender</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary d-flex gap-3">
                                        <div className="form-check">
                                            <input className="form-check-input" onClick={(event) => setgender(event.target.value)} type="radio" name="exampleRadios" id="exampleRadios1" value="male" disabled={disabledinput} checked={(userData2.gender === "male")} />
                                            <label className="form-check-label" htmlFor="exampleRadios1">Male</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" onClick={(event) => setgender(event.target.value)} type="radio" name="exampleRadios" id="exampleRadios2" value="female" disabled={disabledinput} checked={(userData2.gender === "female")} />
                                            <label className="form-check-label" htmlFor="exampleRadios2">Female</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" onClick={(event) => setgender(event.target.value)} type="radio" name="exampleRadios" id="exampleRadios3" value="other" disabled={disabledinput} />
                                            <label className="form-check-label" htmlFor="exampleRadios3">Other</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-9 text-secondary gap-2 d-flex">
                                        <button className="btnn text-white p-2" style={{ display: (buttondisplyblock) ? "block" : "none" }} onClick={() => { setuserData2(""); setdisabledinput(0); setbuttondisplyblock(false); Name.value = userData2.name; setname(userData2.name); Email.value = userData2.email; setemail(userData2.email); ContactNumber.value = userData2.contactNumber; setcontactNumber(userData2.contactNumber); setgender(userData2.gender); }}>Update Profile</button>
                                        <button className="btnn text-white p-2" style={{ display: (buttondisplyblock) ? "none" : "block" }} onClick={() => { PersonalInformation(); }}>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                            {/* My Address ============================================================ */}
                            <div className="card-body pt-1" style={{ display: visibleDiv === 2 ? "block" : "none" }}>
                                <h4 className="mb-4 fw-bold text-center" style={{ color: "var(--green)" }}>My Address</h4>
                                <div className="row mb-3">
                                    <div className="col-sm-3 mb-2">
                                        <h6 className="mb-0">State</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control fs-6 bg-transparent" onChange={(event) => setstate(event.target.value)} id='state' placeholder='Enter State' disabled={disabledinput} value={userData2.state} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3 mb-2">
                                        <h6 className="mb-0">City</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control fs-6 bg-transparent" onChange={(event) => setcity(event.target.value)} id='city' placeholder='Enter City' disabled={disabledinput} value={userData2.city} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3 mb-2">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control fs-6 bg-transparent" onChange={(event) => setaddress(event.target.value)} id='address' placeholder='Enter Address' disabled={disabledinput} value={userData2.address} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3 mb-2">
                                        <h6 className="mb-0">Pincode</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="number" className="form-control fs-6 bg-transparent" onChange={(event) => setpincode(event.target.value)} id='pincode' placeholder='Enter Pincode' disabled={disabledinput} value={userData2.pincode} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-9 text-secondary gap-2 d-flex">
                                        <button className="btnn text-white p-1 py-2" style={{ display: (buttondisplyblock2) ? "block" : "none" }} onClick={() => { setuserData2(""); setdisabledinput(0); setbuttondisplyblock2(false); State.value = userData2.state; setstate(userData2.state); City.value = userData2.city; setcity(userData2.city); Address.value = userData2.address; setaddress(userData2.address); Pincode.value = userData2.pincode; setpincode(userData2.pincode); }}>Update Address</button>
                                        <button className="btnn text-white p-1 py-2" style={{ display: (buttondisplyblock2) ? "none" : "block" }} onClick={() => { MyAddress(); }}>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                            {/* Change Password========================================= */}
                            <div className="card-body pt-1" style={{ display: visibleDiv === 3 ? "block" : "none" }}>
                                <h4 className="mb-4 fw-bold text-center" style={{ color: "var(--green)" }}>Change Password</h4>
                                <div className="mb-3 row">
                                    <div className="col-sm-4 mb-2">
                                        <h6 className="mb-0">Recent Password</h6>
                                    </div>
                                    <div className="col-sm-8 text-secondary">
                                        <input type="text" className="form-control fs-6 bg-transparent" onChange={(event) => setoldpassword(event.target.value)} placeholder='Enter Your Recent Password' />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-4 mb-2">
                                        <h6 className="mb-0">New Password</h6>
                                    </div>
                                    <div className="col-sm-8 text-secondary">
                                        <input type="text" className="form-control fs-6 bg-transparent" onChange={(event) => setnewpassword(event.target.value)} placeholder='Enter New Password' />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-4 mb-2">
                                        <h6 className="mb-0">Confirm Password</h6>
                                    </div>
                                    <div className="col-sm-8 text-secondary">
                                        <input type="text" className="form-control fs-6 bg-transparent" onChange={(event) => setconformpassword(event.target.value)} placeholder='Enter Confirm Password' />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-8 text-secondary">
                                        <button className="btnn text-white p-2" onClick={() => ChangePassword()}>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        <ToastContainer />
    </>
}
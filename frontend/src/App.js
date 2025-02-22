import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";

// Lazy load components
const Home = lazy(() => import("./components/Home/Home.js"));
const Disease = lazy(() => import("./components/Disease/Disease.js"));
const Product = lazy(() => import("./components/Product/Product.js"));
const Viewcart = lazy(() => import("./components/Product/Viewcart.js"));
const Checkout = lazy(() => import("./components/Product/CheckOut.js"));
const ProductView = lazy(() => import("./components/Product/ProductViewMore.js"));
const Yoga = lazy(() => import("./components/Yoga/Yoga.js"));
const GetStart = lazy(() => import("./components/Yoga/yogadescription.js"));
const Homeremedy = lazy(() => import("./components/Homeremedy/Homeremedy.js"));
const ViewMore = lazy(() => import("./components/Homeremedy/HomeremedyDescription.js"));
const AboutUs = lazy(() => import("./components/AboutUs/About.js"));
const UserLogIn = lazy(() => import("./components/User/LogIn.js"));
const UserProfile = lazy(() => import("./components/UserProfile/UserProfile.js"));
const UserForgetPassword = lazy(() => import("./components/User/ForgetPassword.js"));
const Consult = lazy(() => import("./components/Consult/Consult.js"));
const Appointment = lazy(() => import("./components/Appointment/Appointment.js"));
const DoctorLogIn = lazy(() => import("./components/DoctorLogin/LogIn.js"));
const DoctorForgetPassword = lazy(() => import("./components/DoctorLogin/ForgetPassword.js"));
const DoctorConsult = lazy(() => import("./components/DoctorConsult/DoctorConsult.js"));
const DoctorConsultation = lazy(() => import("./components/Doctor/DoctorConsultation/DoctorConsultation.js"));
const DoctorDashboard = lazy(() => import("./components/DoctorModule/Doctor/DoctorDashboard/DoctorDashboard.js"));
const DoctorVarication = lazy(() => import("./components/DoctorModule/Doctor/DoctorVarification/DoctorVarification/DoctorVarification.js"));
const PatientInformation = lazy(() => import("./components/DoctorModule/Doctor/Patients/Patients.js"));
const DoctorAppointment = lazy(() => import("./components/DoctorModule/Doctor/DoctorAppointment/DoctorAppointment.js"));
const ProfileSetting = lazy(() => import("./components/DoctorModule/Doctor/DoctorDashboard/ProfileSetting/ProfileSetting.js"));
const Buynow = lazy(() => import("./components/Product/Buynow.js"));
const Contact = lazy(() => import("./components/Contact/Contact.js"));

function App() {
  return (
    <div className="d-flex justify-content-center">
      <div>
        <Header />
        <Suspense fallback={
          <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ height: "400px" }}>
            <h1 className="spinner-border" style={{ height: "100px", width: "100px", color: "var(--green)" }}></h1>
            <h1>Loading...</h1>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/disease" element={<Disease />} />
            <Route path="/product" element={<Product />} />
            <Route path="/productView" element={<ProductView />} />
            <Route path="/viewcart" element={<Viewcart />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/yoga" element={<Yoga />} />
            <Route path="/getstart" element={<GetStart />} />
            <Route path="/homeremedy" element={<Homeremedy />} />
            <Route path="/ViewMore" element={<ViewMore />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/user" element={<UserLogIn />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/forgetpassword" element={<UserForgetPassword />} />
            <Route path="/Consult" element={<Consult />} />
            <Route path="/Appointment" element={<Appointment />} />
            <Route path="/doctorDashboard" element={<DoctorDashboard />}>
              <Route index element={<DoctorAppointment />} />
              <Route path="doctorconsultation" element={<DoctorConsultation />} />
              <Route path="profilesetting" element={<ProfileSetting />} />
            </Route>
            <Route path="/Buynow" element={<Buynow />} />
            <Route path="/doctorconsult" element={<DoctorConsult />} />
            <Route path="/doctorlogin" element={<DoctorLogIn />} />
            <Route path="/doctorforgetpassword" element={<DoctorForgetPassword />} />
            <Route path="/doctorvarication" element={<DoctorVarication />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}

export default App;

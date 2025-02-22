import { validationResult } from "express-validator";
import Doctor from "../model/doctor.model.js";
import DoctorDetail from "../model/doctordetail.model.js";
import Appointment from "../model/appointment.model.js";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import sequelize from "../db/dbConfig.js";

// sed mail with OTP start =================================================================

import nodemailer from 'nodemailer';

// Function to generate a random OTP
let OTP;
const generateOTP = () => {
    const otpLength = 4; // Length of the OTP
    const digits = '0123456789'; // Possible digits in the OTP
    OTP = '';
    for (let i = 0; i < otpLength; i++) {
        OTP += digits[Math.floor(Math.random() * 10)]; // Randomly select a digit
    }
    return OTP;
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'thegreatayurveda@gmail.com', pass: 'mscy bdjt dttl plbj' }
});

const sendOTP = (receverMail) => {
    const otp = generateOTP(); // Generate OTP
    const mailOptions = {
        from: 'thegreatayurveda@gmail.com',
        to: `${receverMail}`,
        subject: 'Your OTP for The Great Ayurveda',
        text: `Your OTP is: ${otp}` // Include OTP in the email body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent successfully...');
        }
    });
};

// sed mail with OTP end =================================================================

export const SignUp = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Doctor.create({
        doctorName: request.body.doctorName,
        email: request.body.email,
        password: request.body.password,
        contactNumber: request.body.contactNumber,
        registrationNumber: request.body.registrationNumber
    })
        .then((result) => {
            return response.status(200).json({ data: result.dataValues, message: "Doctor created..." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}


export const signIn = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    let email = request.body.email;
    let password = request.body.password;

    let doctor = await Doctor.findOne({ where: { email: email }, raw: true });
    if (doctor) {
        if (Doctor.checkPassword(password, doctor.password)) {
            let payload = { subject: email };
            let token = jwt.sign(payload, 'fdfjfjrwieroerivxcnmvnnvrweiorddfsdfdlkfjlfjljlraj');
            return response.status(200).json({ message: "Sign In Success", doctor, token: token });
        } else {
            return response.status(401).json({ error: "Unauthorized doctor" });
        }
    }
    else
        return response.status(401).json({ error: "Unauthorized doctor" });
}

export const list = (request, response, next) => {
    Doctor.findAll({ raw: true })
        .then((result) => {
            return response.status(200).json({ data: result });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const remove = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Doctor.destroy({
        where: { email: request.body.email }, raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: 'Doctor deleted....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error.....", err })
        })
}

export const update = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Doctor.update(
        {
            doctorName: request.body.doctorName,
            email: request.body.email,
            password: request.body.password,
            contactNumber: request.body.contactNumber,
        }, {
        where: { id: request.body.id },
        raw: true
    }
    )
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'Doctor updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const AddDoctorDetail = (request, response, next) => {
    console.log(request.body)
    let time = "";
    for(let item of request.body.time){
        time+=item;
    }
    DoctorDetail.create({
        qualification: request.body.qualification,
        experience: request.body.experience,
        gender: request.body.gender,
        language: request.body.language,
        time:time,
        clinicAddress: request.body.clinicAddress,
        doctorimage: request.body.doctorImage,
        specialization: request.body.specialization,
        doctorId: request.body.doctorId
    })
        .then((result) => {
            return response.status(200).json({ message: "DoctorDetail Saved....",result });
        })
        .catch((err) => {
            console.log(err)
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const UpdateDoctorDetail = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    DoctorDetail.update(
        {
            qualification: request.body.qualification,
            experience: request.body.experience,
            gender: request.body.gender,
            language: request.body.language,
            clinicAddress: request.body.clinicAddress,
            doctorimage: request.body.doctorimage,
            specialization: request.body.specialization,
            doctorId: request.body.doctorId
        },
        {
            where: { id: request.body.id },
            raw: true
        }
    )
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'DoctorDetail updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const doctorProfile = (request, response, next) => {
    DoctorDetail.findOne({
        where: { doctorId: request.body.id },
        include: [{ model: Doctor, required: true }]
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result });
            return response.status(500).json({ error: "unautherized request", });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}


export const doctorAppointment = (request, response, next) => {
    // const errors = validationResult(request);
    // if (!errors.isEmpty())
    //     return response.status(401).json({ error: errors.array() });

    Appointment.create({
        status: "pending",
        appointmentTime: request.body.appointmentTime,
        appointmentDate: request.body.appointmentDate,
        doctorId: request.body.doctorId,
        name: request.body.name,
        phone: request.body.phone,
        age: request.body.age,
        email: request.body.email,
        gender: request.body.gender,



    })
        .then((result) => {
            return response.status(200).json({ message: "Appointment Saved....", result });
        })
        .catch((err) => {
            console.log(err)
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const appointmentList = (request, response, next) => {

    
    Appointment.findAll({ where: { doctorId: request.body.doctorid }})
        .then((result) => {
            return response.status(200).json({ Data: result });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}



export const appointmentDetailslist = (request, response, next) => {

    Appointment.findAll({ include: [{ model: Doctor, required: true }, { model: User, required: true }] })
        .then((result) => {
            return response.status(200).json({ Data: result });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const appointmentDetailsperticular = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Appointment.findAll({ where: { id: request.body.id }, include: [{ model: Doctor, required: true }, { model: User, required: true }] })
        .then((result) => {
            return response.status(200).json({ Data: result });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const updateAppointmentStatus = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Appointment.update({
        status: request.body.status
    },
        {
            where: { id: request.body.id },
            raw: true
        })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'Status updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error...", err });
        })

}


export const doctorConsult = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log("DoctorConsult");
        return response.status(401).json({ error: errors.array() });
    }

    DoctorDetail.findAll({
        include: [{ model: Doctor }]
    })
        .then((result) => {
            if (!result) {
                return response.status(404).json({ error: "No data found" });
            }
            return response.status(200).json({ message: 'Doctors and details found', result });
        })
        .catch(err => {
            console.error("Error:", err);
            return response.status(500).json({ error: "Internal server error..." });
        });
}


// =================================================================================

export const forgotpassword = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Doctor.findOne({ where: { email: request.body.email } })
        .then((result) => {
            if (result) {
                sendOTP(request.body.email);
                return response.status(200).json({ message: 'doctor exist....', Message: 'Email sent successfully...' });
            }
            else {
                return response.status(401).json({ message: 'unauthorized request....' })
            }
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const verifyOTP = (request, response, next) => {
    let otp = request.body.OTP;
    if (otp == OTP) {
        return response.status(200).json({ message: 'OTP Verification Successfuly....' })
    }
    else {
        return response.status(401).json({ message: 'OTP Verification failed....' })
    }
}

export const setnewpassword = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Doctor.update({
        password: request.body.password,
    }, {
        where: {
            email: request.body.email
        }, raw: true
    })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'password updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}


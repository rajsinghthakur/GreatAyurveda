import { validationResult } from "express-validator";
import Consult from "../model/consult.model.js";

export const addConsult = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() }); // Changed status code and error response key

    const { name, phone, message, doctorId } = request.body.formData;
    console.log(request.body);
    Consult.create({
        name,
        phone,
        message,
        id
    })

        .then(() => {
            return response.status(200).json({ message: "Consult Saved" }); // Removed result parameter since it's not being used
        })
        .catch((err) => {
            console.error("Error:", err); // Log the error for debugging purposes
            return response.status(500).json({ error: "Internal server error" }); // Removed 'err' from the error response
        });



}

export const getConsultData = (request, response, next) => {
    Consult.findAll({ where: { doctorId: request.body.doctorid } })
        .then((result) => {
            return response.status(200).json(result);

        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ err: "Internal Server error", err });
        });
}

export const addDoctorConsultData = (request, response, next) => {
    Consult.create({
        name: request.body.formData.name,
        phone: request.body.formData.phone,
        message: request.body.formData.message,
        doctorId: request.body.formData.doctorId
    })
        .then((result) => {
            return response.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ err: "Internal Server error", err });
        });
}
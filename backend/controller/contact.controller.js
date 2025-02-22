import { validationResult } from "express-validator";
import Contact from "../model/contact.model.js";

export const addContact = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() }); // Changed status code and error response key

    const { name, email, phone, subject, message } = request.body.formData;
    console.log(request.body);
     
    Contact.create({
        name,
        email,
        phone,
        subject,
        message
    })
    .then(() => {
        return response.status(200).json({ message: "Contact Saved" }); // Removed result parameter since it's not being used
    })
    .catch((err) => {
        console.error("Error:", err); // Log the error for debugging purposes
        return response.status(500).json({ error: "Internal server error" }); // Removed 'err' from the error response
    });
}
export default addContact ;


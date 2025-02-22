import express from 'express';
import { SignUp, Viewuserbyid, forgotpassword, list, listbyemail, setnewpassword, signIn, update, updateAddress, updatepassword, verifyOTP } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

router.post("/signUp",
    body("email", "invalid email").isEmail().notEmpty(),
    body("password", "invalid password").notEmpty(),
    body("name", "invalid name").notEmpty(),
    body("contactNumber", "invalid contactNumber").isNumeric().notEmpty(),
    SignUp);

router.post("/signIn",
    body("email", "invalid email").isEmail().notEmpty(),
    body("password", "invalid password").notEmpty(),
    signIn);

router.post("/forgotpassword", body("email", "invalid email").isEmail().notEmpty(), forgotpassword);

router.post("/verifyOTP", verifyOTP);

router.put("/setnewpassword",
    body("email", "invalid email").isEmail().notEmpty(),
    body("password", "invalid password").notEmpty(),
    setnewpassword);

router.put("/updatepassword",
    body("id", "invalid id").notEmpty(),
    body("oldpassword", "invalid password").notEmpty(),
    body("newpassword", "invalid password").notEmpty(),
    updatepassword);

router.put("/updateProfile",
    body("email", "invalid email").isEmail().notEmpty(),
    body("name", "invalid name").notEmpty(),
    body("gender", "invalid gender").notEmpty(),
    body("contactNumber", "invalid contactNumber").isNumeric().notEmpty(),
    update);

router.put("/updateAddress",
    body("state", "invalid state").notEmpty(),
    body("city", "invalid city").notEmpty(),
    body("address", "invalid address").notEmpty(),
    body("pincode", "invalid pincode").isNumeric().notEmpty(),
    updateAddress);

router.get("/viewuserbyemail",
    body("email", "invalid email").isEmail().notEmpty(),
    listbyemail);

router.post("/viewuserbyid", Viewuserbyid);

router.get("/viewUserList", list);

// in feture use

// router.delete("/remove",
//     body("email", "invalid email").isEmail().notEmpty(),
//     remove);

export default router;
import express from "express";
import { addConsult, addDoctorConsultData, getConsultData } from "../controller/consult.controller.js";

const router = express.Router();

router.post("/addconsult", addConsult);
router.post("/getconsultdata", getConsultData);
router.post("/doctorConsultData", addDoctorConsultData);

export default router;
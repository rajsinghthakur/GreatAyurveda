import express from "express";
import { Categorydata, Categorylist, save, saveInBulk, search } from "../controller/category.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/addCategory",
    body("categoryName", "invalid categoryName").notEmpty(),
    body("Causes", "invalid Causes").notEmpty(),
    body("Precaution", "invalid Precaution").notEmpty(),
    body("imageUrl", "invalid imageUrl").notEmpty(),
    save);

router.post("/addinbulk", saveInBulk);

router.get("/list", Categorylist);

router.post("/data", body("categoryName", "invalid categoryName").notEmpty(), Categorydata);

router.post("/search", search);

export default router; 
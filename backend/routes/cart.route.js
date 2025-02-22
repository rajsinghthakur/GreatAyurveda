import express from "express";
import { addToCart, fetchCartItems, removeFromCart,updateQty } from "../controller/cart.controller.js";
import { body } from "express-validator";
import { update } from "../controller/user.controller.js";
const router = express.Router();

router.post("/addToCart",
    body("userId", "invalid userId").notEmpty(),
    body("quantity", "invalid quantity").notEmpty(),
    body("productId", "invalid ProductId").notEmpty(),
    addToCart);

router.get("/fetchCartItems/:userId", fetchCartItems);

router.delete("/removeCartItem/:userId/:productId", removeFromCart);

router.post("/updateQty",updateQty);

export default router;
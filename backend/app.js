import express from 'express';
import bodyParser from 'body-parser';
import AdminRouter from './routes/admin.route.js';
import UserRouter from './routes/user.route.js';
import DoctorRouter from './routes/doctor.route.js';
import CategoryRouter from './routes/category.route.js';
import ProductRouter from './routes/product.route.js';
import CartRouter from './routes/cart.route.js';
import YogaRouter from './routes/yoga.routes.js';
import HomeRemedyRouter from './routes/homeremedy.route.js';
import OrderRouter from './routes/order.route.js';
import paymentRouter from './routes/payment.route.js';
import { API } from './secreatKey/secreatKey.js';
import ContactRouter from "./routes/contact.route.js";
import ConsultRouter from  "./routes/consult.route.js"
import './model/association.js';
import cors from 'cors';

const app = express();
import Razorpay from "razorpay";

export const instance = new Razorpay({
    key_id: API.RAZORPAY_API_KEY,
    key_secret: API.RAZORPAY_APT_SECRET,
  });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/admin', AdminRouter);
app.use('/user', UserRouter);
app.use('/doctor', DoctorRouter);
app.use('/category', CategoryRouter);
app.use('/product', ProductRouter);
app.use('/homeremedy', HomeRemedyRouter);
app.use('/yoga', YogaRouter);
app.use('/cart', CartRouter);
app.use('/order', OrderRouter);
app.use("/payment", paymentRouter);
app.use('/contact',ContactRouter);
app.use("/consult",ConsultRouter);
app.listen(3005, () => { console.log("server started.....") }) 


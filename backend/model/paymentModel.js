import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";
export const PaymentData = sequelize.define('PaymentTable',{
    razorpay_order_id: {
        type: DataTypes.STRING,
        allowNull:false
    },
    razorpay_payment_id: {
        type: DataTypes.STRING,
        allowNull:false
    },
    razorpay_signature: {
        type: DataTypes.STRING,
        allowNull:false
    },
  })

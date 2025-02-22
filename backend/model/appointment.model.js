import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const Appointment = sequelize.define('appointment', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false

    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false

    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appointmentDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appointmentTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    


});


sequelize.sync().then(() => {
    console.log("Appointment table created....");
}).catch(err => {
    console.log("Error in Appointment", err);
})

export default Appointment;
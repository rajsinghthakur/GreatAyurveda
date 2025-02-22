import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";



const Contact = sequelize.define("contact", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING, // Allow variable-length strings
        allowNull: false,
        unique: true
    },
    subject: {
        type: DataTypes.TEXT, // Use TEXT for longer strings
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT, // Use TEXT for longer strings
        allowNull: false
    }
});



sequelize.sync()
    .then(() => {
        console.log("contact table created....")
    })
    .catch((err) => {
        console.log(" something wrong....")
        console.log(err);
    });

export default Contact;

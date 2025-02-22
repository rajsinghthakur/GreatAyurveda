import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";



const Consult = sequelize.define("consult", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    doctorId:{
        type:DataTypes.INTEGER,
   
    },
    
    message: {
        type: DataTypes.TEXT, 
        allowNull: false
    }
    
});



sequelize.sync()
    .then(() => {
        console.log("consult table created....")
    })
    .catch((err) => {
        console.log(" something wrong....")
        console.log(err);
    });

export default Consult;

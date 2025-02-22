import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OrderDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    State: {
        type: DataTypes.STRING,
        allowNull: false
    },
    City: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UserContact: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});


Order.sync().then(() => {
    console.log("Order table created ")
}).catch(err => {
    console.log("Order table error ", err)
});



export default Order;
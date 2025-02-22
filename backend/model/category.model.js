import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const Category = sequelize.define("category", {
    categoryName: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Causes: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    Precaution: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING(1000),
        allowNull: false
    }
});

Category.sync().then(() => {
    console.log("category table created...")
}).catch(err => {
    console.log(err)
})

export default Category; 
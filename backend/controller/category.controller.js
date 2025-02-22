import { validationResult } from "express-validator";
import Category from "../model/category.model.js";
import Product from "../model/product.model.js";
import HomeRemedy from "../model/homeremedy.model.js";
import Yoga from "../model/yoga.model.js";
import { Op } from "sequelize";

export const save = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Category.create({
        categoryName: request.body.categoryName,
        Causes: request.body.Causes,
        Precaution: request.body.Precaution,
        imageUrl: request.body.imageUrl
    })
        .then((result) => {
            return response.status(200).json({ data: result.dataValues, message: "category created..." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const saveInBulk = async (request, response, next) => {
    try {
        let categoryList = request.body;
        for (let category of categoryList) {
            let { categoryName, Causes, Precaution, imageUrl } = category;

            await Category.create({ categoryName, Causes, Precaution, imageUrl });
        }
        return response.status(200).json({ message: "All Category Saved.." });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error", err });
    }
}

export const Categorylist = (request, response, next) => {
    Category.findAll().then(result => {
        return response.status(200).json({ categories: result });
    }).catch(err => {
        return response.status(500).json({ error: "Internal server error", err });
    })
}

export const Categorydata = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Category.findOne({
        where: { categoryName: request.body.categoryName }
        // , include: [{ model: Product, required: true }, { model: HomeRemedy, required: true }, { model: Yoga, required: true }]
    }).then(result => {
        if (result)
            return response.status(200).json({ categories: result });
        return response.status(401).json({ message: "unauthorized request" });
    }).catch(err => {
        return response.status(500).json({ error: "Internal server error", err });
    })
}

// ================================================================

export const search = async (request, response, next) => {
    try {
        const query = request.body.data;
        const keywords = query
            .toLowerCase()
            .split(" ")
            //  the raj
            .filter((word) => word.length > 0);

        // Assuming Category, Yoga, HomeRemedy, and Product are Sequelize models
        const searchResults = await Category.findAll({
            where: {
                categoryName: {
                    [Op.or]: keywords.map((keyword) => ({ [Op.like]: `%${keyword}%` }))
                }
            },
            // include: [Yoga, HomeRemedy, Product] // Include associated models
        });

        return response.status(200).json(searchResults);
    } catch (error) {
        console.error("Error during search:", error);
        return response.status(500).json({ error: "An error occurred during search.", error });
    }
}
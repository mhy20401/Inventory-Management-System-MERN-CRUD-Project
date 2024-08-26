const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const { v4: uuidv4 } = require('uuid');

//Inserting(Creating) Data:
router.post("/insertproduct", async (req, res) => {
    const { ProductName, ProductPrice } = req.body;

    try {
        // Generate a unique barcode for the new product
        const productBarcode = uuidv4();
        
        const pre = await products.findOne({ ProductBarcode: productBarcode })
        console.log(pre);

        if (pre) {
            res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new products({ ProductName, ProductPrice, productBarcode })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/products', async (req, res) => {

    try {
        const getProducts = await products.find({})
        console.log(getProducts);
        res.status(201).json(getProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/products/:id', async (req, res) => {

    try {
        const getProduct = await products.findById(req.params.id);
        console.log(getProduct);
        res.status(201).json(getProduct);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/updateproduct/:id', async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        const updateProducts = await products.findByIdAndUpdate(req.params.id, { ProductName, ProductPrice, ProductBarcode }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deleteproduct/:id', async (req, res) => {

    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
    }
})

// Endpoint to get total revenue:
router.get('/totalrevenue', async (req, res) => {
    try {
        // Aggregate total revenue by summing up all ProductPrice values
        const revenueData = await products.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$ProductPrice" } } }
        ]);
        const totalRevenue = revenueData[0] ? revenueData[0].totalRevenue : 0;
        res.status(200).json({ totalRevenue });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while calculating total revenue." });
    }
});


module.exports = router;
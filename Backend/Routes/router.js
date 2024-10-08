const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const user = require ('../Models/User')
const bcrypt = require('bcrypt')
const createToken = require ('../utils/CreateToken')

//Inserting(Creating) Data:
router.post("/insertproduct", async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })
        console.log(pre);

        if (pre) {
            res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new products({ ProductName, ProductPrice, ProductBarcode })

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
router
.post('/addeduser', async (req,res) => {
  const {username , email , password }= req.body;
    if (!username || !email || !password){
        throw new Error("please fill all the inputs");
    }
    const userExists = await user.findOne({email});

    if (userExists) {res.status(400).send("user already exits")} ;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new user({username , email , password:hashedPassword});
   try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
    });
} catch (error) {
    console.error("Error while saving user:", error);  // Log the actual error message
    res.status(400).json({ message: "Invalid user data", error: error.message });
}
    
})
.post("/login", async (req,res) => {
    const {email , password} =req.body;
        const existingUser = await user.findOne({email});
        if (!existingUser){
            res.status(404);
            throw new Error("user not found")
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid){
            res.status(401);
            throw new Error ("incorrect password");
        }
            createToken(res, existingUser._id);
            res.status(200).json({
                _id:existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin:existingUser.isAdmin,
            })
})
.post("/logout", async(req,res)=> {
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0),
    })
    res.status(200).json({message:"logged out succefuly"})
})



module.exports = router;
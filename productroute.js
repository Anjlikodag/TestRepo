const { Router } = require("express");
const express=require("express");
const router=new express.Router();
const Product=require("./models/product");


router.post("/products", async (req, res) => {
    // const userId = req.params.id;
    // const product = req.body;
    // if(product.userId.toString() !== res.locals.userId){
    //     return res.status(403).json({
    //         success:false,
    //         code:403,
    //         message: "Invalid request, forbidden",
    //         data:null,
    //         error:null,
    //         resource: req.originalUrl

    //     });

   // }
    try {
        const user = new Product(req.body);
        const createuser = await user.save();
        res.status(201).send(createuser);

    } catch (error) {
        res.status(400).send(e);

    }
})

router.get("/products", async (req, res) => {
    try {
        const getuser = await Product.find();
        res.status(201).send(getuser);

    } catch (error) {
        res.status(400).send(error);

    }
})

//indivisual data
router.get("/products/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const productdata = await Product.findById(_id);

        if (!productdata) {
            return res.send(404).send();
        } else {
            res.send(productdata);
        }
        res.send(productdata);
    } catch (error) {
        deletestd
    }
})
//delete student
router.delete("/products/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteprd = await Product.findByIdAndDelete(_id);
        if (!req.params.id) {
            return res.send(400).send();
        }
        res.send(deleteprd);
    } catch (error) {
        res.status(500).send(e);
    }
})

//put product

router.put("/products/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updtprd = await Product.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.send(updtprd);
    } catch (error) {
        res.status(404).send(e);
    }
})

router.patch("/products/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updtprd1 = await Product.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.send(updtprd1);
    } catch (error) {
        res.status(404).send(e);
    }
})

module.exports=router;
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({

  
    userId:{type:mongoose.SchemaTypes.ObjectId,ref:"user"},
    name:{
        type:String,
        required:true
    },
    desciption:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:[{
        type:String,
        required:true
    }],
    isDeleted:{
        type:Boolean,
        required:false
    },
    deletedAt:{
        type:Date,
        required:false
    },

    createdAt :{
        type:Date,
        require:true
    },
    modifiedAt :{
        type:Date,
        require:true
  
    },
});
module.exports = mongoose.model("Product", productSchema);


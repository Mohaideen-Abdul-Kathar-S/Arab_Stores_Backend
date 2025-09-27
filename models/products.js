const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id : String,
    name: String,
    price: Number,
    count: Number,
    image: String,
    category : String,
    desc : String
  })

const produts = mongoose.model("produts",productSchema);

const userSchema = mongoose.Schema({
  _id : String,
  userName : String,
  userPassword: String,
  userCity : String,
  userAddr : String,
  userGender : String,
  userNOH : String,
  userCart : Array,
  userExpense: Array,
})

const users = mongoose.model("users",userSchema);

const OrderDetailsSchema = mongoose.Schema({
    product:[],
    location : {
      City : String,
      Pincode : String,
      address : String,
      lat : Number,
      lng : Number
    },
    mode : String,
    userID : String 
  })

  const OrderDetails = mongoose.model("OrderDetails",OrderDetailsSchema);

  const OrderDeliverySchema = mongoose.Schema({
    product:[],
    location : {
      City : String,
      Pincode : String,
      address : String,
      lat : Number,
      lng : Number
    },
    mode : String,
    userID : String 
  })

  const OrderDelivery = mongoose.model("OrderDelivery",OrderDeliverySchema);

const AdminSchema = mongoose.Schema({
  _id : String,
  AdminPass : String
})

const Admin = mongoose.model("Admin",AdminSchema);



const commentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Request", "Complaint", "Suggestion"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // automatically adds createdAt, updatedAt
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = {Comment,produts,users, OrderDetails, OrderDelivery, Admin};
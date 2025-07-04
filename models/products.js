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
  userCart : Array
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

module.exports = {produts,users, OrderDetails};
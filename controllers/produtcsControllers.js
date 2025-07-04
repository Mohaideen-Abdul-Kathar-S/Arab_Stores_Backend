const {produts,users, OrderDetails} = require('../models/products')

const getProducts = async (req,res)=>{
    try{
        const val = await produts.find();
        res.json(val);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'server error'});
    }
}

const postProduts = async(req,res)=>{
 
    // console.log(data)
    const {_id,name,price,count,image,category,desc} = req.body;
//     _id :"1",
//     name:"hello",
//     price:103,
//     count:10,
//     image: "null",
//     category : "Grocery",
//     desc : "it is a 75g madimix shop"
//   };
    try{
        const produt = new produts({_id,name,price,count,image,category,desc});
        await produt.save();
        res.status(200).json(produt);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'server error'});
    }
}

const getGrocery = async (req,res)=>{
    try{
        const data = await produts.find({category:"grocery"});
        res.status(200).json(data);

    }catch(err){
        res.status(500).json({message:"error in category fetching"});
    }
}
const getGroceryBySearch = async (req, res) => {
  try {
    const { search } = req.params;
    console.log(search)
    const data = await produts.find({ name: { $regex: search, $options: 'i' },category:"grocery" });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot find / not available" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { data, userID } = req.body;
    await users.updateOne({_id:userID},{$pull:{userCart:{_id:data._id}}});
    // Add product ID to user's cart (push to array)
    const result = await users.updateOne(
      { _id: userID },
      { $push: { userCart: data } }
    );

    res.status(200).json({ message: "Item added to cart", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in add to cart" });
  }
};

const getCartDetails = async (req,res)=>{
    try{
        const {userID} = req.params;
        const {userCart} = await users.findById(userID,'userCart');
        // const cartDetails = await produts.find({_id:{$in : userCart}})//userCart = [102,103,508]
        res.status(200).json({"userCart":userCart});
    }catch(err){
        res.status(500).json({"message":"server error"});
    }
}


const removeFromCart = async (req,res)=>{
    try{
        const {id,userID} = req.body;
        console.log(id,userID);
        const result = await users.updateOne({_id:userID},{$pull:{userCart:{_id:id}}});
        res.status(200).json({ message: "Item emoved from cart", result });
    }catch(err){
        res.status(500).json({"message":err});
    }
}
const postOrderDetails = async (req, res) => {
  try {
    const order = new OrderDetails(req.body); // ✅ correct way
    const result = await order.save();        // ✅ await is important
    res.status(200).json(result);
  } catch (err) {
    console.error("Error saving order:", err); // ✅ log the real error
    res.status(500).json({ message: "server error" });
  }
};

const userRegister = async(req,res)=>{
  try{
    const {userName,userEmail,userPassword}=req.body;
    const user = new users({_id:userEmail,userName,userPassword,userCart:[]});
    const result = await user.save();
    res.status(200).json(result);
  }catch(err){
    res.status(500).json(err);
  }
}

const userLogin = async (req,res)=>{
  try{
    const {_id,password}=req.body;
    const result = await users.findOne({ _id, userPassword: password });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: "Invalid ID or Password" });
    }

  }catch(err){
    res.status(500).json(err);
  }
}
module.exports = {getProducts, postProduts, getGrocery, getGroceryBySearch, addToCart, getCartDetails, removeFromCart, postOrderDetails, userRegister,userLogin}
const {Comment, produts,users, OrderDetails, OrderDelivery, Admin} = require('../models/products')

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
 
    const {_id,name,price,count,image,category,desc} = req.body;

    try{
        const result = await produts.findOne({_id});
        if(result){
          const UpdateResult = await produts.updateOne({_id},{$set : {name,price,count,image,category,desc}});
          res.status(200).json({"Message":"Updated"});
        }
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

const getVegetables = async (req,res)=>{
    try{
        const data = await produts.find({category:"vegetables"});
        res.status(200).json(data);

    }catch(err){
        res.status(500).json({message:"error in category fetching"});
    }
}
const getVegetablesBySearch = async (req, res) => {
  try {
    const { search } = req.params;
    console.log(search)
    const data = await produts.find({ name: { $regex: search, $options: 'i' },category:"vegetables" });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot find / not available" });
  }
};

const getCoolDrinks = async (req,res)=>{
    try{
        const data = await produts.find({category:"cooldrinks"});
        res.status(200).json(data);

    }catch(err){
        res.status(500).json({message:"error in category fetching"});
    }
}
const getCoolDrinksBySearch = async (req, res) => {
  try {
    const { search } = req.params;
    console.log(search)
    const data = await produts.find({ name: { $regex: search, $options: 'i' },category:"cooldrinks" });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot find / not available" });
  }
};

const getSnacks = async (req,res)=>{
    try{
        const data = await produts.find({category:"snacks"});
        res.status(200).json(data);

    }catch(err){
        res.status(500).json({message:"error in category fetching"});
    }
}
const getSnacksBySearch = async (req, res) => {
  try {
    const { search } = req.params;
    console.log(search)
    const data = await produts.find({ name: { $regex: search, $options: 'i' },category:"snacks" });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot find / not available" });
  }
};

const getStationaries = async (req,res)=>{
    try{
        const data = await produts.find({category:"stationaries"});
        res.status(200).json(data);

    }catch(err){
        res.status(500).json({message:"error in category fetching"});
    }
}
const getStationariesBySearch = async (req, res) => {
  try {
    const { search } = req.params;
    console.log(search)
    const data = await produts.find({ name: { $regex: search, $options: 'i' },category:"stationaries" });
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
    const data = req.body;
    const order = new OrderDetails(data);
    const result = await order.save();

    // Ensure all product updates are awaited
    const updatePromises = data.product.map(async (val) => {
      const id = val._id;
      const remcount = Number(val.count) - Number(val.quantity);
      console.log(`id ${id} rem ${remcount} count ${val.count} quant ${val.quantity}`);
      await produts.updateOne({ _id: id }, { $set: { count: remcount } });
    });

    await Promise.all(updatePromises); // Wait for all updates to complete

    res.status(200).json(result);
  } catch (err) {
    console.error("Error saving order:", err);
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


const updateUserDetails = async(req,res)=>{
  try{
    console.log("user frofile update");
    const {name,gender,nameofhouse,city,addr,userID} =req.body;
    const result = await users.updateOne( { _id:userID },{$set : {userName:name,userCity:city,userAddr:addr,userGender:gender,userNOH:nameofhouse} });

      res.status(200).json(result);

  }catch(err){
    res.status(500).json(err);
  }
}

const getOrderDetails = async(req,res)=>{
  try{
    const _id = req.params;
    const result = await   OrderDetails.find({userID:_id});
    res.status(200).json(result);

  }catch(err){
res.status(500).json(err);
  }
}


const deleteOrder = async(req,res)=>{
  try{
const {id} = req.params;
const data = await OrderDetails.findById({_id:id});
const some = data.product.map(async (val)=>{
  await produts.updateOne({_id:val._id},{$inc :{count:Number(val.quantity)}})
});
await Promise.all(some);
const result = await OrderDetails.deleteOne({_id:id});
res.status(200).json(result);

  }catch(err){
res.status(500).json(err);
  }
}


const getGroceryByID = async(req,res)=>{
  try{
const {_id} = req.params;
const data = await produts.find({_id:_id});
        res.status(200).json(data);

  }catch(err){
res.status(500).json(err);
  }
}


const Delivery = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch single document (not array)
    const data = await OrderDetails.findById(id); // ✅ use findById

    if (!data) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Create new OrderDelivery with the document
    const val = new OrderDelivery({
      _id: data._id,
      product: data.product,
      location: data.location,
      mode: data.mode,
      userID: data.userID
      // add other fields as needed
    });

    const result = await val.save();

    // Delete the original
    // await OrderDetails.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (err) {
    console.error("Delivery Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

const getOrderHistory = async (req,res)=>{
  try{
    const {userID} = req.params;
    const result = await   OrderDelivery.find({userID});
    res.status(200).json(result);

  }catch(err){
res.status(500).json(err);
  }
}

const getCustomersOrders = async (req,res)=>{
  try{
    const result = await OrderDetails.find();
    res.status(200).json(result);
  }catch(err){
    res.status(500).json(err);
  }
}

const CheckUserID = async (req,res)=>{
  try{
    const {email} = req.body;
    console.log(email);
    const result = await users.findOne({_id:email});
    if(!result){
      res.status(500).json(err);
    }
    res.status(200).json(result);

  }catch(err){
    res.status(500).json(err);
  }
}

const updatePassword = async(req,res)=>{
  try{
    const {_id,userPassword} = req.body;
    const result = await users.updateOne({_id},{$set : {userPassword : userPassword}});
    res.status(200).json(result);

  }catch(err){
    res.status(500).json(err);
  }
}


const UpdatePassword = async (req, res) => {
  try {
    const { _id, userPassword, newPassword } = req.body;
    console.log(_id, userPassword, newPassword);

    const user = await users.findOne({ _id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userPassword !== userPassword) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    const result = await users.updateOne(
      { _id },
      { $set: { userPassword: newPassword } }
    );

    res.status(200).json({ message: "Password updated successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const AdminLogin = async(req,res)=>{
  try{
    const {AdminID,AdminPass} = req.body;

    const result = await Admin.findOne({_id:AdminID,AdminPass: AdminPass});
    res.status(200).json(result);

  }catch(err){
    res.status(500).json({ message: "Server error", error: err });
  }
}

const getProductsIDs = async(req,res)=>{
  try{
   
  
    const result = await produts.find();
    const Ids = result.map(obj=>obj._id);
    res.status(200).json(Ids);

  }catch(err){
    res.status(500).json({ message: "Server error", error: err });
  }
}

const DeleteProduct =async(req,res)=>{
  try{
   
    const {_id} = req.params;
    const result = await produts.deleteOne({_id});

    res.status(200).json(result);

  }catch(err){
    res.status(500).json({ message: "Server error", error: err });
  }
}



const sendComment = async (req, res) => {
  const { type, message, email } = req.body;

  try {
    const newComment = new Comment({ type, message, email });
    await newComment.save();

    console.log("Comment Saved:", newComment);

    res.status(200).json({
      success: true,
      msg: "Message sent to admin",
      data: newComment, // returns saved doc with _id
    });
  } catch (err) {
    console.error("Error saving comment:", err);
    res.status(500).json({ success: false, msg: "Failed to save comment" });
  }
};


const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ success: false, msg: "Failed to fetch comments" });
  }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Failed to delete comment" });
  }
};


const userExpense = async (req, res) => {
  try {
    const { orderId, spendAmount } = req.body;
    console.log("Expense API called for orderId:", orderId);

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Find the order by ID
    const order = await OrderDetails.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const userId = order.userID;
    const products = order.product;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    // Calculate total amount
    let totalAmount = products.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Find the user
    const user = await users.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure userExpense is an array
    if (!Array.isArray(user.userExpense)) {
      user.userExpense = [];
    }

    // ✅ Always push a new expense object (don’t overwrite)
    user.userExpense.push({
      orderId,
      totalAmount,
      spendAmount,
      date: new Date(),
    });

    await user.save();
    await OrderDetails.deleteOne({ _id: orderId });

    res.status(200).json({
      message: "Expense added successfully",
      userId,
      orderId,
      totalAmount,
      userExpense: user.userExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Get Expenses API called for userId:", userId);
    // Find user by ID
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return expenses array
    res.status(200).json({
      message: "User expenses fetched successfully",
      userExpense: user.userExpense || [],
    });
  } catch (error) {
    console.error("Error fetching user expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
}




module.exports = {getExpenses, userExpense, getComments, deleteComment, sendComment, getStationariesBySearch, getStationaries, getSnacksBySearch, getSnacks, getCoolDrinksBySearch, getCoolDrinks,getVegetablesBySearch, getVegetables, DeleteProduct,getProductsIDs,AdminLogin,UpdatePassword,updatePassword, CheckUserID, getCustomersOrders, getOrderHistory, Delivery,getGroceryByID,deleteOrder, updateUserDetails, getProducts, postProduts, getGrocery, getGroceryBySearch, addToCart, getCartDetails, removeFromCart, postOrderDetails, userRegister,userLogin,getOrderDetails}
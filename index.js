const express = require('express');
const cors = require('cors');
const connectionDB = require('./config/db');
const  {DeleteProduct,getProductsIDs,AdminLogin,UpdatePassword,updatePassword, CheckUserID, getCustomersOrders,getOrderHistory,Delivery,getGroceryByID,deleteOrder, getProducts, postProduts, getGrocery, getGroceryBySearch, addToCart, getCartDetails, removeFromCart, postOrderDetails, userRegister,userLogin, updateUserDetails,getOrderDetails} = require('./controllers/produtcsControllers')
const app = express();
const sendOTP = require('./controllers/sendOTP');
connectionDB();
app.use(cors());
app.use(express.json())

app.get('/getAllProducts',getProducts);
app.post('/postdata',postProduts);
app.get('/getGrocery', getGrocery);
app.get('/getGroceryByID/:_id', getGroceryByID);
app.get('/getGroceryBySearch/:search',getGroceryBySearch)
app.put('/addToCart',addToCart);
app.get('/getCartDetails/:userID',getCartDetails);
app.delete('/removeFromCart',removeFromCart);
app.post('/postOrderDetails',postOrderDetails);
app.post('/userRegister',userRegister);
app.post('/userLogin',userLogin);
app.put('/updateUserDetails',updateUserDetails);
app.get('/getOrderDetails/:_id',getOrderDetails);
app.delete('/deleteOrder/:id',deleteOrder);
app.post('/send-otp', sendOTP);
app.post('/Delivery/:id',Delivery);
app.get('/getOrderHistory/:userID',getOrderHistory);
app.get('/getCustomersOrders',getCustomersOrders);
app.post('/CheckUserID',CheckUserID);
app.put('/updatePassword',updatePassword);
app.post('/UpdatePassword',UpdatePassword);
app.post('/AdminLogin',AdminLogin);
app.get('/getProductsIDs',getProductsIDs);
app.delete('/DeleteProduct/:_id',DeleteProduct);
app.listen(4000,()=>console.log("server running on port 4000"));

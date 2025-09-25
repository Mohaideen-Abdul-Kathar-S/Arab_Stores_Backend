const express = require('express');
const cors = require('cors');
const connectionDB = require('./config/db');
const  { getComments, deleteComment, sendComment,getStationariesBySearch, getStationaries, getSnacksBySearch, getSnacks, getCoolDrinksBySearch, getCoolDrinks,getVegetablesBySearch, getVegetables, DeleteProduct,getProductsIDs,AdminLogin,UpdatePassword,updatePassword, CheckUserID, getCustomersOrders,getOrderHistory,Delivery,getGroceryByID,deleteOrder, getProducts, postProduts, getGrocery, getGroceryBySearch, addToCart, getCartDetails, removeFromCart, postOrderDetails, userRegister,userLogin, updateUserDetails,getOrderDetails} = require('./controllers/produtcsControllers')
const app = express();
const { sendOTP} = require('./controllers/sendOTP');
connectionDB();
app.use(cors());
app.use(express.json())

app.get('/getAllProducts',getProducts);
app.post('/postdata',postProduts);
app.get('/getGrocery', getGrocery);
app.get('/getGroceryBySearch/:search',getGroceryBySearch)
app.get('/getVegetables', getVegetables);
app.get('/getVegetablesBySearch/:search',getVegetablesBySearch)
app.get('/getCoolDrinks', getCoolDrinks);
app.get('/getCoolDrinksBySearch/:search',getCoolDrinksBySearch)
app.get('/getSnacks', getSnacks);
app.get('/getSnacksBySearch/:search',getSnacksBySearch)
app.get('/getStationaries', getStationaries);
app.get('/getStationariesBySearch/:search',getStationariesBySearch)

app.get('/getGroceryByID/:_id', getGroceryByID);
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
app.post('/sendComment',sendComment);
app.get("/getComments", getComments);
app.delete("/deleteComment/:id", deleteComment);



app.listen(4000,()=>console.log("server running on port 4000")); 

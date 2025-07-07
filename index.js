const express = require('express');
const cors = require('cors');
const connectionDB = require('./config/db');
const  {deleteOrder, getProducts, postProduts, getGrocery, getGroceryBySearch, addToCart, getCartDetails, removeFromCart, postOrderDetails, userRegister,userLogin, updateUserDetails,getOrderDetails} = require('./controllers/produtcsControllers')
const app = express();
connectionDB();
app.use(cors());
app.use(express.json())

app.get('/getAllProducts',getProducts);
app.post('/postdata',postProduts);
app.get('/getGrocery', getGrocery);
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
app.listen(4000,()=>console.log("server running on port 4000"));

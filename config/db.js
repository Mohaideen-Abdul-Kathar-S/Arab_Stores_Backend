
const mongoose = require('mongoose');
const mongodbURL = 'mongodb://localhost:27017/arabstore';
const connectionDB = async ()=>{
try{
    await mongoose.connect(mongodbURL);
    console.log("mongoDB connected");
}catch(err){
    console.log(err);
    process.exit(1);
}
}

module.exports= connectionDB;

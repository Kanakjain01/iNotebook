const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017";

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(()=>{
    console.log("databse succesfullyy connected")
  })
};
module.exports = connectToMongo;
// mongoose.connect jo h wo ek promise krta h ki database connect hoga agr connect hogya toh then k andar chla jaega connect hua toh then m vrna catch m catch m daala nhi kyu ki need nhi connect ho hi jaerga

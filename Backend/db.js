const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("databse succesfullyy connected");
  });
};
module.exports = connectToMongo;
// y jo function bnaya h iss function ko yaha se export kra h main file m iss funciton import krke call krdu toh le

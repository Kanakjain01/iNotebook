const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/inotebook";
const mongoURI = "mongodb+srv://inotebook:kanakjainkjb@inotebook.du0fzmh.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("databse succesfullyy connected");
  });
};
module.exports = connectToMongo;


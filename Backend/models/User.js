const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
 
});
const User = mongoose.model('user', UserSchema)

module.exports = User
// itna smj aaya haaa ohk cool toh ek registration form or schema bnana hota h jisse fir hum bhar sakhe ab schema bn gya ab dekho bharna kaise h 
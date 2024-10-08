const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(

    {
        username: {
            type: String,
            required:true,
        },
        email: {
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        isAdmin: {
            type:Boolean,
            required:true,
            default:false,
        },

    },
    {timestamps:true}
)

const User = mongoose.model('User',UserSchema)
module.exports = User;

import mongoose from "mongoose";
const Adminloginschema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})
const Adminlogin = mongoose.model('Adminlogin' , Adminloginschema, 'adminlogin')
export default Adminlogin;
//schema
//create a model
import mongoose from "mongoose";
// import Schema  from "mongoose".Schema;
// import ObjectId from Schema.ObjectId;

const UserSchema = mongoose.Schema({
  // id: ObjectId,
  fullName: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("User", UserSchema);

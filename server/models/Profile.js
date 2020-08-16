const mongoose = require("mongoose");
const { array } = require("joi");

const ProfileSchema = new mongoose.Schema({
  projects: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      avatars: [],
    },
  ],
});

// experience:[
//   {
//     title:{
//       type:String,
//       required:true
//     },
//     company:{
//       type:String,
//       required:true
//     },
//     location:{
//       type:String
//     },
//     from:{
//       type:Date,
//       required:true
//     },
//     to:{
//       type:Date
//     },
//     current:{
//       type:Boolean,
//       default:false
//     },
//     description:{
//       type:String
//     }
//   }
// ],

module.exports = mongoose.model("Profile", ProfileSchema);

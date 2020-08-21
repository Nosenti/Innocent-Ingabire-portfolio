import mongoose from "mongoose";

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

module.exports = mongoose.model("Profile", ProfileSchema);

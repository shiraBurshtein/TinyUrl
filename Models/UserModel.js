import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  links: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Link"
  }]
});

const User =mongoose.model("users", UserSchema);
export default User;

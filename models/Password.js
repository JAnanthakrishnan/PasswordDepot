const mongoose = require("mongoose");
const PasswordSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  siteUrl: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  team: {
    type: String,
    default: "personal",
  },
  date: {
    type: String,
    default: Date.now,
  },
});
module.exports = mongoose.model("password", PasswordSchema);

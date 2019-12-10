const mongoose = require("mongoose");
const taskShema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    complete: { type: Boolean, default: false },
    owner: {
      type: mongoose.Schema.Types.ObjectID,
      require: true,
      ref: "User"
    }
  },
  { timestamp: true }
);
const Task = mongoose.model("Task", taskShema);

module.exports = Task;

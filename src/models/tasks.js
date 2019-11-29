const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("task", {
  description: { type: String, require: true, trim: true, default: false },
  complete: { type: String, require: true, default: false }
});

module.exports = Task;

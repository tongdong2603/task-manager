const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/mogoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const multer = require("multer");
const upload = multer({ dest: "image" });

app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server is up on port " + port);
});

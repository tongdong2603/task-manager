const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/mogoose");
const User = require("./models/users");
const Tasks = require("./models/tasks");

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }

  // user
  //   .save()
  //   .then(() => {
  //     res.send(user);
  //   })
  //   .catch(e => {
  //     res.status(400).send(e);
  //   });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
  // User.find({})
  //   .then(users => {
  //     res.send(users);
  //   })
  //   .catch(e => {
  //     throw new Error(e);
  //   });
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
  // User.findById(_id)
  //   .then(user => {
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     console.log("user: ", user);
  //     res.send(user);
  //   })
  //   .catch(e => {
  //     res.status(500).send();
  //   });
});

app.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true , runValidators : true})
    
  }catch (e) {
    
  }
})

app.post("/tasks", async (req, res) => {
  const task = new Tasks(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
  // task
  //   .save()
  //   .then(() => {
  //     res.send(task);
  //   })
  //   .catch(e => {
  //     res.status(400).send(e);
  //   });
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(201).send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
  // Tasks.find({})
  //   .then(tasks => {
  //     res.send(tasks);
  //   })
  //   .catch(e => {
  //     res.status(500).send();
  //   });
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Tasks.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
  } catch (e) {
    res.status(500).send(e);
  }
  // Tasks.findById(_id)
  //   .then(task => {
  //     if (!task) {
  //       return res.status(404).send();
  //     }
  //     res.status(201).send(task);
  //   })
  //   .catch(e => {
  //     res.status(500).send(e);
  //   });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});

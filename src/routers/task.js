const Tasks = require("../models/tasks");
const express = require("express");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
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

router.get("/tasks", async (req, res) => {
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

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Tasks.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
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

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "complete"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    res.status(400).send("invalid updates");
  }
  try {
    const task = await Tasks.findById(req.params.id);
    updates.forEach(update => {
      task[update] = req.body[update];
    });
    await task.save();

    if (!task) {
      return res.status(400).send("found to find a task");
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;

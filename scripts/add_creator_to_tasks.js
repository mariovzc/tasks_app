/* eslint-disable no-console */
import db from "../db.js";
import Task from "../models/task.js"

async function init() {
  await db();
  const tasks = await Task.find();

  tasks.map(async (task) => {
    if (!task.creator){
      // Task creator is the same as assigned
      console.warn("ADD: task creator");
      const user = task.assigned.user;
      task.creator = user
      await task.save()
    }
  })

  console.log("process finished");
  process.exit();
}


init()


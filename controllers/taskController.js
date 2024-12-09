import { Task } from "../models/taskModel.js";

// Function to retrieve all tasks from the database
export const getAllTasks = async (req, res) => { // Note: swapped `res` and `req` order
  try {
    const numOfTasks = await Task.find();
    if (numOfTasks.length === 0) {
      return res.status(404).send({ error: "No tasks in database yet." });
    }

    const validQueries = ["name", "dueDate", "completed", "priority"];
    let filter = {};

    // Check for invalid query parameters
    const queryKeys = Object.keys(req.query);
    const invalidQueries = queryKeys.filter(
      (key) => !validQueries.includes(key)
    );
    if (invalidQueries.length > 0) {
      return res.status(400).send({
        message: "Invalid query parameter(s) used.",
        invalidQueries: invalidQueries,
        validQueries: validQueries,
      });
    }

    // Query cases
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: "i" }; // Case-insensitive regex
    }

    if (req.query.dueDate) { // Format is YYYY-MM-DD
      const date = new Date(req.query.dueDate);
      if (!isNaN(date)) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        filter.dueDate = { $gte: startOfDay, $lte: endOfDay }; // Match entire day
      } else {
        return res.status(400).send({ error: "Invalid date format for dueDate." });
      }
    }

    if (req.query.completed) {
      // Ensure boolean conversion for "true" and "false" strings
      if (req.query.completed.toLowerCase() === "true") {
        filter.completionStatus = true;
      } else if (req.query.completed.toLowerCase() === "false") {
        filter.completionStatus = false;
      } else {
        return res.status(400).send({ error: "Invalid value for 'completed'. Use 'true' or 'false'." });
      }
    }

    if (req.query.priority) {
      filter.priority = { $regex: req.query.priority, $options: "i" }; // Case-insensitive regex
    }

    const tasks = await Task.find(filter);
    if (tasks.length === 0) {
      return res.status(404).send({
        message: "No tasks found for given query.",
        query: req.query,
      });
    }

    res.status(200).send(tasks);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).send({ error: "Error retrieving tasks." });
  }
};


// Function to get a task by ID
export const getTasksById = async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (!task) {
      return res.status(404).send({ error: "Task not found." });
    }
    res.status(200).send(task);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error retrieving task." });
  }
};

// Function to post a new task to databse
export const postNewTask = async (req, res) => {
  try {
    const lastTask = await Task.findOne().sort({ id: -1}).limit(1);
    const newId = lastTask ? lastTask.id + 1 : 1;
    const newTask = new Task({ ...req.body, id: newId });
    await newTask.save();
    res.status(201).send({ 
      message: "Task Added Successfully.",
      new_task: newTask
     });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error adding new task." });
  }
}

export const updateTask = async (req, res) => {
  try {
    const updatedTaskInfo = req.body;
    const newTaskInfo = await Task.findOneAndUpdate(
      { id: req.params.id },
      updatedTaskInfo,
      { new: true },
    );

    if(!newTaskInfo) {
      return res.status(404).send({ error: "Update cancelled as task ID not found." });
    }
    res.status(200).send({
      message: "Task updated successfully.",
      new_details: newTaskInfo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error updating task." });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ id: req.params.id });
    if(!deletedTask) {
      return res.status(404).send({ error: "Deletion cancelled as task ID not found." });
    }
    res.status(204).send({ message: "Task deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error deleting task." });
  }
}
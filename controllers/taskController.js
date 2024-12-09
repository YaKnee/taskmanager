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
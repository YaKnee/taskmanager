import express from "express";
import {
  deleteTask,
  getAllTasks,
  getTasksById,
  postNewTask,
  updateTask,
} from "../controllers/taskController.js";
import { authenticate } from "../middlewares/authenticateUser.js";
import { validateTask } from "../middlewares/validateTask.js";

export const taskRouter = express.Router();

taskRouter.get("/", authenticate(["admin", "regular"]), getAllTasks);
taskRouter.get("/:id", authenticate(["admin", "regular"]), getTasksById);
// Post/Put/Delete require admin privilege
taskRouter.post("/", authenticate(["admin"]), validateTask, postNewTask); // Validate before create
taskRouter.put("/:id", authenticate(["admin"]), validateTask, updateTask); // Validate before update
taskRouter.delete("/:id", authenticate(["admin"]), deleteTask);

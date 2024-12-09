import express from "express";
import {
  deleteTask,
  getAllTasks,
  getTasksById,
  postNewTask,
  updateTask,
} from "../controllers/taskController.js";
import { validateTask } from "../middlewares/validateTask.js";

export const taskRouter = express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTasksById);
taskRouter.post("/", validateTask, postNewTask);
taskRouter.put("/:id", validateTask, updateTask);
taskRouter.delete("/:id", deleteTask);

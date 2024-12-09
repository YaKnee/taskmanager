import express from "express";
import { getAllTasks, getTasksById } from "../controllers/taskController.js";

export const taskRouter = express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTasksById);
// taskRouter.post("/", postNewTask);
// taskRouter.put("/:id", updateTask);
// taskRouter.delete("/:id", deleteTask);
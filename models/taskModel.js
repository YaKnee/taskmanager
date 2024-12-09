import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    dueDate: { type: Date, required: true, min: new Date()},
    completed: { type: Boolean, required: true, default: false },
    priority: { type: String, required: true, enum: ["Low", "Medium", "High"], default: "Medium" }
})

export const Task = mongoose.model("Task", taskSchema, "tasks");
import mongoose from "mongoose";
import dotenv from "dotenv";

import { connectToDatabase } from "../config/db.js";
import { Task } from "../models/taskModel.js"; // Import your Mongoose model

dotenv.config();

connectToDatabase();

// Sample tasks to populate the database
const tasks = [
    { id: 1, name: "Ex6 backend", dueDate: new Date("2024-12-19"), priority: "Medium" },
    { id: 2, name: "PowerPoint for embedded", dueDate: new Date("2024-12-13"), priority: "High" },
    { id: 3, name: "Voice activated auto-move physical chess board" },
];

const resetDatabase = async () => {
    try {
        await Task.deleteMany({}); // Clear the database before populating
        for (const task of tasks) {
            const newTask = new Task(task); // Create a new Task document
            await newTask.save(); // Save it to the database
            console.log(`Added task: ${task.name}`);
        }
        console.log("Database populated successfully!");
        mongoose.connection.close(); // Close the connection when done
    } catch (err) {
        console.error("Error populating database:", err.message);
    }
};

resetDatabase();

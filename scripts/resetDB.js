// Library imports
import mongoose from "mongoose";
import dotenv from "dotenv";

// Custom functions, models, etc. imports
import { connectToDatabase } from "../config/db.js";
import { Task } from "../models/taskModel.js";

dotenv.config();

await connectToDatabase();

const tasks = [
    { name: "Ex6 backend", dueDate: new Date("2024-12-19"), priority: "Medium" },
    { name: "PowerPoint for embedded", dueDate: new Date("2024-12-13"), priority: "High" },
    { name: "Voice activated auto-move physical chess board" }
];

const resetDatabase = async () => {
    try {
        console.log("\nClearing database...\n");
        await Task.deleteMany({}); // Clear the database before populating
        console.log("Database cleared!\n");
        console.log("Populating database...\n");
        for (const task of tasks) {
            // Get the last task to determine the next available ID
            const lastTask = await Task.findOne().sort({ id: -1 }).limit(1);
            const newId = lastTask ? lastTask.id + 1 : 1;

            // Create a new task with the auto-generated ID
            const newTask = new Task({ ...task, id: newId });
            await newTask.save(); // Save it to the database
            console.log(`Added task: ${task.name}`);
        }

        console.log("\nDatabase populated successfully!");
        mongoose.connection.close(); // Close the connection when done
    } catch (err) {
        console.error("Error populating database:", err.message);
    }
};

resetDatabase();

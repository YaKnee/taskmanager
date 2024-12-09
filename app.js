import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { connectToDatabase } from "./config/db.js";
import { taskRouter } from "./routes/tasks.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to the Task Management Database."));
app.use("/tasks", taskRouter);
//app.use("/auth", authRouter);

// Catch-all route to handle undefined routes and return 404
app.all("*", (req, res) => {
    res.status(404).send("Route not found.");
});

const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    });
};

startServer();
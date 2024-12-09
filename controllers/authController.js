import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

export const login = async ( req, res ) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ error: "Invalid username or password." });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ error: "Invalid username or password." });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );
        res.send({ token });
    } catch (err) {
        res.status(500).send({ error: "Internal server error." })
    }
};

export const register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).send({error: "Username already exists."})
        }
        // Hash password before saving to database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        return res.status(201).send({ message: `User "${username}" registered successfully.` });
    } catch (err) {
        return res.status(500).send({ error: "Internal server error." });
    }

};
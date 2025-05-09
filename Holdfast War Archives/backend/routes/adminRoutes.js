// Albert Mendez IV
// adminRoutes.js
// Holdfast War Archives
// Sets the admin routes for the admin functionality

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";

const router = express.Router();
const SECRET_KEY = "your_secret_key";

// Admin Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    // Log the incoming request data
    console.log('Login attempt:');
    console.log('Username received:', username);
    console.log('Password received:', password);

    try {
        // Log the database query
        const admin = await Admin.findOne({ username });
        console.log('Database lookup result:', admin ? 'User found' : 'User not found');
        
        if (admin) {
            console.log('Stored hashed password:', admin.password);
        }

        if (!admin) {
            console.log('Authentication failed: User not found');
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Log the password comparison
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log('Password comparison result:', isMatch ? 'Match' : 'No match');

        if (!isMatch) {
            console.log('Authentication failed: Password mismatch');
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: "1h" });
        console.log('Authentication successful, token generated');

        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Test password generation
const plainTextPassword = "reAdminPassword04!";
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

console.log('\nTest password information:');
console.log('Plain text password:', plainTextPassword);
console.log('Hashed password:', hashedPassword);

export default router;
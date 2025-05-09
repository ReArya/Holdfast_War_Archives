// Albert Mendez IV
// adminModel.js
// Holdfast War Archives
// Admin Model Schema for the admin functionality

import mongoose from "mongoose";
import bcrypt from "bcrypt";

// sets the schema for the admin login
const adminSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
collection: 'Admin'
}
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export const Admin = mongoose.model("Admin", adminSchema);
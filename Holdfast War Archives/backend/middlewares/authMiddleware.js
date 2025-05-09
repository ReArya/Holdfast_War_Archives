// Albert Mendez IV
// authMiddleware.js
// Holdfast War Archives
// Sets the jsonify web token so that users will have to enter their admin credentials to view the admin page

import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Stored in the .env variable

// authenticates the token to see if token has been given
export const authenticateAdmin = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(403).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
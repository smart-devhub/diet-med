import { Users } from './modal/user.js';

import jwt from 'jsonwebtoken'
// Import your User model

export const authenticateToken = async (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
   

    if (!token) {
        return res.status(401).json({ error: " Token not provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user = await Users.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        // Attach the user object to the request for further processing if needed
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};



import jwt from "jsonwebtoken";

export const authenticate = (roles = []) => {
    return ( req, res, next ) => {
        const authHeader = req.headers?.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ error: "Authorization token required." });
        }
    
        const token = authHeader.split(" ")[1];
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).send({ error: "Forbidden. Insufficient permissions." });
            }
            next();
        } catch (err) {
            res.status(401).send({ error: "Invalid or expired token." });
        }
    }
};
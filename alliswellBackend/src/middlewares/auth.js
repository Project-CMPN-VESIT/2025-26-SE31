import { ApiError } from "../errorHandler.js";
import jwt from 'jsonwebtoken';

export const verifyAccesstoken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = req.cookies?.admin_accesstoken || req.cookies?.accesstoken || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
        return next(new ApiError(401, "Authentication token not found!"));
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new ApiError(403, 'Invalid or expired token'));
        }

        req.user = { _id: decoded.id, role: decoded.role, name: decoded.name }; 
        next();
    });
};

export const verifyUserToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = req.cookies?.accesstoken || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
        return next(new ApiError(401, "User token not found!"));
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err || decoded.role !== 'user') {
            return next(new ApiError(403, 'Forbidden: User access required'));
        }

        req.user = { _id: decoded.id, role: decoded.role, name: decoded.name }; 
        next();
    });
};

export const verifyAdminAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = req.cookies?.admin_accesstoken || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
        return next(new ApiError(401, 'Admin token not found!'));
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err || decoded.role !== 'admin') {
            return next(new ApiError(403, 'Forbidden: Admin access required'));
        }

        req.user = { _id: decoded.id, role: decoded.role, name: decoded.name };   
        next();
    });
};
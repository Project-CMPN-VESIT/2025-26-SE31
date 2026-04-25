import { ApiError, asyncHandler } from "../errorHandler.js";
import user from "../models/user.js";

export const adminAuth = asyncHandler(async (req, res, next) => {
    // req.user is set by verifyAccesstoken as { _id, role, name }
    const userId = req.user?._id || req.user;

    if (!userId) {
        throw new ApiError(401, 'Unauthorized request: No user ID found!');
    }

    const existUser = await user.findById(userId);

    if (!existUser) {
        throw new ApiError(404, 'Account not found!');
    }

    if (existUser.role !== 'admin') {
        throw new ApiError(403, 'Access denied: Administrators only!');
    }
    
    req.fullUser = existUser;
    next();
});
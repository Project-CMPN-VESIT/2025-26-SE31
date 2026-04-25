import crypto from 'crypto';
import User from '../models/user.js';
import { sendEmail } from '../utils/sendEmail.js';
import { asyncHandler } from '../errorHandler.js';
import { ApiError } from "../errorHandler.js"
import { generateAccessToken, generateRefreshToken, hashToken } from "../utils/tokens.js";
import { redis } from "../config/redis.js";

export const signup = asyncHandler(async (req, res) => {
    const { email, name, password, role } = req.body;
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'user'
    });

    const rawToken = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto
        .createHash('sha256')
        .update(rawToken)
        .digest('hex');

    // Save hashed token in DB
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Verification link should point to frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const emailLink = `${frontendUrl}/verify-email?token=${rawToken}`;

    console.log("Verification Link:", emailLink);
    
    try {
        await sendEmail(
            email,
            "Verify your email",
            `Click here to verify: ${emailLink}`
        );
    } catch (emailError) {
        console.error("Email verification send failed:", emailError.message);
        // We continue because the user record is already created
    }

    res.status(201).json({
        success: true,
        message: "Signup successful. Please check your email to verify your account."
    });
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;

    // hash incoming token
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    res.json({ message: "Email verified successfully " });

});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    // Validate user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) throw new ApiError(404, "User not found");

    const isMatch = await user.verifyPassword(password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    // Generate tokens
    const userOption={
        id:user.id,
        role:user.role,
        name:user.name
    }
    const accessToken = generateAccessToken(userOption);
    const refreshToken = generateRefreshToken();

    // Hash refresh token
    const hashedToken = hashToken(refreshToken);

    // Store in Redis (optional/resilient)
    try {
        await redis.set(
            `refresh:${hashedToken}`,
            user.id,
            "EX",
            7 * 24 * 60 * 60 // 7 days
        );
    } catch (redisError) {
        console.error("Redis storage failed during login:", redisError.message);
        // We continue anyway, as the access token will still work for the current session
    }

    // Send cookies with role-based naming to allow simultaneous admin/user sessions
    const prefix = userOption.role === 'admin' ? 'admin_' : '';
    
    res.cookie(`${prefix}accesstoken`, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    res.cookie(`${prefix}refreshtoken`, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: userOption.role === 'admin' ? '/auth/refresh-admin' : '/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
        success: true,
        token:accessToken,
        role:userOption.role,
        message: "Login successful",
    });
});


export const verifyUserRefreshToken = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshtoken;

    if (!token) {
        throw new ApiError(401, "Token not found");
    }

    const hashed = hashToken(token);
    const userId = await redis.get(`refresh:${hashed}`);

    if (!userId) {
        throw new ApiError(401, "Session expired");
    }

    // rotation (best effort)
    try {
        await redis.del(`refresh:${hashed}`);
    } catch (err) {}

    const existUser = await User.findById(userId);
    if (!existUser) {
        return res.status(400).json({ msg: 'user account not found!' });
    }

    const userOption = { id: userId, role: existUser.role, name: existUser.name };

    const accessToken = generateAccessToken(userOption);
    const refreshToken = generateRefreshToken();
    const newHashed = hashToken(refreshToken);

    try {
        await redis.set(`refresh:${newHashed}`, userId, "EX", 7 * 24 * 60 * 60);
    } catch (err) {}

    res.cookie("accesstoken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000,
    });

    res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: '/auth/refresh',
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, token: accessToken, message: "Token refreshed" });
});

export const verifyAdminRefreshToken = asyncHandler(async (req, res) => {
    const token = req.cookies.admin_refreshtoken;

    if (!token) {
        throw new ApiError(401, "Admin token not found");
    }

    const hashed = hashToken(token);
    const userId = await redis.get(`refresh:${hashed}`);

    if (!userId) {
        throw new ApiError(401, "Admin session expired");
    }

    try {
        await redis.del(`refresh:${hashed}`);
    } catch (err) {}

    const existUser = await User.findById(userId);
    if (!existUser || existUser.role !== 'admin') {
        return res.status(403).json({ msg: 'Unauthorized: Admin access required' });
    }

    const userOption = { id: userId, role: 'admin', name: existUser.name };

    const accessToken = generateAccessToken(userOption);
    const refreshToken = generateRefreshToken();
    const newHashed = hashToken(refreshToken);

    try {
        await redis.set(`refresh:${newHashed}`, userId, "EX", 7 * 24 * 60 * 60);
    } catch (err) {}

    res.cookie("admin_accesstoken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000,
    });

    res.cookie("admin_refreshtoken", refreshToken, {
        httpOnly: true,
        path: '/auth/refresh-admin',
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, token: accessToken, message: "Admin token refreshed" });
});

export const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password"); //not taking password

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json({
        success: true,
        user
    });
});

export const logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshtoken;
    const adminRefreshToken = req.cookies.admin_refreshtoken;

    if (refreshToken) {
        const hashedToken = hashToken(refreshToken);
        await redis.del(`refresh:${hashedToken}`);
    }
    if (adminRefreshToken) {
        const hashedToken = hashToken(adminRefreshToken);
        await redis.del(`refresh:${hashedToken}`);
    }

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    };

    // Clear both sets of cookies just to be safe
    res.clearCookie("accesstoken", cookieOptions);
    res.clearCookie("refreshtoken", { ...cookieOptions, path: '/auth/refresh' });
    res.clearCookie("admin_accesstoken", cookieOptions);
    res.clearCookie("admin_refreshtoken", { ...cookieOptions, path: '/auth/refresh-admin' });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});
import express from 'express'
import { getMe, login, logout, signup, verifyEmail, verifyUserRefreshToken, verifyAdminRefreshToken } from '../controllers/user.controller.js'
import { verifyUserToken, verifyAdminAccessToken } from '../middlewares/auth.js'
export const userRouter = express.Router()


userRouter.route('/signup').post(signup)
userRouter.route('/login').post(login)
userRouter.route('/user-me').get(verifyUserToken, getMe)
userRouter.route('/admin-me').get(verifyAdminAccessToken, getMe)
userRouter.route('/me').get(verifyUserToken, getMe)
userRouter.route('/logout').post(logout)
userRouter.route('/logout-admin').post(logout)
userRouter.route('/refresh').post(verifyUserRefreshToken)
userRouter.route('/refresh-admin').post(verifyAdminRefreshToken)
userRouter.route('/verify-email').get(verifyEmail)

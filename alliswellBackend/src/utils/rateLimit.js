import { rateLimit } from 'express-rate-limit'

//In 15 min only 100 request 
export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100,
})
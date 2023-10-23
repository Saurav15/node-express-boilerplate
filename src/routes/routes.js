import express from 'express';
const router = express.Router();

// Schema
import { validateSchema } from '../utils/validateSchema.js';
import { signUpSchema } from '../schema/signUp.schema.js';
import { loginSchema } from '../schema/login.schema.js';
import { authGuardMiddleware } from '../middleware/guard/auth.auard.middleware.js';

// Controller
import healthCheck from '../controller/healthCheck.controller.js';
import { signup } from '../controller/auth/signup.controller.js';
import { login } from '../controller/auth/login.controller.js';
import { refreshToken } from '../controller/auth/refreshToken.controller.js';

// Health Check Route
router.get('/health-check', healthCheck);

// Register Route
router.post('/signup', validateSchema(signUpSchema), signup);

// Login Route
router.post('/login', validateSchema(loginSchema), login);

// Refresh Route
router.get('/refresh-token', refreshToken)

// Some private route
router.get('/private', authGuardMiddleware(), (req,res) => {
    res.send("Protected Data");
});

export default router;

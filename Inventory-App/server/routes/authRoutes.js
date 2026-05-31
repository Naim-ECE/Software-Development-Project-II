import express from 'express';
import {
  register,
  login,
  refreshAccessToken,
  logoutUser,
  getMe,
  forgotPassword,
  resetPassword,
  updateProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.use(protect);
router.post('/logout', logoutUser);
router.get('/me', getMe);
router.put('/profile', updateProfile);

export default router;

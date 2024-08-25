import express from 'express';
import { test } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();
router.get('updated/:id',verifyToken,updateUser)
export default router;
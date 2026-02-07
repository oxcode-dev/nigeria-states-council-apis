import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    
})

export { router as profileRouter };
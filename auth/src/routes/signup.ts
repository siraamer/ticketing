import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '@aamertickets/common';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { validationRequest } from '@aamertickets/common';
const router = Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 character'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email in use!');
    }
    const user = User.build({ email, password });
    await user.save();
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: token,
    };
    res.status(201).send(user);
  }
);

//amji

export default router;

import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import User from '../models/user.model';
import Password from '../services/password';
import jwt from 'jsonwebtoken';
import { BadRequestError, validationRequest } from '@aamertickets/common';
const router = Router();

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid!'),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password!'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new BadRequestError('Invalid credentials!');
    }

    const passwordsMatch = await Password.compare(user.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials!');
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: token,
    };
    res.status(200).send(user);
  }
);

export default router;

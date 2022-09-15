import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import Ticket from '../models/ticket';
import { requireAuth, validationRequest } from '@aamertickets/common';
const router = Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required!'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0')

      .not()
      .isEmpty()
      .withMessage('Price is required!'),
  ],
  validationRequest,

  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: 'req.currentUser!.id,',
    });
    await ticket.save();
    res.status(201).send({ ticket });
  }
);

export default router;

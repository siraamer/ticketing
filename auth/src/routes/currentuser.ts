import { Router } from 'express';
import { currentUser } from '@aamertickets/common';
const router = Router();

router.get('/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export default router;

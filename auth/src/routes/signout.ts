import { Router, Request, Response } from 'express';

const router = Router();

router.post('/signout', (req, res) => {
  req.session = null;
  res.send({});
});

export default router;

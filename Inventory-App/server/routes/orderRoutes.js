import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Order routes placeholder' });
});

export default router;

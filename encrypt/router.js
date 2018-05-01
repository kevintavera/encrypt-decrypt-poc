'use strict';
import express from 'express';
import { addSecureValue } from './service'

const router = express.Router();

router.post('/ids/:id', async (req, res) => {
  const {value, encryption_key} = req.body;
  const id = req.params.id;
  const result = await addSecureValue(encryption_key, value, id);
  return res.json({
    success: result.stmt.changes ? true : false
  });
});

export default router;
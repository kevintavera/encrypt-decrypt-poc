'use strict';
import express from 'express';

import { getSecureValues } from './service'
const router = express.Router();

router.get('/ids/:id', async (req, res) => {
    const id = req.params.id;
    const encryption_key = req.query.encryption_key;
    return res.json(await getSecureValues(encryption_key, id));
  });

export default router;


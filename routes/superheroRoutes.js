import { Router } from 'express';
import { createSuperhero } from '../db/models/superheroModel.js';
import { debug } from '../server.js';

const router = Router();

router.post('/', async (req, res) => {
  const superhero = req.body;
  debug('in create route', superhero);
  try {
    const newSuperhero = await createSuperhero(superhero);
    res.send(newSuperhero);
  } catch (error) {
    debug(error);
    res.status(500).send(error);
  }
});

export default router;

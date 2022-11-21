import { Router } from 'express';
import {
  createSuperhero,
  getAllSuperheroes
} from '../db/models/superheroModel.js';
import { debug } from '../server.js';

const router = Router();

router.get('/', async (req, res) => {
  debug('in list route');

  try {
    const superheroes = await getAllSuperheroes();
    res.send(superheroes);
  } catch (error) {
    debug(error);
    res.status(500).send(error);
  }
});

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

import {
  createSuperhero,
  getAllSuperheroes,
  getSuperheroById,
  Superhero
} from '../db/models/superheroModel';
let backupSuperheroes;
import mongoose from '../db/mongoose';

beforeAll(async () => {
  console.log('before all');
  backupSuperheroes = await Superhero.find();
  backupSuperheroes = backupSuperheroes.map((superhero) => {
    let newSuperhero = superhero;

    return {
      name: newSuperhero.name,
      alterEgo: newSuperhero.alterEgo,
      powers: newSuperhero.powers,
      sidekicks: newSuperhero.sidekicks,
      weaknesses: newSuperhero.weaknesses
    };
  });
  await Superhero.deleteMany({});
  console.log('end of before all');
});
afterAll(async () => {
  console.log('after all');
  await Superhero.deleteMany({});
  await Superhero.create(backupSuperheroes);
  console.log('after all end');
  mongoose.connection.close();
});
describe('before all', () => {
  it('deletes all superheroes', async () => {
    let superheroes = await getAllSuperheroes();
    expect(superheroes.length).toBe(0);
  });
});

describe('Create superhero', () => {
  it('creates a new superhero with an _id', async () => {
    // setup
    const testSuperhero = {
      name: 'Hulk',
      alterEgo: 'Bruce Banner',
      powers: ['Jumping', 'Invincible', 'Spandex'],
      weaknesses: ['Black Widow'],
      location: {
        city: 'Somewhere in India',
        province: 'NA',
        country: 'India'
      },
      sidekicks: [{ name: 'Rick Jones', alterEgo: 'Unknown' }]
    };
    // execute
    const newSuperhero = await createSuperhero(testSuperhero);
    //validate
    expect(newSuperhero).toHaveProperty('_id');
    expect(newSuperhero).toHaveProperty('name', 'Hulk');
  });

  it('Should not create a superhero with no name', async () => {
    // setup
    const testSuperhero = {
      alterEgo: 'Nobody'
    };
    // execute
    expect(async () => createSuperhero(testSuperhero)).rejects.toThrow();
    // validate
  });
});

describe('Get Superhero By Id', () => {
  it('should find a superhero when passed a valid id', async () => {
    // setup
    const superhero = { name: 'Bob' };
    const newSuperhero = await createSuperhero(superhero);
    const id = newSuperhero._id;
    // execute
    const bob = await getSuperheroById(id);
    // validate
    expect(bob).toHaveProperty('name', 'Bob');
  });

  it('should not find a superhero when passed an id that does not match a superhero', async () => {
    const newSuperhero = await createSuperhero({ name: 'Doug' });
    const id = '6393685034bc6e4c3cf4eeab';
    // execute
    const bob = await getSuperheroById(id);
    // validate
    expect(bob).toBeNull();
  });
});

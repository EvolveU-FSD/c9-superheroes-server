import {
  createSuperhero,
  getAllSuperheroes,
  getSuperheroById,
  updateSuperhero,
  Superhero
} from '../db/models/superheroModel';
let backupSuperheroes;
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
  console.log(backupSuperheroes);
  await Superhero.deleteMany({});
  console.log('end of before all');
});
afterAll(async () => {
  console.log('after all');
  await Superhero.create(backupSuperheroes);
  console.log('after all end');
});
describe('before all', () => {
  it('deletes all superheroes', async () => {
    let superheroes = await getAllSuperheroes();
    expect(superheroes.length).toBe(0);
  });
});

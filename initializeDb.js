console.log(process.env.MONGODB_URI);
import { createSuperhero } from './db/models/superheroModel.js';
const addSuperheroToDatabase = async (superhero) => {
  try {
    const newSuperhero = await createSuperhero(superhero);
    console.log(newSuperhero);
  } catch (error) {
    console.log('Error creating superhero', superhero, error.message);
  }
};

const spiderman = {
  name: 'Spider-man',
  alterEgo: 'Peter Parker',
  powers: ['Web-slinging', 'Spidey-sense', 'Super strength'],
  weaknesses: ['Mary Jane'],
  location: { city: 'New York City', province: 'NY', country: 'USA' }
};

const batman = {
  name: 'Batman',
  powers: ['Rich'],
  favoriteFood: 'Turkey Club',
  weaknesses: ['Bats'],
  location: {
    city: 'Gotham',
    province: 'Unknown',
    country: 'USA'
  }
};

addSuperheroToDatabase(spiderman);
addSuperheroToDatabase(batman);

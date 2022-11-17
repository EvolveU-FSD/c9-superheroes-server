import mongoose from 'mongoose';

import myConfig from 'dotenv';
myConfig.config();

import DEBUG from 'debug';
let debug = DEBUG('server:mongoose');
debug.enabled = true;

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/superheroes';

mongoose.connect(connectionString, () => {
  debug(`connected to mongoose on ${connectionString}`);
});

export default mongoose;

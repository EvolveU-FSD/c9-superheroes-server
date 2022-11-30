import express from 'express';
import path from 'path';
import myConfig from 'dotenv';
myConfig.config();
import DEBUG from 'debug';
import superheroRouter from './routes/superheroRoutes.js';
import expressOidc from 'express-openid-connect';

// We have to manually destructure these because
// `express-openid-connect` is a CommonJS module
const { auth, requiresAuth } = expressOidc;

export const debug = DEBUG('server:routes');
debug.enabled = true;
const PORT = process.env.PORT || 5001;
const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.OIDC_BASE_URL,
  clientID: process.env.OIDC_CLIENT_ID,
  issuerBaseURL: process.env.OIDC_ISSUER_BASE_URL,
  routes: {
    login: false,
    callback: '/api/callback',
    logout: '/api/logout'
  }
};

app.use(auth(config));

app.use(express.json());
app.use(express.static('public'));

app.get('/api/login', (req, res) =>
  res.oidc.login({ returnTo: '/superheroes' })
);

app.get('/api/profile', requiresAuth(), (req, res) => {
  const profile = req.oidc.user;
  res.send(profile);
});

app.get('/slow', (req, res) => {
  console.log('delay for 3 seconds');
  setTimeout(() => {
    let seconds = new Date().getTime();
    res.send({ currentTime: seconds });
  }, 3000);
});
app.use('/api/superhero', requiresAuth(), superheroRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const express = require('express'); 
const { createClient } = require('redis'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Création et configuration du client Redis
const redisClient = createClient({
  url: 'redis://127.0.0.1:6379', 
});

// Gestion des erreurs Redis
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// Connexion à Redis
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err) => console.error('Could not connect to Redis:', err));

// Endpoint santé
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// CRUD : Create (ajouter un utilisateur)
app.post('/users', async (req, res) => {
  const { id, name, email } = req.body;
  if (!id || !name || !email) {
    return res.status(400).json({ message: 'id, name, and email are required' });
  }
  try {
    await redisClient.hSet(`user:${id}`, { name, email });
    res.status(201).json({ message: 'User created', user: { id, name, email } });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// CRUD : Read (récupérer un utilisateur)
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await redisClient.hGetAll(`user:${id}`);
    if (Object.keys(user).length === 0) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
    res.status(200).json({ id, ...user });
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// CRUD : Update (mettre à jour un utilisateur)
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name && !email) {
    return res.status(400).json({ message: 'At least one of name or email is required' });
  }
  try {
    const userExists = await redisClient.exists(`user:${id}`);
    if (!userExists) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
    const updatedUser = { ...(name && { name }), ...(email && { email }) };
    await redisClient.hSet(`user:${id}`, updatedUser);
    res.status(200).json({ message: 'User updated', user: { id, ...updatedUser } });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// CRUD : Delete (supprimer un utilisateur)
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await redisClient.del(`user:${id}`);
    if (result === 0) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
    res.status(200).json({ message: `User with id ${id} deleted` });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

let server;
if (require.main === module) {
  // Ne démarre le serveur que si le fichier est exécuté directement
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = { app, server, redisClient };

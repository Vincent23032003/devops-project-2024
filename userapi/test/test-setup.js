const { server, redisClient } = require('../src/index');

// Après tous les tests
after(async () => {
  // Fermer le serveur et la connexion Redis
  if (server) {
    await new Promise((resolve) => server.close(resolve));
    console.log('Server closed');
  }
  if (redisClient.isOpen) {
    await redisClient.quit();
    console.log('Redis connection closed');
  }
});

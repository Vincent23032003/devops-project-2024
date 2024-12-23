const { expect } = require('chai');
const { createClient } = require('redis');

describe('Configuration and Connection Tests', () => {
  describe('Environment Configuration', () => {
    it('should have correct PORT configuration', () => {
      const PORT = process.env.PORT || 3000;
      expect(PORT).to.be.a('number');
      expect(PORT).to.be.at.least(0);
    });

    it('should have correct Redis URL configuration', () => {
      const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
      expect(REDIS_URL).to.be.a('string');
      expect(REDIS_URL).to.match(/^redis:\/\//);
    });
  });

  describe('Redis Connection', () => {
    let redisClient;

    beforeEach(async () => {
      redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
      });
    });

    afterEach(async () => {
      if (redisClient.isOpen) {
        await redisClient.quit();
      }
    });

    it('should connect to Redis successfully', async () => {
      await redisClient.connect();
      expect(redisClient.isOpen).to.be.true;
    });

    it('should handle Redis connection errors appropriately', async function() {
      // Augmenter le timeout pour ce test spécifique
      this.timeout(5000);
      
      const badClient = createClient({
        url: 'redis://nonexistent:6379',
        socket: {
          connectTimeout: 1000, // Réduire le timeout de connexion à 1 seconde
        }
      });

      try {
        await badClient.connect();
        // Si on arrive ici, c'est que la connexion a réussi (ce qui ne devrait pas arriver)
        throw new Error('Connection should have failed');
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.not.equal('Connection should have failed');
      } finally {
        await badClient.disconnect();
      }
    });

    it('should perform basic Redis operations', async () => {
      await redisClient.connect();
      await redisClient.set('test_key', 'test_value');
      const value = await redisClient.get('test_key');
      expect(value).to.equal('test_value');
    });
  });
});

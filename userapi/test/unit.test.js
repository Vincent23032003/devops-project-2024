const { expect } = require('chai');
const { createClient } = require('redis');
require('./test-setup');

describe('Unit Tests', () => {
  let redisClient;

  before(async () => {
    redisClient = createClient({
      url: 'redis://127.0.0.1:6379',
    });
    await redisClient.connect();
  });

  after(async () => {
    await redisClient.quit();
  });

  beforeEach(async () => {
    // Nettoyer la base de données avant chaque test
    await redisClient.flushDb();
  });

  describe('Redis Operations', () => {
    it('should successfully set and get user data', async () => {
      const userId = 'test123';
      const userData = { name: 'Test User', email: 'test@test.com' };
      
      await redisClient.hSet(`user:${userId}`, userData);
      const result = await redisClient.hGetAll(`user:${userId}`);
      
      expect(result).to.deep.equal(userData);
    });

    it('should return empty object for non-existent user', async () => {
      const result = await redisClient.hGetAll('user:nonexistent');
      expect(result).to.deep.equal({});
    });

    it('should successfully delete user data', async () => {
      const userId = 'test123';
      const userData = { name: 'Test User', email: 'test@test.com' };
      
      await redisClient.hSet(`user:${userId}`, userData);
      await redisClient.del(`user:${userId}`);
      const result = await redisClient.hGetAll(`user:${userId}`);
      
      expect(result).to.deep.equal({});
    });
  });
});

module.exports = {
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    retry_strategy: function(options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        return new Error('Redis refused connection');
      }
      if (options.total_retry_time > 1000 * 60) {
        return new Error('Redis retry time exhausted');
      }
      if (options.attempt > 10) {
        return undefined;
      }
      return Math.min(options.attempt * 100, 3000);
    }
  },
  test: {
    timeout: 5000
  }
};

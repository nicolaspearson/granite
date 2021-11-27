// Set up test environment variables
process.env.API_HOST = 'localhost';
process.env.API_PORT = '3000';
process.env.ENVIRONMENT = 'development';
process.env.NODE_ENV = 'development';
process.env.REDIS_HOST = process.env.REDIS_HOST || 'localhost';
process.env.REDIS_PORT = process.env.REDIS_PORT || '6380';

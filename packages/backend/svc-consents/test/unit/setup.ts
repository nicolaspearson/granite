// Set up test environment variables
process.env.API_HOST = 'localhost';
process.env.API_PORT = '3000';
process.env.ENVIRONMENT = 'test';
process.env.JWT_ALGORITHM = 'HS256';
process.env.JWT_ISSUER = 'support@granite.com';
process.env.JWT_SECRET = 'secret';
process.env.JWT_TOKEN_EXPIRATION = '15m';
process.env.LOG_LEVEL = 'error';
process.env.NODE_ENV = 'test';

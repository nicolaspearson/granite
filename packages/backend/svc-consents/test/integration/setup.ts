import { resolve } from 'path';

// Set up test environment variables
process.env.API_HOST = 'localhost';
process.env.API_PORT = '3000';
process.env.ENVIRONMENT = 'test';
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error';
process.env.REDIS_HOST = process.env.REDIS_HOST || 'localhost';
process.env.REDIS_PORT = process.env.REDIS_PORT || '6380';
process.env.TYPEORM_CONNECTION = 'postgres';
process.env.TYPEORM_DATABASE = 'granite';
process.env.TYPEORM_ENTITIES = resolve(__dirname, '../../src/db/entities/*.ts');
process.env.TYPEORM_HOST = process.env.TYPEORM_HOST || 'localhost';
process.env.TYPEORM_MIGRATIONS = resolve(__dirname, '../../src/db/migrations/*.ts');
process.env.TYPEORM_PASSWORD = 'secret';
process.env.TYPEORM_PORT = process.env.TYPEORM_PORT || '5433';
process.env.TYPEORM_SYNCHRONIZE = 'true';
process.env.TYPEORM_USERNAME = 'granite';

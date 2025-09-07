// ./config/database.ts
import fs from 'fs';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres'); // 'postgres' | 'mysql'
  const sslEnabled = env.bool('DATABASE_SSL', true);

  // Prefer file path; fall back to inline CA
  const caFromPath = env('DATABASE_CA_PATH') && fs.existsSync(env('DATABASE_CA_PATH'))
    ? fs.readFileSync(env('DATABASE_CA_PATH'), 'utf8')
    : undefined;

  const ca = caFromPath ?? env('DATABASE_CA')?.replace(/\\n/g, '\n');

  // For MySQL on some drivers, you may need `rejectUnauthorized: true` or `ssl: { ca }`
  const ssl =
    sslEnabled
      ? (ca ? { ca } : true) // true lets driver use system CAs if present
      : false;

  return {
    connection: {
      client,
      connection: client === 'postgres'
        ? {
            host: env('DATABASE_HOST', '127.0.0.1'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', 'strapi'),
            password: env('DATABASE_PASSWORD', ''),
            ssl,
          }
        : {
            // MySQL
            host: env('DATABASE_HOST', '127.0.0.1'),
            port: env.int('DATABASE_PORT', 3306),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', 'strapi'),
            password: env('DATABASE_PASSWORD', ''),
            ssl,
          },
      pool: { min: 2, max: 10 },
      acquireConnectionTimeout: 10000,
    },
  };
};

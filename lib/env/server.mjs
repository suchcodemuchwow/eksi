import { serverSchema } from '../schemas/env.mjs';
import { env as clientEnv, formatErrors } from './client.mjs';

const _serverEnv = serverSchema.safeParse(process.env);

if (_serverEnv.success === false) {
  console.error('❌ Invalid environment variables:\n', ...formatErrors(_serverEnv.error.format()));
  throw new Error('Invalid environment variables');
}

/**
 * Validate server-side env are not exposed to the client
 */
for (const key of Object.keys(clientEnv)) {
  if (!key.startsWith('NEXT_PUBLIC_')) {
    console.warn('❌ You are exposing a server-side env:\n');
    throw new Error('You are exposing a server-side env');
  }
}

export const env = { ..._serverEnv.data, ...clientEnv };

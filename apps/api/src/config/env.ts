import path from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';

const DEFAULT_PORT = 3000;
const DEFAULT_DATABASE_PATH = './apps/api/db/calendar.sqlite';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
// Keep .env at the repository root so root/workspace commands share one source.
const repositoryRoot = path.resolve(currentDir, '..', '..', '..', '..');

dotenv.config({ path: path.join(repositoryRoot, '.env') });

const resolvePort = (value: string | undefined): number => {
  if (value === undefined) {
    return DEFAULT_PORT;
  }

  const normalizedValue = value.trim();

  if (normalizedValue.length === 0) {
    throw new Error('PORT must not be empty.');
  }

  const port = Number(normalizedValue);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return port;
};

const resolveDatabasePath = (value: string | undefined): string => {
  if (value === undefined) {
    return path.resolve(repositoryRoot, DEFAULT_DATABASE_PATH);
  }

  const normalizedValue = value.trim();

  if (normalizedValue.length === 0) {
    throw new Error('DATABASE_PATH must not be empty.');
  }

  if (path.isAbsolute(normalizedValue)) {
    return normalizedValue;
  }

  return path.resolve(repositoryRoot, normalizedValue);
};

export type Env = {
  port: number;
  databasePath: string;
};

export const env: Env = {
  port: resolvePort(process.env.PORT),
  databasePath: resolveDatabasePath(process.env.DATABASE_PATH),
};

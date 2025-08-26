/* eslint-disable no-undef */
// turbo-ignore-env-var WEB_PORT,PORT
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

globalThis.process = process;

const envPath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPath });

console.log('ENV PATH:', envPath);
console.log('WEB_PORT dari env:', process.env.WEB_PORT);

const port = process.env.WEB_PORT || 3000;
process.env.PORT = port;

console.log('PORT yang akan dipakai:', process.env.PORT);

execSync('next dev --turbopack', { stdio: 'inherit', env: process.env }); 
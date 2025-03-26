import { dirname, join } from 'path';
import os from 'os';
import Store from 'electron-store';
import log from 'electron-log';
import { readFileSync } from 'fs';

// Init store
const store = new Store();

// Import package.json
const packageJson = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8'));

// Define paths
export const CACHE_FOLDER_DIR = join(os.tmpdir(), packageJson.name);
export const LOG_FILE_DIR = log.transports.file.getFile().path;
export const LOG_FOLDER_DIR = dirname(LOG_FILE_DIR);
export const USER_DATA_FILE_DIR = store.path;
export const USER_DATA_FOLDER_DIR = dirname(USER_DATA_FILE_DIR);
export const APP_FOLDER_DIR = join(__dirname, '../../');
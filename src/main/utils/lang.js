import i18next from 'i18next';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import log from 'electron-log';
import { APP_FOLDER_DIR } from './paths.js';

// Initialize store
const store = new Store();

// Supported languages, add more if needed
export const supportedLanguages = ['en', 'es'];
supportedLanguages.push('system');

// Default language
let defaultLanguage = 'system';
let fallbackLanguage = 'en';

/**
 * Initialize language settings and translations
 */
export function initializeLanguage() {
    // Load translations
    const translations = {};
    supportedLanguages.filter(lang => lang !== 'system').forEach(lang => {
        const filePath = path.join(APP_FOLDER_DIR, `src/main/assets/locales/${lang}.json`);
        const content = fs.readFileSync(filePath, 'utf8');
        translations[lang] = { translation: JSON.parse(content) };
    });

    // Get the user's selected language preference
    const userLanguage = getCurrentLanguage();
    log.info(`Setting language to: ${userLanguage}`);

    // If 'system' is selected, use the system language
    const actualLanguage = userLanguage === 'system' ? getSystemLanguage() : userLanguage;

    // Configure i18next
    i18next.init({
        lng: actualLanguage,
        resources: translations
    });
}

/**
 * Get the system's default language if supported, otherwise fallback to default
 */
export function getSystemLanguage() {
    const systemLocale = app.getLocale().split('-')[0]; // Get the language without the region
    return supportedLanguages.filter(lang => lang !== 'system').includes(systemLocale) ? systemLocale : fallbackLanguage;
}

/**
 * Set the application language
 */
export function setLanguage(lang) {
    if (supportedLanguages.includes(lang)) {
        log.info(`Setting language to: ${lang}`);
        store.set('language', lang);
        if (lang === 'system') {
            lang = getSystemLanguage();
        }
        i18next.changeLanguage(lang);
        return true;
    }
    return false;
}

/**
 * Get the current language
 */
export function getCurrentLanguage() {
    return store.get('language', defaultLanguage);
}
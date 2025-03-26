import { nativeTheme } from 'electron';
import Store from 'electron-store';
import log from 'electron-log';

// Initialize store
const store = new Store();

// Supported themes
export const supportedThemes = ['light', 'dark', 'system'];

// Default theme
const defaultTheme = 'system';

/**
 * Detects the operating system theme
 * @returns {string} The detected theme ('dark' or 'light')
 */
export function detectSystemTheme() {
  return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
}

/**
 * Gets the effective theme to use
 * @returns {string} The theme to use ('dark' or 'light')
 */
export function getEffectiveTheme() {
  const savedTheme = store.get('theme', defaultTheme);
  return savedTheme === 'system' ? detectSystemTheme() : savedTheme;
}

/**
 * Gets the current theme preference from store
 * @returns {string} The theme preference ('light', 'dark', or 'system')
 */
export function getCurrentTheme() {
  return store.get('theme', defaultTheme);
}

/**
 * Set the application theme preference
 * @param {string} theme - The theme to set ('light', 'dark', or 'system')
 * @returns {boolean} Success status
 */
export function setTheme(theme) {
  if (supportedThemes.includes(theme)) {
    log.info(`Setting theme to: ${theme}`);
    store.set('theme', theme);
    nativeTheme.themeSource = theme;
    return true;
  }
  return false;
}

/**
 * Initializes the application theme based on stored preferences
 * @returns {string} The initialized theme
 */
export function initializeTheme() {
  const currentTheme = getCurrentTheme();
  setTheme(currentTheme);
  return currentTheme;
}

export default {
  detectSystemTheme,
  getEffectiveTheme,
  getCurrentTheme,
  setTheme,
  initializeTheme,
  supportedThemes
};
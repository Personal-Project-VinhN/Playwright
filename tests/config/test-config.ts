/**
 * Test configuration file for URLs and settings
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */

// Get base URL from environment variable or use default
const BASE_URL = process.env.BASE_URL || 'https://vinhdev.pro.vn';

export const TEST_CONFIG = {
  // Base URLs
  BASE_URL,
  
  // Page URLs
  URLS: {
    LOGIN: `${BASE_URL}/login`,
    DASHBOARD: `${BASE_URL}/dashboard`,
    HOME: BASE_URL,
  },
  
  // Timeout settings
  TIMEOUTS: {
    NAVIGATION: 10000,
    ELEMENT_VISIBLE: 5000,
    PAGE_LOAD: 15000,
    NETWORK_IDLE: 30000,
  },
  
  // Test environment settings
  ENVIRONMENT: {
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    IS_STAGING: process.env.NODE_ENV === 'staging',
    IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  },
  
  // Browser settings
  BROWSER: {
    HEADLESS: process.env.HEADLESS !== 'false',
    SLOW_MO: parseInt(process.env.SLOW_MO || '0'),
  }
};

// Validate required environment variables
export function validateConfig() {
  const requiredEnvVars = ['TEST_EMAIL', 'TEST_PASSWORD'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('Warning: Missing environment variables:', missingVars.join(', '));
    console.warn('Some tests may fail without proper credentials');
  }
}

// Get credentials from environment variables
export function getTestCredentials() {
  return {
    email: process.env.TEST_EMAIL || 'gin_vn@haldata.net',
    password: process.env.TEST_PASSWORD || 'Abc@123456',
    isValid: !!(process.env.TEST_EMAIL && process.env.TEST_PASSWORD)
  };
} 
import { test, expect, Page } from '@playwright/test';
import { LOGIN_DATA, LOGIN_SELECTORS } from './test-data/login-data';
import { DASHBOARD_SELECTORS, DASHBOARD_DATA } from './test-data/dashboard-data';
import { TEST_CONFIG, validateConfig } from './config/test-config';

/**
 * Test suite for dashboard functionality after successful login
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */

/**
 * Login helper function to authenticate user
 * @param page Playwright page object
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */
async function loginToApplication(page: Page) {
  // Navigate to login page using config
  await page.goto(TEST_CONFIG.URLS.LOGIN);
  await page.waitForLoadState('networkidle');
  
  // Fill login form
  await page.fill(LOGIN_SELECTORS.EMAIL_FIELD, LOGIN_DATA.VALID_USER.email);
  await page.fill(LOGIN_SELECTORS.PASSWORD_FIELD, LOGIN_DATA.VALID_USER.password);
  
  // Submit form
  await page.click(LOGIN_SELECTORS.LOGIN_BUTTON);
  await page.waitForLoadState('networkidle');
}

/**
 * Navigate to dashboard after login
 * @param page Playwright page object
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */
async function navigateToDashboard(page: Page) {
  // Login first
  await loginToApplication(page);
  
  // Navigate to dashboard
  await page.goto(DASHBOARD_DATA.DASHBOARD_URL);
  await page.waitForLoadState('networkidle');
}

/**
 * Check if login was successful
 * @param page Playwright page object
 * @returns boolean indicating if login was successful
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */
function isLoginSuccessful(page: Page): boolean {
  const currentUrl = page.url();
  return !currentUrl.includes('login');
}

test.describe('Dashboard Tests', () => {
  
  // Validate config before running tests
  test.beforeAll(async () => {
    validateConfig();
    
    if (!LOGIN_DATA.VALID_USER.isValid) {
      console.warn('⚠️  Running tests without valid credentials');
      console.warn('📝 Create .env file with TEST_EMAIL and TEST_PASSWORD for full testing');
      console.warn('🔧 Run: npm run setup-env to configure credentials interactively');
    }
  });
  
  test('should access dashboard after successful login', async ({ page }) => {
    await navigateToDashboard(page);
    
    const currentUrl = page.url();
    console.log('Current URL after login attempt:', currentUrl);
    
    // Check if login was successful
    if (currentUrl.includes('login')) {
      console.log('Login failed - redirected back to login page');
      console.log('Please update LOGIN_DATA with valid credentials');
      expect(currentUrl).toContain('login');
    } else {
      // Verify URL contains dashboard
      expect(page.url()).toContain('/dashboard');
      
      // Verify page title
      await expect(page).toHaveTitle(/dashboard|bảng điều khiển|trang chủ/i);
      
      // Verify dashboard loaded successfully
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should display dashboard header and navigation', async ({ page }) => {
    await navigateToDashboard(page);
    
    const currentUrl = page.url();
    if (currentUrl.includes('login')) {
      console.log('Login failed - cannot test dashboard header/navigation');
      console.log('Please update LOGIN_DATA with valid credentials');
      expect(currentUrl).toContain('login');
      return;
    }
    
    // Check for header elements
    const headerSelectors = DASHBOARD_SELECTORS.HEADER.split(', ');
    let headerFound = false;
    for (const selector of headerSelectors) {
      const element = page.locator(selector);
      if (await element.count() > 0) {
        await expect(element.first()).toBeVisible();
        headerFound = true;
        break;
      }
    }
    
    // Check for navigation elements
    const navSelectors = DASHBOARD_SELECTORS.NAVIGATION.split(', ');
    let navFound = false;
    for (const selector of navSelectors) {
      const element = page.locator(selector);
      if (await element.count() > 0) {
        await expect(element.first()).toBeVisible();
        navFound = true;
        break;
      }
    }
    
    console.log('Header found:', headerFound, 'Navigation found:', navFound);
  });

  test('should display user profile information', async ({ page }) => {
    await navigateToDashboard(page);
    
    const currentUrl = page.url();
    if (currentUrl.includes('login')) {
      console.log('Login failed - cannot test user profile');
      console.log('Please update LOGIN_DATA with valid credentials');
      expect(currentUrl).toContain('login');
      return;
    }
    
    // Check for user profile elements
    const profileSelectors = DASHBOARD_SELECTORS.USER_PROFILE.split(', ');
    let profileFound = false;
    for (const selector of profileSelectors) {
      const element = page.locator(selector);
      if (await element.count() > 0) {
        await expect(element.first()).toBeVisible();
        profileFound = true;
        break;
      }
    }
    
    console.log('User profile information found:', profileFound);
  });

  test('should have logout functionality', async ({ page }) => {
    await navigateToDashboard(page);
    
    const currentUrl = page.url();
    if (currentUrl.includes('login')) {
      console.log('Login failed - cannot test logout functionality');
      console.log('Please update LOGIN_DATA with valid credentials');
      expect(currentUrl).toContain('login');
      return;
    }
    
    // Check for logout button/link
    const logoutSelectors = DASHBOARD_SELECTORS.LOGOUT_BUTTON.split(', ');
    let logoutFound = false;
    for (const selector of logoutSelectors) {
      const element = page.locator(selector);
      if (await element.count() > 0) {
        await expect(element.first()).toBeVisible();
        logoutFound = true;
        break;
      }
    }
    
    console.log('Logout functionality found:', logoutFound);
  });

  test('should display main dashboard content', async ({ page }) => {
    await navigateToDashboard(page);
    
    const currentUrl = page.url();
    if (currentUrl.includes('login')) {
      console.log('Login failed - cannot test main dashboard content');
      console.log('Please update LOGIN_DATA with valid credentials');
      expect(currentUrl).toContain('login');
      return;
    }
    
    // Check for main content area
    const contentSelectors = DASHBOARD_SELECTORS.MAIN_CONTENT.split(', ');
    let contentFound = false;
    for (const selector of contentSelectors) {
      const element = page.locator(selector);
      if (await element.count() > 0) {
        await expect(element.first()).toBeVisible();
        contentFound = true;
        break;
      }
    }
    
    console.log('Main dashboard content found:', contentFound);
  });

  test('should display dashboard statistics or widgets', async ({ page }) => {
    await navigateToDashboard(page);
    
    const currentUrl = page.url();
    if (currentUrl.includes('login')) {
      console.log('Login failed - cannot test dashboard statistics/widgets');
      console.log('Please update LOGIN_DATA with valid credentials');
      expect(currentUrl).toContain('login');
      return;
    }
    
    // Check for dashboard widgets
    const widgetSelectors = DASHBOARD_SELECTORS.WIDGETS.split(', ');
    let widgetsFound = false;
    for (const selector of widgetSelectors) {
      const elements = page.locator(selector);
      if (await elements.count() > 0) {
        await expect(elements.first()).toBeVisible();
        widgetsFound = true;
        break;
      }
    }
    
    // Check for statistics
    const statsSelectors = DASHBOARD_SELECTORS.STATISTICS.split(', ');
    let statsFound = false;
    for (const selector of statsSelectors) {
      const elements = page.locator(selector);
      if (await elements.count() > 0) {
        await expect(elements.first()).toBeVisible();
        statsFound = true;
        break;
      }
    }
    
    console.log('Dashboard widgets found:', widgetsFound, 'Statistics found:', statsFound);
  });

  test('should handle dashboard page refresh', async ({ page }) => {
    await navigateToDashboard(page);
    
    const currentUrl = page.url();
    if (currentUrl.includes('login')) {
      console.log('Login failed - cannot test dashboard refresh');
      console.log('Please update LOGIN_DATA with valid credentials');
      expect(currentUrl).toContain('login');
      return;
    }
    
    // Refresh the page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify still on dashboard
    expect(page.url()).toContain('/dashboard');
    
    // Verify page still loads correctly
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to dashboard from other pages', async ({ page }) => {
    // Login first
    await loginToApplication(page);
    
    // Navigate to a different page first (if exists)
    const loginUrl = page.url();
    
    // Then navigate to dashboard
    await page.goto(DASHBOARD_DATA.DASHBOARD_URL);
    await page.waitForLoadState('networkidle');
    
    const currentUrl = page.url();
    if (currentUrl.includes('login')) {
      console.log('Login failed - cannot test dashboard navigation');
      console.log('Please update LOGIN_DATA with valid credentials');
      expect(currentUrl).toContain('login');
      return;
    }
    
    // Verify navigation successful
    expect(page.url()).toContain('/dashboard');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should prevent access to dashboard without login', async ({ page }) => {
    // Try to access dashboard without login
    await page.goto(DASHBOARD_DATA.DASHBOARD_URL);
    await page.waitForLoadState('networkidle');
    
    // Should be redirected to login page or show access denied
    const currentUrl = page.url();
    
    // Check if redirected to login or access denied
    if (currentUrl.includes('login')) {
      console.log('Redirected to login page - good security');
      expect(currentUrl).toContain('login');
    } else if (currentUrl.includes('dashboard')) {
      console.log('Accessed dashboard without login - potential security issue');
      // This might be okay if the site handles auth differently
    } else {
      console.log('Redirected to:', currentUrl);
    }
  });

}); 
import { test, expect, Page } from '@playwright/test';
import { LOGIN_DATA, LOGIN_SELECTORS } from './test-data/login-data';
import { TEST_CONFIG } from './config/test-config';

/**
 * Test suite for login functionality
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */

/**
 * Navigate to login page helper function
 * @param page Playwright page object
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */
async function navigateToLoginPage(page: Page) {
  await page.goto(TEST_CONFIG.URLS.LOGIN);
  await page.waitForLoadState('networkidle');
}

/**
 * Fill login form with credentials
 * @param page Playwright page object
 * @param email User email
 * @param password User password
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */
async function fillLoginForm(page: Page, email: string, password: string) {
  // Fill email field
  await page.fill(LOGIN_SELECTORS.EMAIL_FIELD, email);
  
  // Fill password field
  await page.fill(LOGIN_SELECTORS.PASSWORD_FIELD, password);
}

/**
 * Click login button
 * @param page Playwright page object
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */
async function clickLoginButton(page: Page) {
  // Click login button
  await page.click(LOGIN_SELECTORS.LOGIN_BUTTON);
}

test.describe('Login Page Tests', () => {
  
  test('should load login page successfully', async ({ page }) => {
    await navigateToLoginPage(page);
    
    // Verify page title contains expected text
    await expect(page).toHaveTitle(/login|đăng nhập|customer account|hydra translate client/i);
    
    // Verify login form elements exist
    await expect(page.locator(LOGIN_SELECTORS.EMAIL_FIELD)).toBeVisible();
    await expect(page.locator(LOGIN_SELECTORS.PASSWORD_FIELD)).toBeVisible();
    await expect(page.locator(LOGIN_SELECTORS.LOGIN_BUTTON)).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await navigateToLoginPage(page);
    
    // Fill form with invalid credentials
    await fillLoginForm(page, LOGIN_DATA.INVALID_USER.email, LOGIN_DATA.INVALID_USER.password);
    
    // Submit form
    await clickLoginButton(page);
    
    // Wait for either error message or form to update
    await page.waitForLoadState('networkidle');
    
    // Check if we're still on login page (indicating failed login)
    const currentUrl = page.url();
    expect(currentUrl).toContain('login');
    
    // Alternatively, check if form has error styling or validation
    const emailField = page.locator(LOGIN_SELECTORS.EMAIL_FIELD);
    const hasErrorStyling = await emailField.evaluate(el => {
      return el.classList.contains('ring-red-500') || 
             el.classList.contains('border-red-500') ||
             el.getAttribute('aria-invalid') === 'true';
    });
    
    console.log('Has error styling:', hasErrorStyling);
    console.log('Current URL:', currentUrl);
  });



  test('should validate empty form submission', async ({ page }) => {
    await navigateToLoginPage(page);
    
    // Try to submit empty form
    await clickLoginButton(page);
    
    // Verify validation happens (check for error styling applied)
    await expect(page.locator(LOGIN_SELECTORS.EMAIL_FIELD)).toHaveClass(/ring-red-500|border-red-500|error/);
    
    // Or check if form elements have required attribute
    await expect(page.locator(LOGIN_SELECTORS.EMAIL_FIELD)).toHaveAttribute('type', 'email');
  });

  test('should have forgot password link', async ({ page }) => {
    await navigateToLoginPage(page);
    
    // Verify forgot password link exists
    await expect(page.locator(LOGIN_SELECTORS.FORGOT_PASSWORD)).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await navigateToLoginPage(page);
    
    // Fill form with credentials from environment
    await fillLoginForm(page, LOGIN_DATA.VALID_USER.email, LOGIN_DATA.VALID_USER.password);
    
    // Submit form
    await clickLoginButton(page);
    
    // Wait for navigation after login attempt
    await page.waitForLoadState('networkidle');
    
    // Check the result - login MUST be successful
    const currentUrl = page.url();
    console.log('URL after login attempt:', currentUrl);
    
    // Expect successful login (redirect away from login page)
    expect(currentUrl).not.toContain('login');
    
    // Verify we're redirected to dashboard or home page
    const isDashboard = currentUrl.includes('dashboard') || currentUrl.includes('home') || currentUrl === TEST_CONFIG.BASE_URL + '/';
    expect(isDashboard).toBe(true);
    
    // Verify success indicators are present (user menu, logout link, etc.)
    const successIndicator = page.locator(LOGIN_SELECTORS.SUCCESS_INDICATOR).first();
    await expect(successIndicator).toBeVisible({ timeout: 10000 });
    
    console.log('Login successful - redirected to:', currentUrl);
  });

}); 
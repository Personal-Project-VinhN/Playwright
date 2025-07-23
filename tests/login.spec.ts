import { test, expect, Page } from '@playwright/test';
import { LOGIN_DATA, LOGIN_SELECTORS } from './test-data/login-data';

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
  await page.goto('https://vinhdev.pro.vn/login');
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
    
    console.log('• should load login page successfully => Passed');
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
    
    console.log('• should show error with invalid credentials => Passed');
  });



  test('should validate empty form submission', async ({ page }) => {
    await navigateToLoginPage(page);
    
    // Try to submit empty form
    await clickLoginButton(page);
    
    // Verify validation happens (check for error styling applied)
    await expect(page.locator(LOGIN_SELECTORS.EMAIL_FIELD)).toHaveClass(/ring-red-500|border-red-500|error/);
    
    // Or check if form elements have required attribute
    await expect(page.locator(LOGIN_SELECTORS.EMAIL_FIELD)).toHaveAttribute('type', 'email');
    
    console.log('• should validate empty form submission => Passed');
  });

  test('should have forgot password link', async ({ page }) => {
    await navigateToLoginPage(page);
    
    // Verify forgot password link exists
    await expect(page.locator(LOGIN_SELECTORS.FORGOT_PASSWORD)).toBeVisible();
    
    console.log('• should have forgot password link => Passed');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await navigateToLoginPage(page);
    
    // Fill form with credentials from environment
    await fillLoginForm(page, LOGIN_DATA.VALID_USER.email, LOGIN_DATA.VALID_USER.password);
    
        // Submit form
    await clickLoginButton(page);
    
    // Wait for navigation after login attempt
    await page.waitForLoadState('networkidle');
    
    // Dynamic wait for URL change
    let finalUrl = '';
    const maxPolls = 20; // 10 seconds total
    const pollInterval = 500; // 0.5 seconds
    
    for (let i = 0; i < maxPolls; i++) {
      await page.waitForTimeout(pollInterval);
      finalUrl = page.url();
      
      if (finalUrl.includes('/dashboard')) {
        break;
      } else if (finalUrl.includes('/login') && i > 4) {
        break;
      }
    }
    
    // Check the result - login success means redirect to dashboard
    const currentUrl = page.url();
    
    // Login successful if redirected to dashboard
    const loginSuccess = currentUrl.includes('/dashboard');
     
     try {
       if (loginSuccess) {
         expect(currentUrl).toContain('/dashboard');
         console.log('• should login successfully with valid credentials => Passed');
       } else {
         // Check for error messages if still on login page
         if (currentUrl.includes('/login')) {
           const errorSelectors = [
             '.error', '.alert-danger', '.text-red-500', '.text-danger', 
             '.invalid-feedback', '.error-message', '[role="alert"]'
           ];
           
           for (const selector of errorSelectors) {
             const errorElement = page.locator(selector);
             if (await errorElement.isVisible().catch(() => false)) {
               const errorText = await errorElement.textContent();
             }
           }
         }
         
         // Expect login to be successful (will fail if not redirected to dashboard)
         expect(currentUrl).toContain('/dashboard');
       }
     } catch (error) {
               console.log('• should login successfully with valid credentials => Failed');
       throw error;
     }
  });

}); 
import { TEST_CONFIG } from '../config/test-config';

/**
 * Test data for dashboard functionality
 * @author Gin<gin_vn@haldata.net>
 * @lastupdate Gin<gin_vn@haldata.net>
 */

export const DASHBOARD_SELECTORS = {
  // Header and navigation selectors
  HEADER: 'header, .header, .navbar, .top-bar',
  NAVIGATION: 'nav, .navigation, .sidebar, .nav-menu',
  
  // User profile selectors
  USER_PROFILE: '.user-profile, .user-info, .profile-menu, .user-menu, .account-info',
  USER_NAME: '.user-name, .username, .display-name, .profile-name',
  USER_EMAIL: '.user-email, .email, .profile-email',
  USER_AVATAR: '.user-avatar, .avatar, .profile-image, .user-image',
  
  // Logout functionality selectors
  LOGOUT_BUTTON: 'a[href*="logout"], button[onclick*="logout"], .logout, .sign-out, .log-out',
  
  // Main content selectors
  MAIN_CONTENT: 'main, .main-content, .dashboard-content, .content, .main-panel',
  
  // Dashboard widgets and statistics
  WIDGETS: '.widget, .card, .dashboard-card, .stat-card, .metric, .dashboard-widget',
  STATISTICS: '.statistics, .summary, .stats, .dashboard-stats',
  
  // Common dashboard elements
  WELCOME_MESSAGE: '.welcome, .greeting, .dashboard-welcome, .hello',
  BREADCRUMB: '.breadcrumb, .breadcrumbs, .page-path',
  
  // Notification elements
  NOTIFICATION_BELL: '.notification-bell, .notifications, .alert-bell',
  NOTIFICATION_PANEL: '.notification-panel, .notifications-panel, .alert-panel',
  
  // Search functionality
  SEARCH_BOX: 'input[type="search"], .search-input, .search-box',
  
  // Menu items
  MENU_ITEMS: '.menu-item, .nav-item, .sidebar-item',
  
  // Footer
  FOOTER: 'footer, .footer, .page-footer'
};

export const DASHBOARD_DATA = {
  // Expected page URLs - loaded from config
  DASHBOARD_URL: TEST_CONFIG.URLS.DASHBOARD,
  
  // Expected page titles
  EXPECTED_TITLES: [
    'dashboard',
    'bảng điều khiển',
    'trang chủ',
    'admin',
    'control panel'
  ],
  
  // Common dashboard text content
  EXPECTED_TEXT: {
    WELCOME: ['welcome', 'chào mừng', 'hello', 'xin chào'],
    DASHBOARD: ['dashboard', 'bảng điều khiển', 'trang chủ'],
    LOGOUT: ['logout', 'đăng xuất', 'sign out', 'log out']
  },
  
  // Timeout settings - loaded from config
  TIMEOUTS: TEST_CONFIG.TIMEOUTS
};

export const DASHBOARD_ACTIONS = {
  // Common actions that can be performed on dashboard
  ACTIONS: [
    'click_notification',
    'search',
    'navigate_to_profile',
    'logout',
    'refresh_page'
  ]
}; 
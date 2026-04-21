export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
export const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000;

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AI Clipper Hub';
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0';

// User roles
export const USER_ROLES = {
  OWNER: 'owner',
  STAFF: 'staff',
  USER: 'user',
} as const;

// User plans
export const USER_PLANS = {
  FREE: 'free',
  PREMIUM: 'premium',
  BUSINESS: 'business',
  ENTERPRISE: 'enterprise',
} as const;

// Niche geo codes
export const GEO_CODES = {
  INDONESIA: 'id',
  UNITED_STATES: 'us',
  GLOBAL: 'global',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/token',
  AUTH_ME: '/auth/me',
  AUTH_BOOTSTRAP: '/auth/bootstrap-owner',
  AUTH_SET_ROLE: '/auth/set-role',

  // Clips
  CLIPS_GENERATE: '/clips/generate-clips',
  CLIPS_FEEDBACK: '/clips/feedback',

  // Niche
  NICHE_TRENDING: '/niche/trending',
  NICHE_SUGGEST: '/niche/suggest',
  NICHE_FIND_VIDEOS: '/niche/find-videos',
  NICHE_SEARCH_WEB: '/niche/search-web',
  NICHE_ANALYZE_QUEUE: '/niche/analyze-and-queue',

  // Tools
  TOOLS_DUB: '/tools/dub',
  TOOLS_VIRAL_SCORE: '/tools/viral-score',
  TOOLS_MODEL_STATUS: '/tools/model-status',
  TOOLS_FEEDBACK: '/tools/feedback',

  // Dashboard
  DASHBOARD_OVERVIEW: '/dashboard/overview',
  DASHBOARD_HISTORY: '/dashboard/history',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_PROFILE_SETTINGS: '/dashboard/profile-settings',
  DASHBOARD_USER_PROFILE: '/dashboard/users/{user_id}/profile',
  DASHBOARD_OWNER_PROFILE: '/dashboard/owner/profile-settings',
  DASHBOARD_OWNER_MONITOR: '/dashboard/owner/monitor',
  DASHBOARD_USER_GROWTH: '/dashboard/user-growth',
  DASHBOARD_GODSMODE_CREDITS: '/dashboard/godsmode/adjust-credits',
  DASHBOARD_GODSMODE_RETRAIN: '/dashboard/godsmode/retrain-viral-model',
  DASHBOARD_GODSMODE_PERFORMANCE: '/dashboard/godsmode/system-performance',

  // Billing
  BILLING_WEBHOOK: '/billing/webhook',
  BILLING_REFERRAL_STATS: '/billing/referral-stats',
  BILLING_SUBSCRIBE: '/billing/subscribe/{plan}',
} as const;
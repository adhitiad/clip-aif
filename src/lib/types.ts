// User types
export interface UserOut {
  email: string;
  username: string | null;
  plan: UserPlan;
  role: UserRole;
  credits: number;
  used_credits: number;
}

export interface UserCreate {
  email: string;
  password: string;
  username?: string;
  referral_code?: string;
}

export interface UserProfileSettingsUpdate {
  username?: string | null;
  display_name?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  preferred_language?: string | null;
  timezone?: string | null;
  email_notifications?: boolean | null;
}

export interface OwnerProfileSettingsUpdate {
  username?: string | null;
  monitor_enabled?: boolean | null;
  monitor_refresh_seconds?: number | null;
  alert_queue_threshold?: number | null;
  alert_low_credit_threshold?: number | null;
  notify_email?: string | null;
}

export type UserRole = "owner" | "staff" | "user";
export type UserPlan =
  | "owner"
  | "staff"
  | "free"
  | "premium"
  | "business"
  | "enterprise";

// Auth types
export interface Token {
  access_token: string;
  token_type: string;
}

export interface BootstrapOwnerRequest {
  email: string;
  bootstrap_token: string;
}

export interface RoleUpdateRequest {
  email: string;
  role: UserRole;
}

// Video/Clip types
export interface VideoRequest {
  url: string;
  user_query?: string;
  target_language?: string;
}

export interface FeedbackRequest {
  clip_id: number;
  score: number;
}

export interface ViralScoreRequest {
  title: string;
  description?: string;
  start_time?: number;
  end_time?: number;
  has_broll?: boolean;
  audio_path?: string;
  threshold?: number;
}

export interface DubRequest {
  video_path: string;
  target_lang?: string;
  keep_original_audio?: number;
  output_path?: string;
}

export interface PerformanceFeedback {
  clip_id: number;
  actual_views?: number;
  actual_likes?: number;
  actual_shares?: number;
}

// Niche types
export interface AutoQueueRequest {
  user_query?: string;
  niche_count?: number;
  videos_per_niche?: number;
  target_language?: string;
  geo?: string;
  min_duration_seconds?: number;
  max_duration_seconds?: number;
}

// Dashboard types
export interface DashboardOverview {
  // Will be defined based on actual API response
  [key: string]: any;
}

export interface DashboardHistory {
  // Will be defined based on actual API response
  [key: string]: any;
}

export interface DashboardUserGrowth {
  // Will be defined based on actual API response
  [key: string]: any;
}

export interface ModelStatus {
  // Will be defined based on actual API response
  [key: string]: any;
}

export interface SystemPerformance {
  // Will be defined based on actual API response
  [key: string]: any;
}

// Trending/Search types
export interface TrendingTopic {
  title: string;
  traffic?: number;
  [key: string]: any;
}

export interface SuggestedNiche {
  niche: string;
  hook: string;
  search_query: string;
  [key: string]: any;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: number;
  views?: number;
  [key: string]: any;
}

export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
  [key: string]: any;
}

// Validation error
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: any;
  ctx?: any;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// Generic response
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success?: boolean;
}

// Investment types
export interface InvestmentStatus {
  valuation: number;
  founder_share: number;
  investors_share: number;
  available_share: number;
  total_funding_target: number;
  total_collected: number;
}

export interface InvestmentBuyRequest {
  invest_amount: number;
}

// Finance types
export interface FinanceTransaction {
  id: number;
  created_at: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string | null;
}

export interface FinanceSummary {
  total_income: number;
  total_expense: number;
  net_profit: number;
  recent_transactions: FinanceTransaction[];
}

export interface FinanceRecordRequest {
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
}

export interface Shareholder {
  id: string;
  email: string;
  role: string;
  plan: string;
  invested_amount: number;
  ownership_percentage: number;
}

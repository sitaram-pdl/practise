export const BadgeConfig = {
  KEY: 'BADGE',
  GET_BADGE: '/badgeRequest',
};

export const ContactConfig = {
  KEY: 'CONTACT',
  POST_CONTACT: '/contact',
};

export const GreenScoreConfig = {
  KEY: 'GREEN_SCORE',
  GET_GREEN_SCORE: '/website-report/generate-public-report',
};

export const AuditConfig = {
  KEY: 'AUDIT',
  GET_AUDIT_RECORD: '/report/generate',
  GET_WEBSITE_RECORD: '/report/fetch',
};

export const EmissionConfig = {
  KEY: 'EMISSION_DATA',
  GET_EMISSION_RECORD: '/emission',
  POST_EMISSION_RECORD: '/emission',
  DELETE_EMISSION_RECORD: (id) => `/emission/${id}`,
};

export const UserConfig = {
  KEY: 'AUTH',
  REGISTER: '/auth/register',
  INDIVIDUAL_LOGIN: '/auth/individual-login',
  GOOGLE_LOGIN: '/auth/google-login',
  AGENT_LOGIN: '/auth/agent-login',
  ADD_USER: '/user/add-user',
  GET_USER: '/user',
};

export const WebsiteConfig = {
  KEY: 'Website',
  CATEGORY: '/website-core/category',
  SERVER: '/web-service/server',
  IPINFO: '/website-report/ip-info',
  INDUSTRY: '/website-core/industry',
  BANDWIDTH: '/website-core/bandwidth',
  MARKET_CAP: '/website-core/market-cap',
  WEB_SERVICES: '/website-core/web-service',
  GENERATE_REPORT: '/website-report/generate-report',
  AGENT_GENERATE_REPORT: '/website-report/generate-agent-report',
  WEBSITE_REPORT: '/website-report',
  AGENT_WEBSITE_REPORT: '/website-report/list-agent-website',
  GET_PAGE_INSIGHT: (id) => `/website-report/${id}/page-insight`,
  GET_TRAFFIC_REPORT: (id) => `/website-report/${id}/traffic-report`,
  GET_GREEN_REPORT: (id) => `/website-report/${id}/green-report`,
  GET_NETWORK_REPORT: (id) => `/website-report/${id}/network-report`,
  GET_TECHNOLOGY_REPORT: (id) => `/website-report/${id}/technology-report`,
  GET_REGENERATED_REPORT: (id) => `/website-report/${id}/regenerate-report`,
};

export const CategoryConfig = {
  KEY: 'CATEGORY',
  GET_CATEGORIES: '/category',
  ADD_CATEGORY: '/category',

  GET_CATEGORY_BY_ID: (id) => `/category/${id}`,
  EDIT_CATEGORY: (id) => `/category/${id}`,
  DELETE_CATEGORY: (id) => `/category/${id}`,
};

export const CategoryScoreConfig = {
  KEY: 'CATEGORY_SCORE',
  GET_CATEGORIES_SCORE: '/category/score',
  ADD_CATEGORY_SCORE: '/category/score',
  GET_WEBSITE_DATA: '/category/website',

  GET_SCORE_BY_ID: (id) => `/category/score/${id}`,
};

export const SubscriptionConfig = {
  KEY: 'SUBSCRIPTION',
  ADD_EMAIL: '/subscription',
};

import { WebsiteConfig } from '../api.routes';
import { getApiResponse, getResponseBadge } from '../axios';

export const postGenerateReport = async (data) => {
  const result = await getResponseBadge({
    url: WebsiteConfig.GENERATE_REPORT,
    method: 'POST',
    data,
  });

  // if (result.APIFailed) return result.error;
  return result;
};

export const postGenerateReportByAgent = async (data) => {
  const result = await getResponseBadge({
    url: WebsiteConfig.AGENT_GENERATE_REPORT,
    method: 'POST',
    data,
  });

  // if (result.APIFailed) return result.error;
  return result;
};

export const getWebsiteReport = async (id) => {
  const result = await getResponseBadge({
    url: WebsiteConfig.AGENT_WEBSITE_REPORT,
    method: 'GET',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getCarbonReport = async (id) => {
  const result = await getResponseBadge({
    url: WebsiteConfig.GET_GREEN_REPORT(id),
    method: 'GET',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getPageInsightReport = async (id) => {
  const result = await getResponseBadge({
    url: WebsiteConfig.GET_PAGE_INSIGHT(id),
    method: 'GET',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getTrafficReport = async (id) => {
  const result = await getResponseBadge({
    url: WebsiteConfig.GET_TRAFFIC_REPORT(id),
    method: 'GET',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getHardwareReport = async (id) => {
  const result = await getResponseBadge({
    url: WebsiteConfig.GET_TRAFFIC_REPORT(id),
    method: 'GET',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getNetworkReport = async (id) => {
  const result = await getResponseBadge({
    url: WebsiteConfig.GET_NETWORK_REPORT(id),
    method: 'GET',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getTechnologyReport = async (id) => {
  const result = await getResponseBadge({
    url: WebsiteConfig.GET_TECHNOLOGY_REPORT(id),
    method: 'GET',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getRegeneratedReport = async (id) => {
  const result = await getResponseBadge({
    url: WebsiteConfig.GET_REGENERATED_REPORT(id),
    method: 'GET',
  });

  return result;
};

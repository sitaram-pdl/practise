// import { getDomain } from "@/utils/validate.utils";
import { WebsiteConfig } from '../api.routes';
import { getApiResponse } from '../axios';

export const getIndustryCategory = async () => {
  const result = await getApiResponse({
    url: WebsiteConfig.CATEGORY,
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getWebsiteServers = async () => {
  const result = await getApiResponse({
    url: WebsiteConfig.SERVER,
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getWebsiteIpInfo = async (url) => {
  const result = await getApiResponse({
    url: WebsiteConfig.IPINFO,
    method: 'post',
    data: { url },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getWebsiteIndustry = async () => {
  const result = await getApiResponse({
    url: WebsiteConfig.INDUSTRY,
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getWebsiteBandwidth = async () => {
  const result = await getApiResponse({
    url: WebsiteConfig.BANDWIDTH,
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getWebsiteMarketCap = async () => {
  const result = await getApiResponse({
    url: WebsiteConfig.MARKET_CAP,
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getWebsiteServices = async () => {
  const result = await getApiResponse({
    url: WebsiteConfig.WEB_SERVICES,
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

import { getResponseBadge } from '@/services/axios';
import { BadgeConfig } from '../api.routes';
import httpBadge from '../httpBadge';

export const getBatchRequests = async () => {
  const result = await getResponseBadge({
    url: BadgeConfig.GET_BADGE,
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const postBadgeRequests = async (formData) => {
  const result = await getResponseBadge({
    url: BadgeConfig.GET_BADGE,
    method: 'post',
    data: formData,
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getImageBadge = async (website) => {
  try {
    const result = await httpBadge({
      method: 'post',
      url: `/badge`,
      data: { url: website },
      headers: { 'Content-Type': 'application/json' },
      accept: '*/*',
    });

    return result.data;
  } catch (error) {
    return {
      APIFailed: true,
      error: error.response,
    };
  }
};

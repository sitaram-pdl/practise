import { getResponseBadge, getPublicApiResponse } from '../axios';
import { CategoryScoreConfig, SubscriptionConfig } from '../api.routes';
import { getDomain } from '@/utils/validate.utils';

export const getCategoryScore = async (id) => {
  const result = await getPublicApiResponse({
    url: CategoryScoreConfig.GET_SCORE_BY_ID(id),
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getWebsiteStoredData = async (url) => {
  const website = getDomain(url);

  const result = await getPublicApiResponse({
    url: CategoryScoreConfig.GET_WEBSITE_DATA,
    method: 'get',
    otherParams: {
      website,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const addCategoryScore = async (formData) => {
  const result = await getPublicApiResponse({
    url: CategoryScoreConfig.ADD_CATEGORY_SCORE,
    method: 'patch',
    data: formData,
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const postSubscription = async (email) => {
  const result = await getPublicApiResponse({
    url: SubscriptionConfig.ADD_EMAIL,
    method: 'post',
    otherParams: {
      email,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

import {getApiResponse, getResponseBadge} from '@/services/axios';
import { GreenScoreConfig } from '../api.routes';

export const postGreenScore = async (url) => {
  const result = await getApiResponse({
    url: GreenScoreConfig.GET_GREEN_SCORE,
    method: 'post',
    data: { url },
  });

  if (result.APIFailed) return null;
  return result.data;
  // return result.data.data.stats;
};

export const fetchGreenScorefromID = async (id) => {
  const result = await getApiResponse({
    url: `website-report/${id}/green-report`,
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const regenerateReport = async (id) => {
  const result = await getResponseBadge({
    url: `website-report/${id}/regenerate-report`,
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

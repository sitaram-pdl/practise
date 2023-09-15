import { getPublicApiResponse } from '@/services/axios';
import { EmissionConfig } from '../api.routes';

export const getEmissionRecords = async (url) => {
  const config = {
    url: EmissionConfig.GET_EMISSION_RECORD,
    method: 'get',
  };

  if (url) {
    config.otherParams = { url };
  }

  const result = await getPublicApiResponse(config);

  if (result.APIFailed) return null;
  return result.data;
};

export const addEmissionRecords = async (postData) => {
  const result = await getPublicApiResponse({
    url: EmissionConfig.POST_EMISSION_RECORD,
    method: 'post',
    data: postData,
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const deleteEmissionRecords = async (id) => {
  const result = await getPublicApiResponse({
    url: EmissionConfig.DELETE_EMISSION_RECORD(id),
    method: 'delete',
  });

  if (result.APIFailed) return null;
  return result.data;
};

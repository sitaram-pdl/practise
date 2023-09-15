import { getApiResponse, getResponseBadge } from '@/services/axios';
import { UserConfig } from '../api.routes';

export const postloginUser = async (formdata) => {
  const result = await getApiResponse({
    url: UserConfig.INDIVIDUAL_LOGIN,
    method: 'post',
    data: formdata,
  });
  console.log('login: response at api', result);

  if (result.APIFailed) return result;
  return result;
};

export const postloginAgency = async (formdata) => {
  console.log('agency api');
  const result = await getApiResponse({
    url: UserConfig.AGENT_LOGIN,
    method: 'post',
    data: formdata,
  });

  if (result.APIFailed) return result;
  return result;
};

export const postloginGoogle = async (formdata) => {
  const result = await getApiResponse({
    url: UserConfig.GOOGLE_LOGIN,
    method: 'post',
    data: formdata,
  });

  if (result.APIFailed) return result;
  return result;
};

export const postSignupUser = async (formdata) => {
  const result = await getApiResponse({
    url: UserConfig.REGISTER,
    method: 'post',
    data: formdata,
  });

  if (result.APIFailed) return result;
  return result.data;
};

export const getUserData = async () => {
  const result = await getResponseBadge({
    url: '/user/individual/profile',
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const postAddNewClient = async (formdata) => {
  const result = await getResponseBadge({
    url: UserConfig.ADD_USER,
    method: 'post',
    data: formdata,
  });

  // if (result.APIFailed) return result;
  return result;
};

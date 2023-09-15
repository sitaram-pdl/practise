import { toast } from 'react-toastify';
import http from './http';
import httpBadge from './httpBadge';
import httpPublic from './httpPublic';

const getApiResponse = async ({
  url,
  method = 'get',
  type = 'application/json',
  data = {},
  otherParams = {},
}) => {
  try {
    const result = await http({
      method,
      url: `${url}`,
      data,
      headers: { 'Content-Type': type },
      params: {
        ...otherParams,
      },
      accept: '*/*',
    });

    return result;
  } catch (error) {
    return {
      APIFailed: true,
      error: error.response,
    };
  }
};

export const getResponseBadge = async ({
  url,
  method = 'get',
  type = 'application/json',
  data = {},
  otherParams = {},
  displaySuccessMessage = true,
}) => {
  try {
    const result = await httpBadge({
      method,
      url: `${url}`,
      data,
      headers: { 'Content-Type': type },
      params: {
        ...otherParams,
      },
      accept: '*/*',
    });

    if (method !== 'get') {
      if (result.data.message && displaySuccessMessage) {
        toast.success(result.data.message || 'Success', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    }

    return result;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Something went wrong!.',
    );

    return {
      APIFailed: true,
      error: error.response,
    };
  }
};

const getPublicApiResponse = async ({
  url,
  method = 'get',
  type = 'application/json',
  data = {},
  otherParams = {},
}) => {
  try {
    const result = await httpPublic({
      method,
      url: `${url}`,
      data,
      headers: { 'Content-Type': type },
      params: {
        ...otherParams,
      },
      accept: '*/*',
    });

    return result;
  } catch (error) {
    return {
      APIFailed: true,
      error: error.response,
    };
  }
};

export { getApiResponse, getPublicApiResponse };

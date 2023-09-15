import { getResponseBadge } from '@/services/axios';
import { ContactConfig } from '../api.routes';

export const postContactForm = async (formdata) => {
  const result = await getResponseBadge({
    url: ContactConfig.POST_CONTACT,
    method: 'post',
    data: formdata,
  });

  if (result.APIFailed) return null;
  return result.data;
};

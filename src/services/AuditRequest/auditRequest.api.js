import { getResponseBadge } from '@/services/axios';
import { AuditConfig } from '../api.routes';
import { getDomain } from '@/utils/validate.utils';

export const postAuditData = async (formdata) => {
  const result = await getResponseBadge({
    url: AuditConfig.GET_AUDIT_RECORD,
    method: 'post',
    data: formdata,
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getWebsiteRecords = async (website) => {
  const domain = getDomain(website);

  const result = await getResponseBadge({
    url: AuditConfig.GET_WEBSITE_RECORD,
    method: 'get',
    otherParams: {
      website: domain,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

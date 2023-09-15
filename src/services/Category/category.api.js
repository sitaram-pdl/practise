import { getResponseBadge } from '../axios';
import { CategoryConfig } from '../api.routes';

export const getAllCategories = async () => {
  const result = await getResponseBadge({
    url: CategoryConfig.GET_CATEGORIES,
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getCategoryById = async (id) => {
  const result = await getResponseBadge({
    url: CategoryConfig.GET_CATEGORY_BY_ID(id),
    method: 'get',
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const addNewCategory = async (formData) => {
  const result = await getResponseBadge({
    url: CategoryConfig.ADD_CATEGORY,
    method: 'post',
    data: formData,
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const updateCategory = async (formData) => {
  const result = await getResponseBadge({
    url: CategoryConfig.EDIT_CATEGORY(formData._id),
    method: 'patch',
    data: { name: formData.name, description: formData.description },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const deleteCategoryAPI = async (id) => {
  const result = await getResponseBadge({
    url: CategoryConfig.DELETE_CATEGORY(id),
    method: 'delete',
  });

  if (result.APIFailed) return null;
  return result.data;
};

import secureLocalStorage from 'react-secure-storage';

export const getToken = () => {
  const token =
    sessionStorage.getItem('token') ||
    secureLocalStorage.getItem('access_token');
  return token || null;
};

export const saveToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const removeToken = () => {
  sessionStorage.removeItem('token');
};

// saveUserDetail
export const getUserDetail = () => {
  const token = sessionStorage.getItem('userDetail');
  return token || null;
};

export const saveUserDetail = (token) => {
  sessionStorage.setItem('userDetail', token);
};

export const removeUserDetail = () => {
  sessionStorage.removeItem('userDetail');
};

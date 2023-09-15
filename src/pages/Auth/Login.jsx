import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Checkbox } from 'antd';
import { useMutation } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import { useGoogleLogin } from '@react-oauth/google';
import { isValidEmail } from '@/lib/emailValidate';
import cx from 'classnames';
import { FcGoogle } from 'react-icons/fc';

import {
  postloginUser,
  postloginAgency,
  postloginGoogle,
} from '@/services/Users/users.api';
import { saveToken, saveUserDetail } from '@/utils/storage.utils';
import styles from '@/scss/login.module.scss';

function LoginPage() {
  const [isAgencyLogin, setIsAgencyLogin] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  secureLocalStorage.setItem('isAgency', isAgencyLogin ? 'true' : 'false');

  const navigate = useNavigate();

  const mutation = useMutation(
    !isAgencyLogin ? postloginUser : postloginAgency,
  );
  const mutategoogleLogin = useMutation(postloginGoogle);

  const [formData, setFormData] = useState(
    Object.freeze({ email: '', password: '' }),
  );

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const viewLogin = () => {
    console.log('is login');
    setIsAgencyLogin(!isAgencyLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email) {
      return toast.error('Email is required!');
    }

    if (!isValidEmail(formData.email)) {
      return toast.error('Email is not valid!');
    }
    if (!formData.password) {
      return toast.error('Password is required!');
    }

    const postData = new FormData();
    postData.append('username', formData.email);
    postData.append('password', formData.password);

    mutation.mutate(formData, {
      onSuccess: (response) => {
        console.log('login response', response);
        if (response?.status >= 200 && response?.status < 400) {
          saveToken(response?.data?.access_token);

          saveUserDetail(JSON.stringify(response?.data?.user));
          secureLocalStorage.setItem('user', response.data.user);
          secureLocalStorage.setItem(
            'access_token',
            response.data.access_token,
          );
          secureLocalStorage.setItem(
            'isAgency',
            isAgencyLogin ? 'true' : 'false',
          );

          if (response.data.websiteId && response.data.websiteId != '') {
            localStorage.setItem('websiteId', response.data.websiteId);
            secureLocalStorage.setItem('websiteId', response.data.websiteId);
            // websiteUrl
            secureLocalStorage.setItem('websiteUrl', response.data.websiteUrl);
            navigate('/carbontest');
            return;
          }
          if (isAgencyLogin) {
            navigate('/agency');
            return;
          }
          navigate('/server');
        } else {
          toast.error(response?.error?.statusText);
        }
      },
    });
  };

  const login = useGoogleLogin({
    flow: 'auth-code',
    redirectUri: import.meta.env.VITE_APP_ROOT_URL,
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);

      // const xhr = new XMLHttpRequest();
      // xhr.open("GET", `https://www.googleapis.com/oauth2/v3/userinfo`);
      // xhr.setRequestHeader("Authorization", `Bearer ${tokenResponse.access_token}`);
      // xhr.onload = function () {
      //   if (this.status >= 200 && this.status < 300) {
      //     const response = JSON.parse(this.responseText);
      //     console.log(response);
      //   }
      // };
      // xhr.send();

      const loginData = {
        code: tokenResponse.code,
        userType: isAgencyLogin ? 'agent' : 'individual',
      };
      mutategoogleLogin.mutate(loginData, {
        onSuccess: (response) => {
          // console.log("login response => ", response);
          if (response?.status >= 200 && response?.status < 400) {
            saveToken(response?.data?.access_token);

            saveUserDetail(JSON.stringify(response?.data?.user));

            if (response.data.websiteId && response.data.websiteId != '') {
              localStorage.setItem('websiteId', response.data.websiteId);
              secureLocalStorage.setItem(
                'websiteUrl',
                response.data.websiteUrl,
              );
              secureLocalStorage.setItem('websiteId', response.data.websiteId);
              secureLocalStorage.setItem('user', response.data.user);
              secureLocalStorage.setItem(
                'access_token',
                response.data.access_token,
              );
              secureLocalStorage.setItem(
                'isAgency',
                isAgencyLogin ? 'true' : 'false',
              );
              navigate('/carbontest');
              return;
            }
            if (isAgencyLogin) {
              secureLocalStorage.setItem(
                'isAgency',
                isAgencyLogin ? 'true' : 'false',
              );
              navigate('/agency');
              return;
            }
            secureLocalStorage.setItem('user', response.data.user);
            secureLocalStorage.setItem(
              'access_token',
              response.data.access_token,
            );
            secureLocalStorage.setItem(
              'isAgency',
              isAgencyLogin ? 'true' : 'false',
            );
            navigate('/server');
          } else {
            toast.error(response?.error?.statusText);
          }
        },
      });
    },
  });

  return (
    <div
      className={cx('relative', styles.container)}
      style={{ alignItems: 'center' }}
    >
      <div className={styles['parent']}>
        <div>
          <div className={styles.heading}>
            <div className="fs-1 fw-bold">
              {isAgencyLogin ? 'Login as Agency' : 'Login'}
            </div>
            <div
              className={styles.customButtonWrapper}
              onClick={() => viewLogin()}
            >
              {isAgencyLogin ? 'Login as Individual' : 'Login as Agency'}
            </div>
          </div>
          <div className={cx(styles.textColor, styles.subtitle, 'mt-2')}>
            Join us on the journey towards a sustainable web by login now
          </div>

          <form className="w-100 mt-4" onSubmit={handleSubmit}>
            <div
              className="d-flex flex-column gap-3 w-100"
              style={{ maxWidth: '26rem' }}
            >
              <div className="d-flex flex-column  gap-2">
                <label className={styles.textColor}>
                  Email address&nbsp;
                  <sup className={styles.sup}>*</sup>
                </label>
                <div className={cx('mt-1', styles.inputContainer)}>
                  <input
                    type="email"
                    className={cx('custom-input', styles.input)}
                    onChange={handleChange}
                    name="email"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="d-flex flex-column  gap-2">
                <label className={styles.textColor}>Enter Password</label>
                <div
                  className={cx(
                    'mt-1',
                    styles.passwordContainer,
                    styles.inputContainer,
                  )}
                >
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    className={cx('custom-input', styles.input)}
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                  />
                  <span
                    className={styles.toggler}
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                  >
                    {isPasswordVisible ? 'Hide' : 'Show'}
                  </span>
                </div>
              </div>
              <div className={cx('my-2', styles.rememberPassword)}>
                <div className="d-flex gap-2">
                  <Checkbox defaultChecked>
                    <span className={styles.rememberMe}>Remember Password</span>
                  </Checkbox>
                </div>
                <div className={styles.forgetPassword}>Forget Password?</div>
              </div>
              <Button
                loading={mutation.isLoading}
                type="primary"
                className={styles.button}
                htmlType="submit"
              >
                Login
              </Button>
              <div className={styles.brbetween}>
                <hr className={styles.hr} />
                <span>Or</span>
              </div>
              <Button
                className={styles.loginWithGoogle}
                onClick={() => login()}
              >
                <FcGoogle size={24} className={styles.icons} />
                <span>Login with Google</span>
              </Button>
              <div className="w-full text-center">
                <span style={{ color: '#828282' }}>
                  Don’t have an account ?
                </span>
                <span
                  className={styles.link}
                  onClick={() => navigate('/signup')}
                >
                  Signup for free
                </span>
              </div>
            </div>
          </form>
        </div>

        <div
          className={cx(
            `d-flex justify-content-end align-items-end h-100`,
            styles.rightContainer,
          )}
        >
          <img className={styles.bgImage} src="./images/loginpage.png"></img>
        </div>

        <div className={styles.logoContainer}>
          <img className={styles.logo} src="./images/logo.svg"></img>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;

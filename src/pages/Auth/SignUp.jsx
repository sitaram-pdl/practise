import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postloginGoogle, postSignupUser } from '@/services/Users/users.api';
import styles from '@/scss/login.module.scss';
import cx from 'classnames';
import { isValidEmail } from '@/lib/emailValidate';
import { Button, Checkbox, Input } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { saveToken, saveUserDetail } from '@/utils/storage.utils.js';
import secureLocalStorage from 'react-secure-storage';

function SignUp() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const mutation = useMutation(postSignupUser);

  const [formData, setFormData] = useState(
    Object.freeze({ email: '', password: '', fullName: '' }),
  );
  const [termsSelected, setTermSelected] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!termsSelected) {
      return toast.error('Must agree terms and conditions');
    }
    if (!formData.email) {
      return toast.error('Email is required!');
    }

    if (!isValidEmail(formData.email)) {
      return toast.error('Email is not valid!');
    }

    if (formData.password.length < 8) {
      return toast.error('Password must be at least 10 characters long.');
    }

    const postData = new FormData();
    postData.append('username', formData.email);
    postData.append('password', formData.password);
    postData.append('fullName', formData.fullName);

    mutation.mutate(formData, {
      onSuccess: (response) => {
        if (response) {
          // saveToken(response.token);
          toast.success('User is successfully register');
          navigate('/login');
        }
      },
    });
  };

  const mutategoogleLogin = useMutation(postloginGoogle);
  const signup = useGoogleLogin({
    flow: 'auth-code',
    redirectUri: import.meta.env.VITE_APP_ROOT_URL,
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);

      const loginData = {
        code: tokenResponse.code,
        userType: 'individual',
      };
      mutategoogleLogin.mutate(loginData, {
        onSuccess: (response) => {
          // console.log("login response => ", response);

          if (response?.status >= 200 && response?.status < 400) {
            toast.success('Registered user successfully');
            saveToken(response?.data?.access_token);

            saveUserDetail(JSON.stringify(response?.data?.user));

            if (response.data.websiteId && response.data.websiteId != '') {
              localStorage.setItem('websiteId', response.data.websiteId);
              secureLocalStorage.setItem('websiteId', response.data.websiteId);
              secureLocalStorage.setItem('user', response.data.user);
              secureLocalStorage.setItem(
                'access_token',
                response.data.access_token,
              );
              navigate('/carbontest');
              return;
            }
            secureLocalStorage.setItem('user', response.data.user);
            secureLocalStorage.setItem(
              'access_token',
              response.data.access_token,
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
            <div className="fs-1 fw-bold">Sign up</div>
          </div>
          <div className={cx(styles.textColor, styles.subtitle)}>
            Join us on the journey towards a sustainable web by Sign up now
          </div>

          <form className="w-100 mt-2" onSubmit={handleSubmit}>
            <div
              className="d-flex flex-column gap-3 w-100"
              style={{ maxWidth: '26rem' }}
            >
              <div className="d-flex flex-column  gap-1">
                <label className={styles.textColor}>
                  Your fullname&nbsp;
                  <sup className={styles.sup}>*</sup>
                </label>
                <div className={cx('mt-1', styles.inputContainer)}>
                  <input
                    type="text"
                    className={cx('custom-input', styles.input)}
                    onChange={handleChange}
                    name="fullName"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="d-flex flex-column  gap-1">
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
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div className="d-flex flex-column  gap-1">
                <label className={styles.textColor}>
                  Create Password&nbsp;
                  <sup className={styles.sup}>*</sup>
                </label>
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
              <div className={cx(styles.rememberPassword)}>
                <Checkbox
                  defaultChecked
                  checked={termsSelected}
                  onChange={(e) => setTermSelected(e.target.checked)}
                >
                  <span className={styles.rememberMe}>
                    I agree to terms & conditions
                  </span>
                </Checkbox>
              </div>
              <Button
                loading={mutation.isLoading}
                type="primary"
                className={styles.button}
                onClick={handleSubmit}
                htmlType="submit"
              >
                Register Account
              </Button>
              <div className={styles.brbetween}>
                <hr className={styles.hr} />
                <span>Or</span>
              </div>
              <Button
                className={styles.loginWithGoogle}
                onClick={() => signup()}
              >
                <FcGoogle size={24} className={styles.icons} />
                <span>Register with Google</span>
              </Button>
              <div className="w-full text-center">
                <span style={{ color: '#828282' }}>ALready have account ?</span>
                <span
                  className={styles.link}
                  onClick={() => navigate('/login')}
                >
                  Login here
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
export default SignUp;

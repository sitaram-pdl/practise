import styles from './Text.module.css';

export const Text = ({ variant = 'title', children }) => {
  return <div className={styles[variant]}>{children}</div>;
};

import styles from './Button.module.css';

type Props = {
  title: string;
  onClick?: () => void;
  full?: boolean;
};

const Button = ({ title, onClick, full }: Props) => {
  const className = full
    ? `${styles.button} ${styles['button--full']}`
    : styles.button;

  return (
    <button type="button" className={className} onClick={onClick}>
      <span className={styles.button__icon}>+</span>
      {title}
    </button>
  );
};

export default Button;

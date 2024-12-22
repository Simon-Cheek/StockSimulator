import classNames from "classnames";
import styles from "./components.module.css";

type ButtonProps = {
  children: React.ReactNode;
  hollow?: boolean;
};

export function Button({ children, hollow }: ButtonProps) {
  return (
    <button
      className={classNames(styles.button, { [styles.hollowButton]: hollow })}
    >
      {children}
    </button>
  );
}

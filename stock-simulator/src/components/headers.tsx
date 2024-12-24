import classNames from "classnames";
import styles from "./components.module.css";

type HeaderProps = {
  children: React.ReactNode;
  italic?: boolean;
  color?: string;
  style?: React.CSSProperties;
};

export function H1({ children, italic, color, style }: HeaderProps) {
  return (
    <h1
      className={classNames(styles.header, styles.header1, {
        [styles.italic]: italic,
      })}
      style={{ color: color, ...style }}
    >
      {children}
    </h1>
  );
}

export function H2({ children, italic, color, style }: HeaderProps) {
  return (
    <h2
      className={classNames(styles.header, styles.header2, {
        [styles.italic]: italic,
      })}
      style={{ color: color, ...style }}
    >
      {children}
    </h2>
  );
}

export function H3({ children, italic, color, style }: HeaderProps) {
  return (
    <h3
      className={classNames(styles.header, styles.header3, {
        [styles.italic]: italic,
      })}
      style={{ color: color, ...style }}
    >
      {children}
    </h3>
  );
}

export function H4({ children, italic, color, style }: HeaderProps) {
  return (
    <h4
      className={classNames(styles.header, styles.header4, {
        [styles.italic]: italic,
      })}
      style={{ color: color, ...style }}
    >
      {children}
    </h4>
  );
}

export function H5({ children, italic, color, style }: HeaderProps) {
  return (
    <h5
      className={classNames(styles.header, styles.header5, {
        [styles.italic]: italic,
      })}
      style={{ color: color, ...style }}
    >
      {children}
    </h5>
  );
}

export function H6({ children, italic, color, style }: HeaderProps) {
  return (
    <h6
      className={classNames(styles.header, styles.header6, {
        [styles.italic]: italic,
      })}
      style={{ color: color, ...style }}
    >
      {children}
    </h6>
  );
}

"use client";
import classNames from "classnames";
import styles from "./components.module.css";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  hollow?: boolean;
  href?: string;
  onClick?: () => void;
};

export function Button({ children, hollow, href, onClick }: ButtonProps) {
  return !href ? (
    <button
      className={classNames(styles.button, { [styles.hollowButton]: hollow })}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <Link href={href}>
      <button
        className={classNames(styles.button, { [styles.hollowButton]: hollow })}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
}

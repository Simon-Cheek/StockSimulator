import classNames from "classnames";
import styles from "./components.module.css";

type SpanProps = {
  children: React.ReactNode;
  italic?: boolean;
  bold?: boolean;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  style?: React.CSSProperties;
};

export function Paragraph({
  children,
  italic,
  color,
  bold,
  size,
  style,
}: SpanProps) {
  let fontSize = "16px";
  switch (size) {
    case "xs":
      fontSize = "10px";
      break;
    case "sm":
      fontSize = "12px";
      break;
    case "md":
      fontSize = "14px";
      break;
    case "lg":
      fontSize = "16px";
      break;
    case "xl":
      fontSize = "18px";
      break;
    default:
      fontSize = "12px";
  }

  return (
    <p
      className={classNames(
        { [styles.italic]: italic },
        { [styles.bold]: bold }
      )}
      style={{ color: color, fontSize: fontSize, ...style }}
    >
      {children}
    </p>
  );
}

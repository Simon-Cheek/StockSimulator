import classNames from 'classnames';
import styles from './components.module.css'

type SpanProps = {
  children: React.ReactNode;
  italic?: boolean;
  bold?: boolean;
  color?: string;
}

export function Span({children, italic, color, bold}: SpanProps) {
  return (
    <span className={classNames(
      {[styles.italic]: italic},
      {[styles.bold]: bold}
    )} style={{color: color}}>{children}</span>
  );
}

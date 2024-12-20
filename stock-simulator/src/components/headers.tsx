import classNames from 'classnames';
import styles from './components.module.css'
import { colors } from './colors'

type HeaderProps = {
  children: React.ReactNode;
  italic?: boolean;
  color?: string;
}

export function H1({children, italic = false, color = colors.white}: HeaderProps) {
  return (
    <h1 className={classNames(
      styles.header,
      styles.header1,
      {[styles.italicHeader]: italic}
    )} style={{color: color}}>{children}</h1>
  );
}

export function H2({children, italic = false, color = colors.white}: HeaderProps) {
  return (
    <h2 className={classNames(
      styles.header,
      styles.header2,
      {[styles.italicHeader]: italic}
    )} style={{color: color}}>{children}</h2>
  );
}

export function H3({children, italic = false, color = colors.white}: HeaderProps) {
  return (
    <h3 className={classNames(
      styles.header,
      styles.header3,
      {[styles.italicHeader]: italic}
    )} style={{color: color}}>{children}</h3>
  );
}

export function H4({children, italic = false, color = colors.white}: HeaderProps) {
  return (
    <h4 className={classNames(
      styles.header,
      styles.header4,
      {[styles.italicHeader]: italic}
    )} style={{color: color}}>{children}</h4>
  );
}

export function H5({children, italic = false, color = colors.white}: HeaderProps) {
  return (
    <h5 className={classNames(
      styles.header,
      styles.header5,
      {[styles.italicHeader]: italic}
    )} style={{color: color}}>{children}</h5>
  );
}
  

export function H6({children, italic = false, color = colors.white}: HeaderProps) {
  return (
    <h6 className={classNames(
      styles.header,
      styles.header6,
      {[styles.italicHeader]: italic}
    )} style={{color: color}}>{children}</h6>
  );
}
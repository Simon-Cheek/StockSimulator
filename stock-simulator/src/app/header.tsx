import { H1, H2 } from "../components/headers";
import styles from './home.module.css'

export default function Header() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <H1>Stock Simulator</H1>
        <H2>Current Value:</H2>
      </div>
    </div>
  );
}

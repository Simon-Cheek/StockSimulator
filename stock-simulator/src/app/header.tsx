import { colors } from "@/components/colors";
import { H1, H3 } from "../components/headers";
import styles from './home.module.css'
import { Span } from "@/components/span";
import { Separator } from "@/components/separator";

export default function Header() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <H1>Stock Simulator</H1>
        <Separator size="sm" />
        <H3>Current Value:  
          <Span color={colors.green}> $100000</Span>
        </H3>
      </div>
    </div>
  );
}

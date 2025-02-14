import { colors } from "@/components/colors";
import { H1, H3 } from "../components/headers";
import styles from "./home.module.css";
import { Span } from "@/components/span";
import { Separator } from "@/components/separator";
import { PageProps } from "./page";

export default function Header({ data }: PageProps | { data: null }) {
  const stockInfo = data;

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <H1>Stock Simulator</H1>
        <Separator size="sm" />
        <H3>
          Current Value:
          <Span color={colors.blue}>
            {stockInfo?.balance ? ` $${stockInfo.balance}` : " $0"}
          </Span>
        </H3>
      </div>
    </div>
  );
}

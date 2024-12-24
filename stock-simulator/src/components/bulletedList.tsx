import { H3, H4, H5, H6 } from "./headers";
import { Paragraph } from "./paragraph";

type ListProp = {
  list: string[];
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  title?: string;
  style?: React.CSSProperties;
};

export function BulletedList({ list, size = "md", title, style }: ListProp) {
  let listTitle;
  switch (size) {
    case "xs":
      listTitle = <H6>{title}</H6>;
      break;
    case "sm":
      listTitle = <H5>{title}</H5>;
      break;
    case "md":
    case "lg":
      listTitle = <H4>{title}</H4>;
      break;
    case "xl":
      listTitle = <H3>{title}</H3>;
      break;
    default:
      listTitle = null;
  }

  return (
    <div style={style}>
      {title && listTitle}
      <ul style={{ margin: "0" }}>
        {list.map((item, ind) => (
          <li key={`${item}-${ind}`}>
            <Paragraph size={size}>{item}</Paragraph>
          </li>
        ))}
      </ul>
    </div>
  );
}

type SeparatorProps = {
  vertical?: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function Separator({vertical, size="md"}: SeparatorProps) {

  let factor = "12px";
  switch (size) {
    case "xs":
      factor = "4px";
      break;
    case "sm":
      factor = "8px";
      break;
    case "md":
      factor = "12px";
      break;
    case "lg":
      factor = "16px";
      break;
    case "xl":
      factor = "20px";
    default:
      factor = "12px";
  }

  const horizontalStyle = {
    minHeight: factor
  }

  const verticalStyle = {
    minWidth: factor
  }

  return (
    <div style={vertical ? verticalStyle : horizontalStyle}></div>
  );
}

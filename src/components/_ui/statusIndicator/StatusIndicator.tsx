import { IStatusIndicator } from "../../../_shared/types";
import { colorByStatus } from "../../../utils/status";
import styles from "./StatusIndicator.module.css";

interface IProps {
  status: IStatusIndicator;
  children: React.ReactNode;
  type?: "tag" | "card";
}

export const StatusIndicator = ({
  children,
  type = "card",
  status,
}: IProps) => {
  return (
    <div
      className={`
        ${colorByStatus(status)}
        ${type === "tag" && styles.tag}
        ${type === "card" && styles.card}
      `}
    >
      {children}
    </div>
  );
};

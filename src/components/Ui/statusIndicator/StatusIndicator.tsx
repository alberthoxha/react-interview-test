import { IStatusIndicator } from "../../../_shared/types";
import styles from "./StatusIndicator.module.css";

interface IProps {
  status: IStatusIndicator;
  children: React.ReactNode;
}

export const StatusIndicator = ({ children, status }: IProps) => {
  function colorByStatus() {
    if (status === "completed") return styles.completed;
    if (status === "onroad") return styles.onroad;
    if (status === "onhold") return styles.onhold;
    if (status === "inprogress") return styles.inprogress;
  }

  return <div className={`${colorByStatus()} ${styles.box}`}>{children}</div>;
};

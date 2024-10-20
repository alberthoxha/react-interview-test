import { IStatus, IStatusIndicator } from "../../../_shared/types";
import styles from "./StatusIndicator.module.css";

interface IProps {
  status: IStatusIndicator;
  itemLength?: IStatus;
}

export const StatusIndicator = ({ status, itemLength }: IProps) => {
  function colorByStatus() {
    if (status === "completed") return styles.completed;
    if (status === "onroad") return styles.onroad;
    if (status === "onhold") return styles.onhold;
    if (status === "inprogress") return styles.inprogress;
  }

  function displayName() {
    if (status === "completed") return "Completed";
    if (status === "onroad") return "On Road";
    if (status === "onhold") return "On Hold";
    if (status === "inprogress") return "In Progress";
  }

  return (
    <div className={`${colorByStatus()} ${styles.box}`}>
      {`${itemLength ? itemLength.status.length : ""} ${displayName()}`}
    </div>
  );
};

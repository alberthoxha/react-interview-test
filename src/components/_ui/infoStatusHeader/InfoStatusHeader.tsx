import { Jobs } from "../../../_shared/types";
import { StatusIndicator } from "../statusIndicator/StatusIndicator";
import styles from "./InfoStatusHeader.module.css";

interface IProps {
  data: Jobs[] | undefined;
}
export const InfoStatusHeader = ({ data }: IProps) => {
  function filterLengthStatus(param: string) {
    const result = data
      ?.map(({ status }) => status)
      .filter((item) => item === param);
    return result?.length;
  }

  return (
    <div className={styles.container}>
      <StatusIndicator status="onroad">
        {filterLengthStatus("onroad")} On Road
      </StatusIndicator>

      <StatusIndicator status="completed">
        {filterLengthStatus("completed")} Completed
      </StatusIndicator>

      <StatusIndicator status="onhold">
        {filterLengthStatus("onhold")} On Hold
      </StatusIndicator>
    </div>
  );
};

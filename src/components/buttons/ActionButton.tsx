import { FaArrowLeftLong, FaPlus, FaXmark, FaCheck } from "react-icons/fa6";
import styles from "./ActionButton.module.css";

interface IProps {
  children: React.ReactNode;
  action: "create" | "save" | "navigate" | "cancel";
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}

export const ActionButton = ({
  children,
  action,
  onClick,
  type = "submit",
}: IProps) => {
  function icon() {
    if (action === "cancel") return <FaXmark />;
    if (action === "create") return <FaPlus />;
    if (action === "navigate") return <FaArrowLeftLong />;
    if (action === "save") return <FaCheck />;
  }
  function color() {
    if (action === "cancel") return styles.cancel;
    if (action === "create" || action === "save") return styles.create;
    if (action === "navigate") return styles.navigate;
  }

  return (
    <button
      type={type}
      className={`${styles.button} ${color()}`}
      onClick={onClick}
    >
      <div className={styles.textInside}>{children}</div>
      <div className={styles.wrapper}>
        <span className={styles.verticalLine}></span>
        {icon()}
      </div>
    </button>
  );
};

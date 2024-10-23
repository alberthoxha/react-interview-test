import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { colorByStatus, statusTitleFormat } from "../../utils/status";
import styles from "./SelectInput.module.css";

interface IProps {
  value: string;
  selectedItem: (param: string) => void;
}

const status = ["completed", "inprogress", "onhold", "onroad"];

const SelectInput = ({ value, selectedItem }: IProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSelect(status: string) {
    selectedItem(status);
    setIsSelectOpen(false);
  }

  function toggleSelect() {
    setIsSelectOpen(!isSelectOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.inputContainer}>
      <div onClick={toggleSelect} className={styles.insideInput}>
        {value ? (
          <div className={styles.insideInputAlign}>
            <div
              className={`
                ${colorByStatus(value)}
                ${styles.circleIndentatorStatus}`}
            />
            <p>{statusTitleFormat(value)}</p>
          </div>
        ) : (
          <p style={{ opacity: "20%" }}>Select a status</p>
        )}
        <FaPlay
          style={{
            transform: isSelectOpen ? "rotate(90deg)" : "rotate(-90deg)",
          }}
        />
      </div>

      {isSelectOpen && (
        <div className={styles.selectedBoxList} ref={dropdownRef}>
          {status.map((item) => (
            <p
              className={`
                ${item === value ? colorByStatus(item) : ""}
                ${styles.selectedBoxListItem}`}
              key={item}
              onClick={() => handleSelect(item)}
            >
              {statusTitleFormat(item)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectInput;

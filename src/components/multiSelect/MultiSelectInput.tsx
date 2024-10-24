import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { categoryTitleFormat, colorByCategory } from "../../utils/category";
import styles from "./MultiSelectInput.module.css";
import { AiFillCloseSquare } from "react-icons/ai";

interface IProps {
  value: string[];
  addCategory: (param: string) => any;
  removeCategory: (param: string) => any;
}

const status = ["side_walk_sheed", "scaffold", "shoring"];

const SelectInput = ({ value, addCategory, removeCategory }: IProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSelect(status: string) {
    addCategory(status);
    setIsSelectOpen(false);
  }

  function toggleSelect() {
    setIsSelectOpen((prev) => !prev);
  }

  function singleValue(param: string): string | undefined {
    return value.find((item) => item === param);
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
        <p style={{ opacity: "20%" }}>Select a category</p>
        <FaPlay
          style={{
            transform: isSelectOpen ? "rotate(90deg)" : "rotate(-90deg)",
          }}
        />
      </div>

      {isSelectOpen && (
        <div ref={dropdownRef} className={styles.selectedBoxList}>
          {status.map((item) => (
            <p
              className={`${singleValue(item) ? colorByCategory(item) : ""} ${
                styles.selectedBoxListItem
              }`}
              key={item}
              onClick={() => handleSelect(item)}
            >
              {categoryTitleFormat(item)}
            </p>
          ))}
        </div>
      )}

      <div className={styles.addedCategoryList}>
        {value.map((item) => (
          <div className={styles.addedCategoryItem} key={item}>
            <div
              className={`${colorByCategory(item)} ${
                styles.circleIndentatorStatus
              }`}
            />
            <p>{item}</p>
            <AiFillCloseSquare
              onClick={() => removeCategory(item)}
              size={24}
              color="var(--flex-bg-red)"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectInput;

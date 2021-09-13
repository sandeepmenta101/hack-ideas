import { useState } from "react";

import styles from "../../styles/styles.module.scss";
export default function CustomSelect(props: any) {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { removeOption, selectOption, selectedOptions } = props;
  const options = ["Feature", "Tech", "Non Tech"];

  return (
    <div className={toggleDropdown ? styles.expandedDropdown : styles.dropdownWrapper}>
      <div
        className={styles.label}
        onClick={() => setToggleDropdown(!toggleDropdown)}
      >
        <p>Select Tags</p>
        <i className="fas fa-caret-down"></i>
      </div>
      {selectedOptions.length > 0 && (
        <div className={styles.selectedOptions}>
          {selectedOptions.map((option: string) => (
            <span className={styles.selectedOption}>
              {option} <button onClick={() => removeOption(option)}>X</button>
            </span>
          ))}
        </div>
      )}
      {toggleDropdown && (
        <div className={styles.dropdown}>
          <ul>
            {options.map((option) => (
              <li>
                <input
                  type="checkbox"
                  id={option}
                  name={option}
                  onChange={selectOption}
                />{" "}
                <label htmlFor={option}>{option}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

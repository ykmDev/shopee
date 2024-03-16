import { Dropdown } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { PRIMARY_COLOR } from "../constant";

const DropdownForTable = ({
  dropdownItems,
  defaultValue,
  handleOnClickDropdownItem,
  className,
}) => {
  const [dropdownValue, setDropdownValue] = useState(defaultValue);

  // Add a useEffect to update the dropdownValue when defaultValue changes
  useEffect(() => {
    setDropdownValue(defaultValue);
  }, [defaultValue]);

  return (
    <Dropdown
      style={{ background: PRIMARY_COLOR }}
      label={dropdownValue?.text || ""} // Use optional chaining to handle undefined
      // dismissOnClick={true}
      className={className}
    >
      {dropdownItems?.map((item) => (
        <Dropdown.Item
          key={item.id || item.value}
          onClick={() => {
            setDropdownValue(item);
            handleOnClickDropdownItem(item);
          }}
        >
          {item.text}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default DropdownForTable;

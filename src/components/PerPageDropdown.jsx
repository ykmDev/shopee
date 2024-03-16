import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { PRIMARY_COLOR } from "../constant.js";

const PerPageDropdown = ({
  defaultValue,
  handleOnClickDropdownItem,
  dropdownItems,
}) => {
  const [dropdownValue, setDropdownValue] = useState(defaultValue);

  return (
    <Dropdown
      label={dropdownValue.text}
      // Add your desired styling
      style={{ background: PRIMARY_COLOR }}
    >
      {dropdownItems?.map((item) => (
        <Dropdown.Item
          key={item.value}
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

export default PerPageDropdown;

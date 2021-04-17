import React from "react";
import "./SidebarOption.css";

function SidebarOption({ Icon, title, number, selected, setSelected }) {
  return (
    <div
      onClick={setSelected}
      className={`sidebarOption ${selected && "sidebarOption--active"}`}
    >
      <Icon />
      <h3>{title}</h3>
      <p>{number && number}</p>
    </div>
  );
}

export default SidebarOption;

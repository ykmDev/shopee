// import icon
import SidebarItem from "./SidebarItem";
import { BiAdjust } from "react-icons/bi";
import { FaUserSlash } from "react-icons/fa";
import { LuUsers2 } from "react-icons/lu";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { MdDoorSliding } from "react-icons/md";
import { useMemo, useRef, useState } from "react";
import useLogout from "../hooks/useLogout";
import { paths } from "../routes/path";
import { SIDERBAR_ITEM } from "../constant";

const Footer = () => {
  const logout = useLogout();
  const menuToggleBtnRef = useRef(null);
  return (
    <footer className="footer">
      <p>© 2024 Nang Siri Wang. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;

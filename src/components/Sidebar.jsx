// import icon
import SidebarItem from "./SidebarItem";
import { BiAdjust } from "react-icons/bi";
import { FaUserSlash } from "react-icons/fa";
import { LuUsers2 } from "react-icons/lu";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { MdDoorSliding } from "react-icons/md";
import logo from "../assets/images/logo.jpg";
import { useMemo, useRef, useState } from "react";
import useLogout from "../hooks/useLogout";
import { paths } from "../routes/path";
import { SIDERBAR_ITEM } from "../constant";

const Sidebar = () => {
  const Logo = useMemo(() => {
    return (
      <img
        src={logo}
        alt="logo"
        className="w-10 h-10 rounded-full object-cover"
      />
    );
  }, []);

  const logout = useLogout();
  const menuToggleBtnRef = useRef(null);
  return (
    <>
      <button
        ref={menuToggleBtnRef}
        onClick={(_) => console.log("clicked")}
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-[40] w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  bg-primary dark:bg-gray-800">
          <div className="flex items-center gap-2 mb-4">
            {Logo}

            <div className="">
              <h2 className="text-xl font-semibold text-white">YMS</h2>
            </div>
          </div>
          <ul className="space-y-2 font-medium">
            {SIDERBAR_ITEM.map((item, i) => {
              return (
                <SidebarItem
                  key={i}
                  link={item.link}
                  label={item.label}
                  icon={<item.icon />}
                  external={item.external ? item.external : false}
                  onClick={() =>
                    window.screen.width < 640 &&
                    menuToggleBtnRef.current?.click()
                  }
                />
              );
            })}

            {/* <SidebarItem link={"Link"} label={"ထွက်မည်"} icon={<IoLogOut />} /> */}

            <button
              onClick={logout}
              className="flex w-full items-center p-2 text-white rounded-lg dark:text-white hover:bg-soft_primary group"
            >
              <div className="flex items-center">
                <IoLogOut />
                <span className="flex-1 ms-3 whitespace-nowrap">ထွက်မည်</span>
              </div>
            </button>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

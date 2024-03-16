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

const Header = () => {

    const [categories, setCategories] = useState(
        [
          "smartphones",
          "laptops",
          "fragrances",
          "skincare",
          "groceries",
          "home-decoration",
          "furniture",
          "tops",
          "womens-dresses",
          "womens-shoes",
          "mens-shirts",
          "mens-shoes",
          "mens-watches",
          "womens-watches",
          "womens-bags",
          "womens-jewellery",
          "sunglasses",
          "automotive",
          "motorcycle",
          "lighting"
        ]
      );

  const logout = useLogout();
  const menuToggleBtnRef = useRef(null);
  return (
    <header className="header">
    <div className="main-container">
      <div className="buy"><a href="#">BUY</a></div>
      <div className="login-set">
        <a href="#" className="signup">SIGN UP</a>
        <a href="./login.html" className="login">LOGIN</a>
      </div>
    </div>
    <div className="search">
      <input type="text" placeholder="Search..."/>
      <button type="submit">Search</button>
    </div>
    <ul className="category">
    <li><a href="#">All</a></li>
        {categories.map((category) => {
            return (
                <li ><a href="#" key={category}>{category}</a></li>
            )
        })}
    </ul>
  </header>
  );
};

export default Header;

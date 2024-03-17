// import icon
import { useRef, useState } from "react";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/path";

const Header = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
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
    "lighting",
  ]);

  const logout = useLogout();
  const menuToggleBtnRef = useRef(null);
  return (
    <header className="header">
      <div className="inner">
        <h1 className="header-logo">
          <a href="/">
            <i className="fa-solid fa-store"></i>
            <span>Shop</span>
          </a>
        </h1>
        <nav className="nav-list">
          <ul>
            <li>
              <a href="" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
            <li>
              <a href="">About Us</a>
            </li>
          </ul>
        </nav>
        <p className="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </p>
        <div className="content">
          <div className="cart">
            <a href="">
              <i className="fa-solid fa-cart-shopping"></i>
            </a>
          </div>
          <div className="user">
            <a href="" className="ico">
              <i className="fa-solid fa-user"></i>
            </a>
            <div className="user-dropdown">
              <button onClick={() => navigate(`/${paths.login}`)}>Login</button>
              <a href="">Sign up</a>
            </div>
          </div>
        </div>
      </div>
      <div className="search-blk inner">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </div>
        <ul className="cat-blk">
          <li className="cat-ico">
            <button>All</button>
          </li>
          {categories.map((category) => {
            return (
              <li className="cat-ico">
                <button>{category}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;

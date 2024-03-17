import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import config from "../config/config";
import { paths } from "../routes/path";

const Home = () => {
  const [productsData, setProductsData] = useState({
    products: [
      {
        id: 1,
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        images: [
          "https://cdn.dummyjson.com/product-images/1/1.jpg",
          "https://cdn.dummyjson.com/product-images/1/2.jpg",
          "https://cdn.dummyjson.com/product-images/1/3.jpg",
          "https://cdn.dummyjson.com/product-images/1/4.jpg",
          "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        ],
      },
      {
        id: 2,
        title: "iPhone X",
        description:
          "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        price: 899,
        discountPercentage: 17.94,
        rating: 4.44,
        stock: 34,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
        images: [
          "https://cdn.dummyjson.com/product-images/2/1.jpg",
          "https://cdn.dummyjson.com/product-images/2/2.jpg",
          "https://cdn.dummyjson.com/product-images/2/3.jpg",
          "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
        ],
      },
    ],
    total: 2,
    skip: 0,
    limit: 2,
  });

  useEffect(() => {
    fetch(`${config.baseUrl}products`)
      .then((response) => response.json())
      .then((json) => setProductsData(json))
      .catch((error) => console.error(error));
  }, []);

  const [categories, setCategories] = useState([
    "smartphones",
    "laptops"
  ]);

  useEffect(() => {
    fetch(`${config.baseUrl}products/categories`)
      .then((response) => response.json())
      .then((json) => setCategories(json))
      .catch((error) => console.error(error));
  }, []);

  const [currentCategory, setCurrentCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [keywords, setKeywords] = useState("");

  const searchProduct = (keywords) => {
    console.log("keywords");
    console.log(keywords);

    const nwProductData = productsData.products.filter(
      (item) => item.title.includes(keywords) || item.description.includes(keywords)
    );
    setProductsData({
      products: nwProductData,
      total: 100,
      skip: 0,
      limit: 25,
    });
  };

  const filterProduct = (category) => {
    setCurrentCategory(category);
    console.log("category");
    console.log(category);

    const newProductData = productsData.products.filter(
      (item) => item.category == category
    );
    setProductsData({
      products: newProductData,
      total: 100,
      skip: 0,
      limit: 25,
    });
  };

  const checkLogin = () => {
    return <Navigate to="/login" />;
  };

  return (
    <div>
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
                <button onClick={() => Navigate(`/${paths.login}`)}>
                  Login
                </button>
                <a href="">Sign up</a>
              </div>
            </div>
          </div>
        </div>
        <div className="search-blk inner">
          <div className="search">
            <input type="text" placeholder="Search..." onChange={(e) => searchProduct(e.target.value)}/>
            <button >Search</button>
          </div>
          <ul className="cat-blk">
            <li className="cat-ico">
              <button>All</button>
            </li>
            {categories.map((category) => {
              return (
                <li className="cat-ico">
                  <button onClick={() => filterProduct(category)}>
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      <div id="home">
        <div className="sec-mv">
          <div className="multi-slide">
            <div className="slide-item">
              <img src="/images/slider/img_slide01.jpg" alt="" />
            </div>
            {/* <div className="slide-item">
          <img src="./images/slider/img_slide02.jpg" alt="" />
        </div>
        <div className="slide-item">
          <img src="./images/slider/img_slide03.jpg" alt="" />
        </div> */}
          </div>
        </div>
        <section className="sec-product">
          <div className="inner">
            <h2 className="main-ttl">Product Items</h2>
            <ul className="product-list">
              {productsData?.products.map((product) => {
                return (
                  <li className="item" key={product.id}>
                    <Link
                      to={`/products/${product.id}`}
                      className="product-item"
                    >
                      <div className="product-img">
                        <img src={product.images[0]} alt={product.title} />
                      </div>
                      <p className="cat display-sp">
                        <span>{product.category}</span>
                      </p>
                      <div className="content">
                        <p className="cat display-pc">
                          <span>{product.category}</span>
                        </p>
                        <h3 className="list-ttl">{product.title}</h3>
                        <p className="des">{product.description}</p>
                        <p className="discount">
                          {product.discountPercentage}%
                        </p>
                        <div className="price">${product.price}</div>
                      </div>
                    </Link>
                      <button type="submit" className="add-btn"
                        onClick={checkLogin}
                      >
                        Add to cart
                      </button>
                  </li>
                );
              })}
            </ul>
            <div id="pagination"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import Loading from "../assets/loading.json";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import NoDataUi from "../components/NoDataUi";
import { Button, Modal } from "flowbite-react";
import useBanUser from "../hooks/useBanUser";
import useDeleteUser from "../hooks/useDeleteUser";
import useApproveUser from "../hooks/useApproveUser";
import config from "../config/config";
import { useEffect, useState } from "react";
import moment from "moment";
import useGetUserTitle from "../hooks/useGetUserTitle";
import SmartCardPreview from "../components/SmartCardPreview";
import { IoTrashBin } from "react-icons/io5";
import { FaUserAltSlash } from "react-icons/fa";
import { paths } from "../routes/path";
import { useSelector } from "react-redux";
import PageNotFound from "./PageNotFound";
import useGetBloodTypes from "./../hooks/useGetBloodTypes";
import useGetUserType from "../hooks/useGetUserType";


// const fetchProductDetail = async (id) => {
//   const response = await axiosInstance.get(`${config.baseUrl}/products/${id}`);
//   return response.data;
// };

const ProductDetail = () => {
  // get id from url
  const { id } = useParams();

  const [product, setProduct] = useState(
    {
      "id": 2,
      "title": "iPhone X",
      "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      "price": 899,
      "discountPercentage": 17.94,
      "rating": 4.44,
      "stock": 34,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      "images": [
          "https://cdn.dummyjson.com/product-images/2/1.jpg",
          "https://cdn.dummyjson.com/product-images/2/2.jpg",
          "https://cdn.dummyjson.com/product-images/2/3.jpg",
          "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
      ]
  }
  );

  console.log("id");
  console.log(product);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <div>
        <img src={product.images[0]} alt="" />
      </div>
    </div>
  );
};

export default ProductDetail;

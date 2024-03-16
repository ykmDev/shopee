/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";


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

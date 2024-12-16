import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addTocart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  const fetchData = async () => {
    const foundProduct = products.find((product) => product._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId, products]);

  return productData ? (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10">
      <div className="w-[90%] max-w-6xl bg-white shadow-lg rounded-lg p-8 sm:p-12 flex flex-col sm:flex-row gap-12">
        {/* Product images */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-4 overflow-x-auto sm:overflow-y-auto sm:flex-col">
            {productData.image.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                key={index}
                className={`cursor-pointer rounded-lg border-2 ${
                  image === img ? 'border-blue-500' : 'border-transparent'
                } hover:border-blue-500 transition-all w-24 sm:w-full`}
                src={img}
                alt="product"
              />
            ))}
          </div>
          {/* <div className="w-full h-[300px] sm:h-auto">
            <img
              src={image}
              className="w-full h-full object-cover rounded-lg shadow-md"
              alt="Selected product"
            />
          </div> */}
        </div>

        {/* Product info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-gray-800">{productData.name}</h1>
          <div className="flex items-center gap-2 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-5"
              />
            ))}
            <span className="text-gray-600 text-sm">(122 reviews)</span>
          </div>
          <p className="text-3xl font-semibold text-blue-600">{currency}{productData.price}</p>
          <p className="text-gray-600 leading-relaxed">{productData.description}</p>
          <button
            onClick={() => addTocart(productData._id)}
            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Add to Cart
          </button>

          <hr className="border-gray-300" />

          <div className="text-sm text-gray-600">
            <p>✔️ 100% Original product</p>
            <p>✔️ Cash on delivery available</p>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="w-[90%] max-w-6xl mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Related Products</h2>
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  );
};

export default Product;

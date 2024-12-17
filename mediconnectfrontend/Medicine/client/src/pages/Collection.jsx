import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import bgImage from "./pharr.jpg";

const Collection = () => {
  const { products, search, shoeSearch } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [Category, setCategory] = React.useState([]);
  const [Type, setType] = React.useState([]);
  const [sort, setSort] = React.useState('relavent');

  const toggleCategory = (value) => {
    if (Category.includes(value)) {
      setCategory(Category.filter((item) => item !== value));
    } else {
      setCategory([...Category, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (shoeSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (Category.length > 0) {
      productsCopy = productsCopy.filter((item) => Category.includes(item.category));
    }

    if (Type.length > 0) {
      productsCopy = productsCopy.filter((item) => Type.includes(item.subCategory));
    }

    setFilteredProducts(productsCopy);
  };

  const sortProduct = () => {
    let filteredProductsCopy = filteredProducts.slice();
    switch (sort) {
      case 'low-high':
        setFilteredProducts(filteredProductsCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilteredProducts(filteredProductsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [Category, Type, search, shoeSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div
        className="relative bg-blue-500 py-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          height: '300px',
        }}
      ></div>

      {/* Categories Section */}
      <div className="bg-white py-4 px-6 shadow-md">
        <div className="flex justify-center gap-6 overflow-x-auto">
          {['Antibiotic', 'Analgesic', 'Antacid'].map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                Category.includes(category)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row gap-8 py-10 px-6">
        {/* Products Section */}
        <div className="flex-1">
          {/* Title and Sorting */}
          <div className="flex justify-between items-center mb-6">
            <Title
              text1={"Trending "}
              text2={"Products"}
              className="text-gray-800 font-bold text-2xl"
            />
            <select
              id="input"
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-lg text-sm px-3 py-2 bg-white shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition"
            >
              <option value="relavent">Sort by Relevant</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                className="hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden bg-white border border-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;

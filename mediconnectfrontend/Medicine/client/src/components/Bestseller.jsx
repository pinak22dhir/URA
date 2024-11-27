import React, { useContext  } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const Bestseller = () => {

    const {products} = useContext(ShopContext);
    const [Bestseller,setBestseller] = React.useState([]);
    React.useEffect(() =>{
        const best = products.filter((item) =>(item.bestseller));
        setBestseller(best.slice(0,5));
    },[products]);
  return (
    <div className="my-12">
    {/* Title Section */}
    <div className="text-center text-3xl py-8">
      <Title
        text1={"Our "}
        text2={"Bestsellers"}
        className="text-4xl font-extrabold text-gray-800"
      />
      <p className="w-11/12 sm:w-3/4 lg:w-1/2 mx-auto text-sm sm:text-base md:text-lg text-gray-600 mt-4 leading-relaxed">
        Explore our bestselling products that customers can’t stop raving about!
      </p>
    </div>
  
    {/* Product Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10 px-4 sm:px-8 md:px-16">
      {Bestseller.map((item, index) => {
        return (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            className="hover:shadow-xl transition-shadow duration-300 rounded-md overflow-hidden bg-white border border-gray-200"
          />
        );
      })}
    </div>
  </div>
  
  )
}

export default Bestseller

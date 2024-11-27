import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products,search,shoeSearch} = useContext(ShopContext);
  const [showFilter,setShowFilter] = React.useState(false);
  const [filteredProducts,setFilteredProducts] = React.useState([]);
  const [Category,setCategory] = React.useState([]);
  const [Type,setType] = React.useState([]);
  const [sort,setSort] = React.useState('relavent');

  const toggleCategory = (e) =>{
    if(Category.includes(e.target.value)){
      setCategory(Category.filter((item) => item !== e.target.value));
    }
    else{
      setCategory([...Category,e.target.value]);
    }
  }

  const toggleType = (e) =>{
    if(Type.includes(e.target.value)){
      setType(Type.filter((item) => item !== e.target.value));
    }
    else{
      setType([...Type,e.target.value]);
    }
  }

  const applyFilter = () =>{
    let productsCopy = products.slice();

     if(shoeSearch&& search){
      productsCopy = productsCopy.filter((item ) => item.name.toLowerCase().includes(search.toLowerCase()));

     }
    if(Category.length > 0){
      productsCopy = productsCopy.filter((item) => Category.includes(item.category));
    }

    setFilteredProducts(productsCopy);

   if (Type.length > 0) {
    productsCopy = productsCopy.filter((item) => Type.includes(item.subCategory));
}
  setFilteredProducts(productsCopy) // Assuming you want to update a state variable called products


}


const sortProduct = (e) =>{
  let filteredProductsCopy = filteredProducts.slice();
 switch(sort){
    case 'low-high':
     setFilteredProducts(filteredProductsCopy.sort((a,b) => a.price - b.price));
      break;
    case 'high-low':
      setFilteredProducts(filteredProductsCopy.sort((a,b) => b.price - a.price));
      break;
    default:
      applyFilter();
      break;

 }
 
}


  useEffect(() =>{
    applyFilter();
  },[Category,Type,search,shoeSearch,products]);

  useEffect(() =>{
    sortProduct();
  },[sort]);

  
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 py-10 px-4 border rounded-lg bg-gray-50 shadow-sm">
    {/* FILTERS */}
    <div className="min-w-60">
      <p
        onClick={() => setShowFilter(!showFilter)}
        className="mb-4 text-xl font-semibold flex items-center cursor-pointer gap-2 text-gray-800 hover:text-blue-600 transition-colors"
      >
        FILTERS
        <img
          src={assets.dropdown_icon}
          className={`h-4 sm:hidden transform ${
            showFilter ? "rotate-90" : ""
          } transition-transform`}
          alt="Toggle"
        />
      </p>
  
      {/* Filters Section */}
      <div
        className={`border border-gray-300 rounded-md bg-white shadow-sm px-4 py-5 mt-2 ${
          showFilter ? "" : "hidden"
        } sm:block`}
      >
        <p className="mb-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
          CATEGORIES
        </p>
        <div className="flex flex-col gap-4 text-sm font-light text-gray-700">
          <label className="flex items-center gap-2">
            <input
              className="form-checkbox w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
              type="checkbox"
              value="Antibiotic"
              onChange={toggleCategory}
            />
            <span className="hover:text-blue-500 transition-colors">
              Antibiotic
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              className="form-checkbox w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
              type="checkbox"
              value="Analgesic"
              onChange={toggleCategory}
            />
            <span className="hover:text-blue-500 transition-colors">
              Analgesic
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              className="form-checkbox w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
              type="checkbox"
              value="Antacid"
              onChange={toggleCategory}
            />
            <span className="hover:text-blue-500 transition-colors">
              Antacid
            </span>
          </label>
        </div>
      </div>
    </div>
  
    {/* PRODUCTS */}
    <div className="flex-1">
      {/* Title and Sorting */}
      <div className="flex justify-between items-center mb-6">
        <Title
          text1={"ALL "}
          text2={"Collection"}
          className="text-gray-800 font-bold"
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
  
  )
}

export default Collection

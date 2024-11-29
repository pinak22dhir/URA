import React from 'react'
import {assets} from "../assets/frontend_assets/assets"

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center gap-8 sm:gap-4 py-20 px-4 sm:px-8 md:px-16 bg-gray-50">
    {/* Policy 1 */}
    <div className="flex flex-col items-center text-center max-w-xs">
      <img
        src={assets.exchange_icon}
        className="w-16 h-16 mb-4 transition-transform transform hover:scale-110"
        alt="Easy Exchange Icon"
      />
      <p className="font-semibold text-lg text-gray-800">Easy Exchange Policy</p>
      <p className="text-gray-500 mt-2">
        We offer hassle-free exchange policies to ensure your satisfaction.
      </p>
    </div>
  
    {/* Policy 2 */}
    <div className="flex flex-col items-center text-center max-w-xs">
      <img
        src={assets.quality_icon}
        className="w-16 h-16 mb-4 transition-transform transform hover:scale-110"
        alt="Return Policy Icon"
      />
      <p className="font-semibold text-lg text-gray-800">7 Days Return Policy</p>
      <p className="text-gray-500 mt-2">
        Hassle-free returns within 7 days for a worry-free shopping experience.
      </p>
    </div>
  
    {/* Policy 3 */}
    <div className="flex flex-col items-center text-center max-w-xs">
      <img
        src={assets.support_img}
        className="w-16 h-16 mb-4 transition-transform transform hover:scale-110"
        alt="Customer Support Icon"
      />
      <p className="font-semibold text-lg text-gray-800">Best Customer Support</p>
      <p className="text-gray-500 mt-2">
        Round-the-clock support to assist you whenever you need.
      </p>
    </div>
  </div>
  
  )
}

export default OurPolicy

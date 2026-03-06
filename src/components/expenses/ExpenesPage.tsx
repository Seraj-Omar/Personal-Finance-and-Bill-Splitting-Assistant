import React from 'react'
import FinancialOverview from './FinancialOverview'
import Categories from './Categories'

const ExpenesPage = () => {
  return (
    <div>
      {/* Section full width background */}
      <div className="bg-[#F6F6F7B2]">
        <div className="px-4 sm:px-6 lg:px-10">
          <FinancialOverview />
        </div>
      </div>

      {/* Same container width */}
      <div className="bg-white">
        <div className="px-4 sm:px-6 lg:px-10">
          <Categories />
        </div>
      </div>
    </div>
  )
}

export default ExpenesPage
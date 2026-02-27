import React from 'react'
import FinancialOverview from './FinancialOverview'
import Categories from './Categories'

const ExpenesPage = () => {
  return (
  <div className='bg-[#F9F9FA]'>
<div className="px-4 sm:px-6 lg:px-10">
 <FinancialOverview />

  <div className='bg-white'>  <Categories /> </div>

  </div>
 
    </div>
  )
}

export default ExpenesPage
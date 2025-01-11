import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import CarouselWrapper from './CarouselWrapper'
import MarketContent from './MarketContent'


function MarketPlace() {
  return (
    <div>
        <Header/>
        <CarouselWrapper/>
        <MarketContent/>
        <Footer/>
    </div>
  )
}

export default MarketPlace
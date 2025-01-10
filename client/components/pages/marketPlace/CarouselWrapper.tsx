import React from 'react'
import CarouselContent from './CarouselContent'
import { carouselNft } from '@/data'

function CarouselWrapper() {
  return (
    <div className='w-full'>
         <CarouselContent carousel={carouselNft}/>
    </div>
  )
}

export default CarouselWrapper
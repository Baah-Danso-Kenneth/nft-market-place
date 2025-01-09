import React from 'react'
import AboutComponent from './AboutComponent'
import Image from 'next/image'


function AboutUs() {
  return (
        <div className='md:py-20 md:mx-20'>
            <div className='flex justify-center lg:text-[6rem] font-nunito uppercase mb-10'>
                <h1> <span className='font-allura'>(</span>About Us <span className='font-allura'>)</span></h1>
            </div>
            <div className='flex flex-col space-y-10 lg:flex-row justify-between lg:gap-20'>
             <AboutComponent text=">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, delectus tempore. Suscipit eius a quasi velit harum! Esse necessitatibus sint eius? Non minima sunt porro, fuga incidunt hic accusamus dolor!"/>
             <Image src="/images/brand_logo.png" width={400} height={400} alt="good" className='object-cover'/>
             <AboutComponent text=">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, delectus tempore. Suscipit eius a quasi velit harum! Esse necessitatibus sint eius? Non minima sunt porro, fuga incidunt hic accusamus dolor!"/>
            </div>
        </div>
  )
}

export default AboutUs
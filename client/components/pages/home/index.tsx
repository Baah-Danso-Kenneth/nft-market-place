import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import Banner from './Banner'
import HugeText from './HugeText'
import BePartOfUs from './BepartOfUs'
import OurCollection from './OurCollection'

function HomePage() {
  return (
    <div>
        <Header/>
       <Banner/>
       <HugeText/>
       <BePartOfUs/>
       <OurCollection/>
        <Footer/> 
        </div>
  )
}

export default HomePage
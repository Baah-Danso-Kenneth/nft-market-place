import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import Banner from './Banner'
import HugeText from './HugeText'
import BePartOfUs from './BepartOfUs'
import OurCollection from './OurCollection'
import RotationContent from '@/components/Rotation'
import pic from '../../../public/images/base2_nft.png';
import { Pickaxe } from 'lucide-react'
import MoveUp from './MoveUp'
import AboutUs from './AboutUs'

function HomePage() {
  return (
    <div>
        <Header/>
       <Banner/>
       <HugeText/>
       <AboutUs/>
       <BePartOfUs/>
       <OurCollection/>
       <MoveUp/>
        <Footer/> 
        </div>
  )
}

export default HomePage
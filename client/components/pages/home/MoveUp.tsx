"use client"

import Image from 'next/image';
import ArrowUpImage from '../../../public/images/move_up.png';




const MoveUp=() => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='absolute lg:translate-x-[80rem] lg:-translate-y-36 xl:translate-x-[70rem]'>
      <div onClick={scrollToTop} className='cursor-pointer'> 
        
        <Image 
          src={ArrowUpImage}
          width={250} 
          height={250} 
          alt="arrow"
          objectFit='cover'
        />
      </div>
    </div>
  );
}

export default MoveUp;

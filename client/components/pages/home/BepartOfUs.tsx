import Image from "next/image"

function BePartOfUs() {
  return (
    <div className='grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 md:text-[6rem] mr-20 md:py-10'>

        <div className='w-[100vw] mt-5 mb-10 md:w-full border-t md:h-[70%] uppercase  border-black dark:border-white'>
            <div className='flex  font-nunito border-b border-black dark:border-white'>
              <div className='ml-10 w-full text-center  border-r border-black dark:border-white'>
                <h1>Be part</h1>
              </div>
            </div>

            <div className='flex font-allura'>
              <div className='w-[30%] ml-10 border-r border-black dark:border-white'><h1>of</h1></div>
              <div className='ml-10 w-full border-r border-black dark:border-white'><h1>the</h1></div>
            </div>
            <div className=' border-t border-b border-r text-center border-black dark:border-white'>journey</div>
        </div>
      
       <div className='relative '>

       <div className="relative translate-x-[3rem] w-full flex justify-center h-[350px] md:w-[500px] md:h-[500px]">
         <Image  
          src="/images/ftsss.jpeg" 
          alt="img" 
         fill 
        className=" object-contain md:object-cover "
        />
      </div>

     
       <div className='absolute top-[-1rem] md:top-[-30] flex mb-20 '>
         <div className='hidden lg:translate-x-28 md:translate-x-4'>
         <Image src="/images/save-instagram.png" 
         alt="img"
         className="w-5"
          width={50}
           height={50} />
         </div>

         <div className='hidden   lg:translate-x-72 md:translate-x-96'>
         <Image src="/images/save-instagram.png" alt="img"
          width={50} 
          className="w-5"
          height={50} />
         </div>
       </div>
       </div>

      </div>
  )
}

export default BePartOfUs
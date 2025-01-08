import Image from "next/image"

function HugeText() {
  return (
    <div className=' text-[0.8rem] flex flex-col w-full border-t border-b border-black  dark:border-white md:text-[3rem] lg:text-[4.5rem] '>
       <div className='grid grid-cols-3 border-b border-black dark:border-white'>
         <div className='font-nunito uppercase font-bold pl-10'>
           <h1>faces</h1>
          </div> 

          <div className='border-l border-black pl-5 dark:border-white'>
           <h1 className='font-allura uppercase'>that</h1>
          </div> 

          <div className='border-l  border-black dark:border-white'>
           <h1 className='font-bold font-nunito uppercase pl-10'>paint</h1>
          </div> 
       </div>

       <div className='flex flex-row '>
         <div className='flex-shrink-0 w-50 border-r border-black dark:border-white'>
          <h1 className=' text-center uppercase font-allura px-10 '>a</h1>
         </div>

         <div className='border-r border-black dark:border-white flex-grow'>
          <h1 className='pl-10 font-nunito uppercase font-bold'>thousand</h1>
         </div>

         <div className='flex-grow'>
          <h1 className='font-allura  uppercase pl-10' >words!</h1>
         </div>
       </div>
    </div>
  )
}

export default HugeText
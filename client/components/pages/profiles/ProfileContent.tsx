import { ArrowUpToLine, Dot, Ellipsis, Pen, Settings, User, Wallet } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function ProfileContent() {
  return (
    <div>
        <div className='w-full h-[50vh] relative   border-black shadow-lg'>
          <Image
           src="/images/carbon-fibre-big.png"
           alt="clean"
           width={1030}
           height={930}
           className='w-full h-[50vh] object-cover object-top'
          />
          
           <div className='absolute top-[5rem] flex gap-[55rem] left-10'>

              <div className='flex gap-5'>
                
                <div>
                <Image src="/images/base2_nft.png"
                 alt="pronto"
                width={1030}
                height={500}
                className='w-40 h-40 rounded-2xl border border-black dark:border-white object-cover'
              />
            </div>


                <div className='space-y-8'>
              <div className='flex gap-5 '>
                <div className='flex px-3 rounded-md uppercase bg-white py-1 w-20 dark:bg-black dark:border'>
                  <Pen className='mr-2'/>
                  <h1>Art</h1>
                </div>

                <div className='flex bg-green-100 px-2  rounded-xl items-center'>
                  <Dot className='text-green-400 space-x-4  font-extrabold'/>
                  <h1 className='text-green-400 font-nunito text-[12px] uppercase font-bold py-1'>public minting</h1>
                </div>
              </div>

              <div><h1 className='text-3xl font-nunito font-bold dark:text-white'>Protection</h1></div>

              <div className='flex items-center gap-5 text-white'>
           
                <div className='flex space-x-2 text-black dark:text-white'>
                  <User/>
                  <h1 className='font-bold font-nunito text-nowrap'>Kuntu blankson</h1>
                </div>
                
                <div className='flex space-x-2 dark:text-white'>
                  <Wallet className='text-black dark:text-white'/>
                  <h1 className='text-black dark:text-white'>0xfff08000.......</h1>
                </div>

                </div>

            </div> 

              </div>

              <div className='flex space-x-3 dark:text-white '>
                <ArrowUpToLine className=''/>
                <Ellipsis/>
              </div>

            </div>

          </div>
    </div>
  )
}

export default ProfileContent
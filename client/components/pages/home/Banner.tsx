import Image from "next/image"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"



function Banner() {
  return (
    <div className='relative  mx-10 md:mx-0'>
        <div className='flex justify-center '>
            <h1 className='text-[5rem] font-nunito md:text-center  md:text-[12rem] lg:text-[18rem]  font-extrabold uppercase text-center'>sticky</h1>
        </div>
        
        <div className='relative'>
            <div className="md:w-screen   md:h-screen ">
              <Image 
               src="/images/base_nft.png" 
                alt="hulio" 
                width={1080}
                height={920}
                className="mt-[-5rem] md:w-screen md:h-screen  object-contain md:mt-[-13rem] lg:mt-[-18rem]"
              />
            </div>

            <div className="absolute top-0 right-10  translate-x-[2rem] translate-y-[-1rem] md:translate-x-3  lg:translate-x-[-17rem] md:translate-y-[-1rem]">
              <Image src="/images/sticky_sticker.png"  className="object-cover w-16  rotate-45  md:w-52   md:transform md:rotate-45" width={250} height={100} alt="hulio"/>
          </div>

          {/* <div className="hidden lg:block w-[20%] absolute top-[20rem] ml-10">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Distinctio consequuntur laudantium atque ducimus 
                 blanditiis, consectetur aliquid asperiores excepturi repellat nisi?</p>
          </div>
            
          <div className="hidden lg:block w-[20%] absolute top-[38rem] left-[60rem] ml-10">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Distinctio consequuntur laudantium atque ducimus 
                 blanditiis, consectetur aliquid asperiores excepturi repellat nisi?</p>
          </div> */}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <Link href="/sellNFT" className="absolute -left-20 top-[5rem] lg:top-[27rem] xl:top-[10rem]">
            <Image src="/images/buy_nft.png" alt="logox" className=" object-contain w-40 h-40 lg:w-96 lg:h-96" width={1080} height={200}/>
          </Link>
          <TooltipContent>
             <h1>Create Nft</h1>
          </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
 

        </div>

    </div>
  )
}

export default Banner
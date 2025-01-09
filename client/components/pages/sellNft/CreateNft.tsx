"use client"
import { CloudUpload, Plus } from 'lucide-react'
import {z} from "zod"
import React,{useState} from 'react'
import NftForm from './NftForm'



const formSchema = z.object({
    name: z.string().min(5,{
        message: "Art name must be more than 2 characters"
    }),
    description: z.string().min(20,{
        message: "Provide a detail description about the art"
    }),
    price: z.number().min(3,{
        message: "Enter price for nft"
    })
})

function CreateNft() {
    const [files, setFiles] = useState(null)


    function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values)
    }

    const handleDragOver=(event: { preventDefault: () => void })=>{
        event.preventDefault()
    }

    const handleDrop=(event: {preventDefault:()=>void})=>{
        event.preventDefault();
    }

  return (
    <div className='grid mx-5 lg:grid-cols-2 md:mx-10 my-20 gap-20'>
        <div>
            <div className='font-nunito mb-5'>
            <h1 className='font-bold text-[18px] md:text-3xl mb-2'>Create an Nft</h1>
            <p className=' text-[13px] md:text-[18px]'>Once your item is minted you will not be able to change its</p>
            </div>

                <div className=' h-[30vh] md:h-[50vh] border border-dashed border-blue-800 rounded-2xl'>

                    <div className='flex mt-[10%] items-center justify-center flex-col md:mt-[20%] space-y-3 font-nunito'>
                        <CloudUpload className='w-52 h-10 '/>
                        <h1 className='text-[20px]'>Drag and drop media</h1>
                        <p className='text-blue-600 font-bold'>Browse files</p>
                    </div>
                  </div>


        </div>

        <div>
            <div>
                <h1 className='font-extrabold mb-3'>Create*</h1>
            </div>
            <div className='flex p-2  items-center rounded-md w-full md:text-3xl md:py-8 font-nunito border border-black dark:border-white dark:bg-slate-800 space-x-3 md:rounded-2xl md:p-5  mb-5'>
                    <Plus className='dark:bg-black bg-white w-10  rounded-md h-10 p-2 ml-5 m-b'/>
                <div>
                    <h1 className='text-nowrap'>Create a new collection</h1>
                </div>
            </div>

            <div>
                <NftForm/>
            </div>


        </div>
    </div>
  )
}

export default CreateNft
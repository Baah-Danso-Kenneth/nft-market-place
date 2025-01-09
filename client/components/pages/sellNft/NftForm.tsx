"use client"
import React from 'react'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod";
import { Form, 
     FormControl,
     FormDescription,
     FormField,
      FormItem,
       FormLabel,
       FormMessage,
 } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';



 const formSchema = z.object({
    name: z.string().min(4,{
        message: "Artifacts name be meaningful"
    }),
    description: z.string().min(20,{
        message: "Please provide detail information about the art"
    }),
    price: z.number().min(4,{
        message: "Enter the price of the Art"
    }),
 })

function NftForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values)
    }

  return (
    <Form {...form}>
        <form className='space-y-5'>
            <FormField
             control={form.control}
             name="name"
             render={({field})=>(
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input className='border-black dark:border-white' placeholder="Name" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}
            />

        <FormField
             control={form.control}
             name="price"
             render={({field})=>(
                <FormItem>
                    <FormLabel>How much?</FormLabel>
                    <FormControl>
                        <Input className='border-black dark:border-white' placeholder="Price" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}
            />

            <FormField
             control={form.control}
             name="description"
             render={({field})=>(
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea 
                        placeholder="Provide a little bit of information on the arts"
                        className='h-20 border-black dark:border-white'
                         {...field}/>

                    </FormControl>
 
                    <FormMessage/>
                </FormItem>
             )}
            />
        </form>
    </Form>
  )
}

export default NftForm
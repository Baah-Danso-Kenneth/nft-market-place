"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Plus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Artifacts name must be meaningful",
  }),
  description: z.string().min(20, {
    message: "Please provide detailed information about the art",
  }),
  price: z.number().min(4, {
    message: "Enter the price of the Art",
  }),
});

function NftForm({
  formParams,
  updateFormParams,
  onFileChange,
  message,
  btn,
  btnContent,
  onSubmit,
}: {
  formParams: any;
  updateFormParams: any;
  onFileChange: any;
  message: string;
  btn: boolean;
  btnContent: string;
  onSubmit: (values: any) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formParams,
  });

  return (
    <div>
      <div className="grid mx-5 lg:grid-cols-2 md:mx-10 my-20 gap-20">

      <div >
            <div className='font-nunito mb-5'>
            <h1 className='font-bold text-[18px] md:text-3xl mb-2'>Create an Nft</h1>
            <p className=' text-[13px] md:text-[18px]'>Once your item is minted you will not be able to change its</p>
            </div>

                <div className=' h-[30vh] md:h-[50vh] border border-dashed border-blue-800 rounded-2xl'>

                    <div className='flex mt-[10%] items-center justify-center flex-col md:mt-[20%] space-y-3 font-nunito'>
                        <CloudUpload className='w-52 h-10 '/>
                        <h1 className='text-[20px]'>Drag and drop media</h1>

                    </div>
                    
        <div className="flex flex-col gap-20 justify-center items-center mt-3  font-nunito">
          <input
            type="file"
            onChange={onFileChange}
            className="block"
          />
          <div>{message}</div>
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
      <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="border-black dark:border-white"
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How much?</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="border-black dark:border-white"
                  placeholder="Price"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide information on the art"
                  className="h-20 border-black dark:border-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={!btn}
          className={`w-full p-2 ${btn ? "bg-blue-600" : "bg-gray-400"} text-white rounded-md`}
        >
          {btnContent === "Processing..." && (
            <span className="spinner" />
          )}
          {btnContent}
        </button>
      </form>
    </Form>
      </div>

      </div>
    </div>

  );
}

export default NftForm;

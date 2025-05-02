import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem } from '../../../molecules/shadcn/form'
import { Button } from '../../../atoms/shadcn/button'
import { useRouter } from 'next/navigation';
import { useToast } from '../../../../hooks/use-toast';
import { ConnectionCardFormProps } from '@repo/ts-types/home/v1';
import {useSession} from "@repo/auth/better-auth/auth-client";
import { createConnectionAction } from '@repo/server-utils/connections';
import { FloatingLabelInput } from '../../../molecules/shadcn/floating-label-input';

const AddConnectionsModal = ({type,formElements,setIsDialogOpen}:{
    type:string,formElements:ConnectionCardFormProps[],setIsDialogOpen:any}) => {
  const form = useForm()
  const router = useRouter();
  const {toast} = useToast();
  const {data:session} = useSession();

  const onSubmit = async (data:any) => {
    setIsDialogOpen(false)
    const res = await createConnectionAction({
        name: "New " + type + " Connection",
        userId:session?.user?.id as string,
        type, 
        details:data
    })
    if (res.success){
        toast({title: "Success", description: res?.success, variant: 'default'})
        router.refresh()
    }
    else if (res.error){
        toast({title: "Error", description: res?.error, variant: 'destructive'})
    }
    window.location.reload()
  }

  return (  
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4 mb-4'>
            {formElements.map((element)=>(
              <FormField key={element.name} control={form.control} name={element.name} render={({field})=>(
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput id={element.name} label={element.label} {...field}/>
                  </FormControl>
                </FormItem>
              )}/>
            ))}
          </div>
          <Button size="lg" variant="default" type="submit" > Save</Button>
        </form>
      </FormProvider> 
)
}

export default AddConnectionsModal
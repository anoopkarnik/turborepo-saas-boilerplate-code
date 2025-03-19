"use client"

import { Button } from '@repo/ui/atoms/shadcn/button'
import { Dialog, DialogContent, DialogTrigger } from '@repo/ui/molecules/shadcn/dialog'
import { CoinsIcon, MapPinIcon } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import CustomDialogHeader from '@repo/ui/molecules/custom/v1/CustomDialogHeader'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import  {Form, FormField, FormItem, FormMessage, FormControl, FormLabel} from '@repo/ui/molecules/shadcn/form'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@repo/ui/hooks/use-toast'
import {Loader2} from 'lucide-react'
import { billingAddressSchemaType, billingAddressSchema } from '@repo/zod/billing'
import { CountryCode } from 'dodopayments/resources/misc/supported-countries.mjs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/select'
import { getCountryCodes } from '../../../../actions/payments/dodo'
import { AddUserAddress, GetUserAddress } from '../../../../actions/payments/billing'

const AddAddressDialog = () => {

    const [countryCodes, setCountryCodes] = useState<CountryCode[]>([])
    const [open, setOpen] = useState(false)
    const [existingAddress, setExistingAddress] = useState<billingAddressSchemaType | null>(null)


    const {toast} = useToast()

    useEffect(()=>{
      const getCountries = async () => {
        const response = await getCountryCodes()
        setCountryCodes(response.sort((a,b)=>a.localeCompare(b)))
      }
      getCountries()
    },[])

    const form = useForm<billingAddressSchemaType>({
      resolver: zodResolver(billingAddressSchema),
      defaultValues: existingAddress || {}
    })

    useEffect(() => {
      if (open) {
          const fetchAddress = async () => {
              const response = await GetUserAddress()
              if (response) {
                  setExistingAddress(response)
                  form.reset(response) // Populate form with existing values
              }
          }
          fetchAddress()
      }
    }, [open,form])
    



    const {mutate, isPending} = useMutation({
      mutationFn: AddUserAddress,
      onSuccess: ()=>{
        toast({title: "Success", description: "Address Added", variant: 'default'})
        setOpen(false);
      },
      onError: (error)=>{toast({title: "Error", description: error.message || "Failed to add address", variant: 'destructive'})},
    })

    const onSubmit = useCallback((values:billingAddressSchemaType)=>{
      toast({title: "Adding Billing Address....", description: "Please wait", variant: 'default'})
      mutate(values)
    },[mutate,toast])

  return (
    <Dialog open={open} onOpenChange={(open)=>{form.reset();setOpen(open)}}>
        <DialogTrigger asChild>
            <Button className='w-full'>
              <MapPinIcon className='mr-2 h-5 w-5'/>{"Add/Edit Billing Address"} 
            </Button>
        </DialogTrigger>
        <DialogContent className='px-0 '>
          <CustomDialogHeader
            icon={CoinsIcon}
            title='Add your billing address'
            subTitle='Add your Billing Address for you transactions'
          />
          <div className='px-6'>
            <Form {...form}>
              <form className='space-y-4 w-full overflow-y-auto' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Name
                        <p className='text-xs text-primary'>(required)</p>
                      </FormLabel>
                      <FormControl>
                        <Input className='bg-background' {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Billing Email
                        <p className='text-xs text-primary'>(required)</p>
                      </FormLabel>
                      <FormControl>
                        <Input className='bg-background' {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Street
                        <p className='text-xs text-primary'>(required)</p>
                      </FormLabel>
                      <FormControl>
                        <Input className='bg-background' {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="city"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        City
                        <p className='text-xs text-primary'>(required)</p>
                      </FormLabel>
                      <FormControl>
                        <Input className='bg-background' {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="country"
                  render={() => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Country
                        <p className='text-xs text-primary'>(required)</p>
                      </FormLabel>
                      <FormControl>
                      <Controller
                        name="country"
                        control={form.control}
                        rules={{ required: 'Country is required' }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              {
                                countryCodes.map((country)=>(
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                        )}
                      />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="state"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        State
                        <p className='text-xs text-primary'>(required)</p>
                      </FormLabel>
                      <FormControl>
                        <Input className='bg-background' {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="zipcode"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Zipcode
                        <p className='text-xs text-primary'>(required)</p>
                      </FormLabel>
                      <FormControl>
                        <Input className='bg-background' {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button type="submit" className='w-full' disabled={isPending}>
                  {!isPending && "Proceed"}
                  {isPending && <Loader2 className='animate-spin'/>}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
    </Dialog>
  )
}

export default AddAddressDialog
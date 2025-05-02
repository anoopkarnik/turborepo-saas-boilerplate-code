import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/atoms/shadcn/avatar";
import { useEffect, useRef, useState } from "react";
import { CameraIcon } from "lucide-react";
import { FloatingLabelInput } from "@repo/ui/molecules/shadcn/floating-label-input";
import { Button } from "@repo/ui/atoms/shadcn/button";
import {   Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage, } from '@repo/ui/molecules/shadcn/form';
import { useForm } from 'react-hook-form';
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

import SettingsHeading from "@repo/ui/molecules/settings/SettingsHeader/v1";
import { authClient, useSession} from "@repo/auth/better-auth/auth-client";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ResetPasswordSchema } from "../../../../utils/zod";
import {FormResult} from '../../../authflow/organisms/v1/FormResult';

  
  const MyAccountSettings = () => {

    const { pending, data:session } = useSession();
    
      const [user, setUser] = useState<any>(null)
      const [name, setName] = useState<string>(session?.user?.name as string)

    const router = useRouter();
    

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [deleteAccountConfirmation, setDeleteAccountConfirmation] = useState('');

    const title = "My Account"
    const description = "For modifying Email, you need to verify your new email address"


    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
      resolver: zodResolver(ResetPasswordSchema),
      defaultValues:{
        password: '',
      },
    })

    const [passwordError, setPasswordError] = useState<string>("")
    const [passwordSuccess, setPasswordSuccess] = useState<string>("")
    const [deleteAccountError, setDeleteAccountError] = useState<string>("")
    const {toast} = useToast();

    const handleAvatarClick = () => {
      inputFileRef.current?.click(); // Programmatically open file input
    };

    async function handleSubmit(data: z.infer<typeof ResetPasswordSchema>) {
      setPasswordError("");
      setPasswordSuccess("");
      if(session?.user?.email === process.env.NEXT_PUBLIC_GUEST_MAIL || session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_MAIL){
        setPasswordError("Guest account cannot modify password");
      }
      else if(!data.confirmPassword){
        setPasswordError("Please confirm your password");
      }
      else if (data.password !== data.confirmPassword) {
        setPasswordError("Passwords do not match");
      }
      else if(data.password){
        const {error} = await authClient.changePassword({
          newPassword: data.password,
          currentPassword: data.oldPassword,
          revokeOtherSessions: true
        })
        if (error){
          toast({title: "Error", description: error, variant: 'destructive'})
  
        }
        else {
          toast({title: "Success", description: "Successfully modified password", variant: 'default'})
        }

      }
    }

    const handleDeleteAccount = async () => {
      if(session?.user?.email === process.env.NEXT_PUBLIC_GUEST_MAIL || session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_MAIL){
        setDeleteAccountError("Guest account cannot be deleted");
        return;
      }
      if(deleteAccountConfirmation !== 'permanently delete'){
        setDeleteAccountError("Please type 'permanently delete' to confirm");
        return;
      }
      const {error} = await authClient.deleteUser({
        callbackURL: "/landing" // you can provide a callback URL to redirect after deletion
      });
      if (error){
        toast({title: "Error", description: error, variant: 'destructive'})
      }
      else{
        toast({title: "Success", description: "Successfully deleted Account", variant: 'default'})
        router.push("/landing")
      }
    }


    const handleName = async (name:string)=>{
      const {error} = await authClient.updateUser({name})
      if (error){
        toast({title: "Error", description: error, variant: 'destructive'})

      }
      else {
        toast({title: "Success", description: "Successfully modified name", variant: 'default'})
      }
    }

    const handleAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file, file.name);
  
      const response = await fetch("/api/settings/modifyAvatar", {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      const {error} = await authClient.updateUser({image: res?.url })


      if (error){
        toast({title: "Error", description: error, variant: 'destructive'})
      }
      else {
        toast({title: "Success", description: "Successfully Updated Image", variant: 'default'})
      }
    }


    return (
        <SettingsHeading title={title} description={description} >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center ">
                <div className="text-description ">Profile Pic</div>
                <div className="relative group cursor-pointer">
                  <Avatar className="h-20 w-20 rounded-full border-2 bg-secondary hover:bg-accent2">
                    <AvatarImage src={session?.user?.image?? ''} alt={session?.user?.name?? ''} className="object-cover" />
                    <AvatarFallback className="text-3xl">{session?.user?.name?session?.user?.name[0]?.toUpperCase() :'U'}</AvatarFallback>
                  </Avatar>
                  <button onClick={handleAvatarClick} className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <div><CameraIcon/></div>
                    <div className="text-xs">Upload Photo</div>
                  </button>
                </div>
                    {/* Hidden file input */}
                <input
                  ref={inputFileRef}
                  type="file"
                  className="hidden"
                  accept="image/*" // Accept only images
                  onChange={(e)=>handleAvatar(e)} // Handle file selection
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 mt-4">
              <FloatingLabelInput id="name" label="Username" className="w-full my-2" defaultValue={name} 
              onChange={(e)=>{setName(e.target.value)}}/>
              <Button onClick={()=>handleName(name as string)} className="w-1/4 text-wrap">Update Username</Button>
            </div>
            {/* <div className="flex items-center justify-between gap-4 mt-4">
              <FloatingLabelInput id="email" label="Email" className="flex-grow-1 my-2" defaultValue={email} type="email"
              onChange={(e)=>{setCurrentEmail(e.target.value)}}/>
              <Button onClick={()=>{}} className="w-1/4 text-wrap" >Verify New Email Address</Button>
            </div> */}
            <div className="text-emphasis mt-10"> Add / Change Password</div>
            <div className= "text-description pb-2 border-b-2">Add Password if not assigned for Accounts with Social Accounts or change password if already assigned</div>
            <div className="flex flex-col gap-4 mt-4 w-1/2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField control={form.control} name="oldPassword" render={({field})=>(
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput id="password" label="Current Password" type="password" className="w-full my-2"
                        {...field}/>
                      </FormControl>
                      <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="password" render={({field})=>(
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput id="password" label="Password" type="password" className="w-full my-2"
                        {...field}/>
                      </FormControl>
                      <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="confirmPassword" render={({field})=>(
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput id="password" label="Confirm Password" type="password" className="w-full my-2"
                        {...field}/>
                      </FormControl>
                      <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                    </FormItem>
                  )}/>
                   <FormResult type="error" message={passwordError }/>
                   <FormResult type="success" message={passwordSuccess}/> 
                  <Button type="submit" className="w-1/2 text-wrap my-4" >
                  Modify Password
                  </Button>
                </form>
              </Form>
            </div>
            <div className="text-emphasis mt-10"> Delete Account</div>
            <div className= "text-description pb-2 border-b-2">Once you delete your account and account data, there is no going back.</div>
            <div className="flex flex-col gap-4 mt-4 w-1/2">
              <FloatingLabelInput id="permanently delete" label="Type 'permanently delete'" type="name" className="w-full my-2"
              onChange={(e)=>{setDeleteAccountConfirmation(e.target.value)}}/>
              <FormResult type="error" message={deleteAccountError }/>
              <Button variant="destructive" onClick={handleDeleteAccount} className="w-1/2 text-wrap">Delete Account</Button>
            </div>
            <div className="text-emphasis border-b-2 pb-4 mt-10"> Account Security</div>
        </SettingsHeading>
    );
  };

  export default MyAccountSettings;
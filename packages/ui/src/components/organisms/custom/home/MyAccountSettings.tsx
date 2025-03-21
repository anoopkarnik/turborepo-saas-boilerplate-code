import { Avatar, AvatarFallback, AvatarImage } from "../../../atoms/shadcn/avatar";
import { useEffect, useRef, useState } from "react";
import { CameraIcon } from "lucide-react";
import { FloatingLabelInput } from "../../../molecules/shadcn/floating-label-input";
import { Button } from "../../../atoms/shadcn/button";
import {   Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage, } from '../../../molecules/shadcn/form';
import { useForm } from 'react-hook-form';
import { ResetPasswordSchema } from '@repo/zod/auth';
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { FormResult } from "../auth/v1/FormResult";
import SettingsHeading from "../../../molecules/custom/v1/SettingsHeading";
import {deleteAccountAction, modifyAvatarAction, modifyNameAction, modifyPasswordAction} from "@repo/server-utils/settings"
import { useSession} from "next-auth/react";
import { useToast } from "../../../../hooks/use-toast";

  
  const MyAccountSettings = () => {

    const { data:session,status,update } = useSession();
    
      const [user, setUser] = useState<any>(null)
      const [name, setName] = useState<string>(session?.user?.name as string)
    
            // Refresh session manually after login
      const refreshSession = async () => {
        const response = await fetch("/api/auth/session");
        const newSession = await response.json();
        setUser(newSession?.user || null);
      };
    
      useEffect(() => {
        const fetchUserData = async () => {
          if (status === "authenticated") {
            setUser(session?.user || null);
            if (!session?.user) return;
            
          } else if (status === "unauthenticated") {
            refreshSession();
          }
        }
        fetchUserData();
      }, [session, status]);

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [confirmPassword, setConfirmPassword] = useState('');
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
      if(user?.email === process.env.NEXT_PUBLIC_GUEST_MAIL || user?.email === process.env.NEXT_PUBLIC_ADMIN_MAIL){
        setPasswordError("Guest account cannot modify password");
        return;
      }
      if(!confirmPassword){
        setPasswordError("Please confirm your password");
        return;
      }
      if (data.password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      if(data.password){
        const res = await modifyPasswordAction(user?.id, data.password);
        setPasswordSuccess("Password updated successfully");
        if (res.success){
          toast({title: "Success", description: res?.success, variant: 'default'})
        }
        else if (res.error){
            toast({title: "Error", description: res?.error, variant: 'destructive'})
        }
      }
    }

    const handleDeleteAccount = async () => {
      if(user?.email === process.env.NEXT_PUBLIC_GUEST_MAIL || user?.email === process.env.NEXT_PUBLIC_ADMIN_MAIL){
        setDeleteAccountError("Guest account cannot be deleted");
        return;
      }
      if(deleteAccountConfirmation !== 'permanently delete'){
        setDeleteAccountError("Please type 'permanently delete' to confirm");
        return;
      }
      const res = await deleteAccountAction(user?.id)
      if (res.success){
        toast({title: "Success", description: res?.success, variant: 'default'})
      }
      else if (res.error){
          toast({title: "Error", description: res?.error, variant: 'destructive'})
      }
    }


    const handleName = async (userid:string, name:string)=>{
      const res = await modifyNameAction(userid,name as string)
      if (res.success){
        toast({title: "Success", description: res?.success, variant: 'default'})
      }
      else if (res.error){
          toast({title: "Error", description: res?.error, variant: 'destructive'})
      }
      update({user:{...session?.user,name}})
    }

    const handleAvatar = async (userid:string,event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const res  = await modifyAvatarAction(userid,file)

      if (res.success){
        toast({title: "Success", description: res?.success, variant: 'default'})
      }
      else if (res.error){
          toast({title: "Error", description: res?.error, variant: 'destructive'})
      }
      update({user:{...session?.user,image:res.data?.image}})
    }


    return (
        <SettingsHeading title={title} description={description} >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center ">
                <div className="text-description ">Profile Pic</div>
                <div className="relative group cursor-pointer">
                  <Avatar className="h-20 w-20 rounded-full border-2 bg-secondary hover:bg-accent2">
                    <AvatarImage src={user?.image?? ''} alt={user?.name?? ''} className="object-cover" />
                    <AvatarFallback className="text-3xl">{user?.name?user?.name[0]?.toUpperCase() :'U'}</AvatarFallback>
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
                  onChange={(e)=>handleAvatar(user?.id,e)} // Handle file selection
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 mt-4">
              <FloatingLabelInput id="name" label="Username" className="w-full my-2" defaultValue={name} 
              onChange={(e)=>{setName(e.target.value)}}/>
              <Button onClick={()=>handleName(user?.id,name as string)} className="w-1/4 text-wrap">Update Username</Button>
            </div>
            {/* <div className="flex items-center justify-between gap-4 mt-4">
              <FloatingLabelInput id="email" label="Email" className="flex-grow-1 my-2" defaultValue={email} type="email"
              onChange={(e)=>{setCurrentEmail(e.target.value)}}/>
              <Button onClick={()=>{}} className="w-1/4 text-wrap" >Verify New Email Address</Button>
            </div> */}
            <div className="text-emphasis mt-10"> Change Password</div>
            <div className= "text-description pb-2 border-b-2">Make sure it's atleast 6 characters</div>
            <div className="flex flex-col gap-4 mt-4 w-1/2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField control={form.control} name="password" render={({field})=>(
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput id="password" label="Password" type="password" className="w-full my-2"
                        {...field}/>
                      </FormControl>
                      <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                    </FormItem>
                  )}/>
                  <FloatingLabelInput id="confirm password" label="Confirm Password" type="password" 
                  className="w-full my-4" onChange={(e)=>{setConfirmPassword(e.target.value)}}/> 
                   <FormResult type="error" message={passwordError }/>
                   <FormResult type="success" message={passwordSuccess}/> 
                  <Button type="submit" className="w-1/2 text-wrap my-4">Modify Password</Button>
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
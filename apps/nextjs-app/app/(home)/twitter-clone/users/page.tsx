"use client"

import { ClipLoader } from "react-spinners";
import UserHero from "../_components/UserHero";
import UserBio from "../_components/UserBio";
import useCurrentUser from "../_hooks/useCurrentUser";
import { CreateTwitterUser } from "../_actions/user";
import { Button } from "@repo/ui/atoms/shadcn/button";
import PostFeed from "../_components/posts/PostFeed";


export default function UserProfile() {
  
  const {data:fetchedUser, isLoading,refetch } = useCurrentUser();

  const handleCreateUser = async () => {
    await CreateTwitterUser(); // ✅ Call the server action
    refetch(); // ✅ Force refresh after user is created
  };
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightgreen" size={80} />
      </div>
    )
  }



  if(!fetchedUser){
    return (
      <div className='flex w-full h-full mt-4'>
        <div className='flex flex-col items-center justify-center w-full gap-4'>
          <p className='text-description text-md'>You dont have a Twitter Clone Account here. Click on the below button to create a twitter clone account in this boilerplate</p>
          <Button onClick={handleCreateUser}>
            Create Account 
          </Button>
        </div>
      </div>
    )
  }


  return (
    <>
      <UserHero userId={fetchedUser.id} />
      <UserBio userId={fetchedUser.id} />
      <PostFeed userId={fetchedUser.id} />
    </>
  );
}

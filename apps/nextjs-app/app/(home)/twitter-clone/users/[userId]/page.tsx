"use client"

import useUser from "../../_hooks/useUser";
import UserHero from "../../_components/UserHero";
import { ClipLoader } from "react-spinners";
import UserBio from "../../_components/UserBio";
import PostFeed from "../../_components/posts/PostFeed";


export default function UserProfile({ params }: { params: { userId: string } }) {
  
  const { userId } = params;
  const {data: fetchedUser, isLoading} = useUser(userId);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightgreen" size={80} />
      </div>
    )
  }


  return (
    <>
      <UserHero userId={userId} />
      <UserBio userId={userId} />
      <PostFeed userId={userId} />
    </>
  );
}

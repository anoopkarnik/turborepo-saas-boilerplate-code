"use client"
import Image from "next/image";
import useUser from "../_hooks/useUser";
import Avatar from "./Avatar";



export default function UserHero({userId}: { userId: string }) {

  const {data: fetchedUser} = useUser(userId);


  return (
    <div className="bg-sidebar h-44 relative">
      {fetchedUser?.coverImage && (
        <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{objectFit: 'cover'}}/>
      )}
      <div className="absolute -bottom-16 left-4">
        <Avatar userId={userId} isLarge hasBorder />
      </div>
    </div>
  );
}

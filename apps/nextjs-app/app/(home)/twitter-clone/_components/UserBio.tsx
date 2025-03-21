"use client"

import { useMemo } from "react";
import useCurrentUser from "../_hooks/useCurrentUser";
import useUser from "../_hooks/useUser";
import { format } from "date-fns";
import { Button } from "@repo/ui/atoms/shadcn/button";
import { CalendarIcon } from "lucide-react";
import useEditModal from "@repo/state-management/zustand/useEditModal"



export default function UserBio({userId}: { userId: string }) {
  const { data: currentUser } = useCurrentUser();
  const {data: fetchedUser} = useUser(userId);

  const editModal = useEditModal();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) return null;
    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  },[fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] boprder-border pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.userId === userId ? (
          <Button variant={'secondary'} onClick={editModal.onOpen}>Edit</Button>
        ):(
          <Button variant={'secondary'} onClick={()=>{}}>Follow</Button>
        )}
      </div>
      <div className="mt-4 px-10">
        <div className="flex flex-col">
          <p className="text-foreground text-2xl font-semibold">{fetchedUser?.name}</p>
          <p className="text-description text-md">{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-foreground">
            {fetchedUser?.bio}
          </p>
          <div className="flex items-center gap-1 text-description">
            <CalendarIcon size={16} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className=" flex items-center mt-4 gap-6">
          <div className="flex items-center gap-1">
            <p className="text-md">{fetchedUser?.followingIds?.length}</p>
            <p className="text-description text-md">Following</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-md">{fetchedUser?.followersCount}</p>
            <p className="text-description text-md">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

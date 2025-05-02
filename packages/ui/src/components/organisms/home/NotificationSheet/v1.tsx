import React, { use, useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../../../molecules/shadcn/sheet'
import { BellIcon } from 'lucide-react'
import {  useNotifications,useSetNotifications } from '../../../../../../state-management/src/recoil/notification'
import {updateAllNotificationsAction} from '@repo/server-utils/notification'
import NotificationCard from '../../sidebar/NotificationCard/v1'
import { Button } from '../../../atoms/shadcn/button'

const NotificationSheet = () => {
  const notifications = useNotifications();
  const setNotifications = useSetNotifications();
  const [unreadNotifications,setUnreadNotifications] = useState(notifications?.filter((notification) => !notification.read));

  useEffect(() =>{
    setUnreadNotifications(notifications.filter((notification) => !notification.read));
  },[notifications])

  const handleAllNotificationsRead = () => {
    updateAllNotificationsAction();

    setNotifications(notifications.map((notification) => ({...notification,read:true})));
    setUnreadNotifications([]);

  }

  return (
    <Sheet>
    <SheetTrigger className='flex items-center justify-between text-description hover:bg-sidebar-accent p-2 w-full'>
      <div className='flex items-center gap-2'>
        <BellIcon size={14} />
        <div>Notifications</div>
      </div>
      <div className='text-description bg-background/90 px-1 rounded-full'>{unreadNotifications.length}</div>

    </SheetTrigger>
    <SheetContent className='w-[400px]' >
      <SheetHeader>
        <SheetTitle>Notifications</SheetTitle>
        <SheetDescription>
          All your notifications in one place
        </SheetDescription>
      </SheetHeader>
      <div className='mt-10'>
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification}  />
        ))}
      </div>
      <SheetFooter>
        <Button onClick={handleAllNotificationsRead}>Mark all as read</Button>
      </SheetFooter>
    </SheetContent>
   
  </Sheet>
  )
}

export default NotificationSheet
import React from 'react'
import { cn } from '../../../../lib/utils';
import { useRouter } from 'next/navigation';
import { useNotifications, useSetNotifications } from '../../../../../../state-management/src/recoil/notification';
import { updateNotificationAction } from '@repo/server-utils/notification';

const NotificationCard = ({notification}:any) => {
  function getRelativeTime(createdAt: Date) {
    const now = new Date();
    const created = new Date(createdAt.getTime() - 5.5 * 60* 60 * 1000);
    const diffInMs:number = now.getTime() - created.getTime(); // Difference in milliseconds

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }

  const router = useRouter();

  const notifications = useNotifications();
  const setNotifications = useSetNotifications();

  const handleClick = () =>{
    updateNotificationAction(notification.id);
    setNotifications(notifications.map((n) => {
      if(n.id === notification.id){
        return {...n,read:true}
      }
      return n;
    }))
    router.push(notification.href);
    
  }



  return (
    <button onClick={handleClick} className={cn('flex items-center gap-2 mb-4 p-2 rounded-lg cursor-pointer border-[1px]',
      notification.read ? 'bg-background' : 'bg-sidebar'    )}>
      <div className='rounded-full bg-sidebar-accent px-4 py-2'>T</div>
      <div className='flex flex-col '>
        <div className=''>{notification?.message}</div>
        <div className='text-description'>{getRelativeTime(notification?.createdAt)}</div>
      </div>
    </button>
  )
}

export default NotificationCard
import React from 'react'
import { MessengerUser} from "@prisma-mongo/prisma/client"
import Image from 'next/image'

interface AvatarGroupProps {
    users?: MessengerUser[]
}

const AvatarGroup = ({users=[]}:AvatarGroupProps) => {
    const slicedUsers = users.slice(0, 3)

    const positionMap = {
        0: 'top-0 left-[12px]',
        1: 'bottom-0',
        2: 'bottom-0 right-0',
    }
  return (
    <div className='relative h-11 w-11'>
       {slicedUsers.map((user, index) => (
            <div key={user.id} className={`absolute inline-block rounded-full overflow-hidden
            h-[21px] w-[21px] ${positionMap[index as keyof typeof positionMap]}`}>
                <Image
                    alt="Avatar"
                    fill
                    src={user.profileImage || "https://strapi.bayesian-labs.com/uploads/user_placholder_ae64bf746d.png"}
                    className='object-cover'
                />
            </div>
        ))}
    </div>
  )
}

export default AvatarGroup
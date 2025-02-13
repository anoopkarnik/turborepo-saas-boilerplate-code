"use client"

import React, { useCallback, useState } from 'react'
import useModal from "@repo/state-management/zustand/useModal"
import Modal from '@repo/ui/organisms/custom/misc/Modal'

const ProfileModal = () => {
    const profileModal = useModal()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async ()=> {
        try{
            setIsLoading(true)
            profileModal.onClose()
        }catch(error){
            console.log('Error in submitting profile:',error)
        }finally{
            setIsLoading(false)
        }
    },[profileModal])

    const bodyContent = (
        <div>
            Body
        </div>
    )
    
  return (
    <Modal disabled={isLoading} isOpen={profileModal.isOpen} onClose={profileModal.onClose} 
    title='Profile' body={bodyContent} actionLabel='Save' onSubmit={onSubmit} />
  )
}


export default ProfileModal
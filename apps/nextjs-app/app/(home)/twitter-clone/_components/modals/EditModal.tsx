"use client"
import React, { useCallback, useEffect, useState } from 'react'
import useCurrentUser from '../../_hooks/useCurrentUser'
import useUser from '../../_hooks/useUser';
import useEditModal from '@repo/state-management/zustand/useEditModal';
import { useToast } from '@repo/ui/hooks/use-toast';
import Modal from '@repo/ui/organisms/custom/misc/Modal';
import { Input } from '@repo/ui/atoms/shadcn/input';
import ImageUpload from '../ImageUpload';

const EditModal = () => {

    const { data: currentUser} = useCurrentUser();
    const { refetch} = useUser(currentUser?.id);

    const editModal = useEditModal();
    const {toast} = useToast();


    const [profileImage, setProfileImage] = useState();
    const [coverImage, setCoverImage] = useState();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [currentUser]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback( async() => {
        try{
            setIsLoading(true)
            await fetch('/api/twitter/edit', {
                method: 'PATCH',
                body: JSON.stringify({
                    profileImage,
                    coverImage,
                    name,
                    username,
                    bio
                })
            })
            refetch()
            toast({
                title: 'Profile updated',
                description: 'Your profile has been updated',
                variant: 'success'
            })
            editModal.onClose()
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    },[bio, coverImage, editModal, name, profileImage, refetch, toast,username])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload value={profileImage} onChange={(image:any)=>setProfileImage(image)} 
            label='Upload Profile Image' disabled={isLoading} />
            <ImageUpload value={coverImage} onChange={(image:any)=>setCoverImage(image)} 
            label='Upload Cover Image' disabled={isLoading} />
            <Input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
            <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading} />
            <Input placeholder='Bio' onChange={(e) => setBio(e.target.value)} value={bio} disabled={isLoading} />
           

        </div>
    )

  return (
    <Modal disabled={isLoading} isOpen={editModal.isOpen} title="Edit your profile" 
    actionLabel='Save' onClose={editModal.onClose} onSubmit={onSubmit} body={bodyContent}/>
  )
}

export default EditModal
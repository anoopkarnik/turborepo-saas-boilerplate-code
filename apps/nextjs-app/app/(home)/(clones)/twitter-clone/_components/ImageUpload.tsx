"use client"
import Image from 'next/image';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const ImageUpload = ({label,value,disabled,onChange}:ImageUploadProps) => {
    const [base64, setBase64] =useState(value);

    const handleChange = useCallback((base64: string)=>{
        onChange(base64);
    },[onChange])

    const handleDrop = useCallback((files:any) =>{
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event:any) =>{
            setBase64(event.target.result);
            handleChange(event.target.result);
        }
        reader.readAsDataURL(file);
    },[handleChange])

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept:{
            'image/jpeg': [],
            'image/png': []
        }
    })

  return (
    <div {...getRootProps({
        className:'w-full p-4 text-foreground text-center border-2 border-dotted border-border rounded-md cursor-pointer',
    })}>
        <input {...getInputProps()} />
        {base64 ? (
            <div className='flex items-center justify-center'>
                <Image src={base64} alt="Uploaded Image" width={100} height={100} />
            </div>
        ):(
            <p className='text-foreground'>{label}</p>
        )}
    </div>
  )
}

export default ImageUpload
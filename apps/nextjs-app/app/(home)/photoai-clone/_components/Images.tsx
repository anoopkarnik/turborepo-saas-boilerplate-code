"use client"
import React, { useEffect, useState } from 'react'
import { getImages } from '../_actions/server';
import ImageCard, { TImage } from './ImageCard';

const Images = () => {
    const [images, setImages] = useState<TImage[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getImages();
                setImages(response.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
        fetchImages();
    }, []);
  return (
    <div>
        {!images.length && <div className='text-center text-description mt-10'>No images found</div>}
        {images?.map((image, index) => (
            <ImageCard {...image} key={index} />
        ))}
    </div>
  )
}

export default Images
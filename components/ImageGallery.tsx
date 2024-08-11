'use client';
import Image from 'next/image';
import React from 'react';

interface ImageGalleryProps {
  images: string[];
  onImageClick: (image: string) => void;
  fullScreenImage: string | null;
}

export function ImageGallery({
  images,
  onImageClick,
  fullScreenImage,
}: ImageGalleryProps) {
  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        // <img
        //   key={index}
        //   src={image}
        //   alt={`Image ${index + 1}`}
        //   onClick={() => onImageClick(image)}
        //   className={fullScreenImage === image ? 'fullscreen' : ''}
        //   style={{ cursor: 'pointer' }} // Added cursor style to indicate clickable image
        // />
        <Image
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          onClick={() => onImageClick(image)}
          className={fullScreenImage === image ? 'fullscreen' : ''}
          style={{ cursor: 'pointer' }} // Added cursor style to indicate clickable image
          width={200}
          height={200}
        />
      ))}
    </div>
  );
}

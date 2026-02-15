"use client";

import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";

export default function ProductImgGallery() {
  const galleryRef = useRef<ImageGalleryRef>(null);
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";

  const images: GalleryItem[] = [
    {
      original: `${baseUrl}/plant1.jpg`,
      thumbnail: `${baseUrl}/plant1.jpg`,
      // originalHeight: "445",
      // originalWidth: "250",
      // thumbnailHeight: "90",
      // thumbnailWidth: "51",
    },
    {
      original: `${baseUrl}/plant2.jpg`,
      thumbnail: `${baseUrl}/plant2.jpg`,
      // thumbnailHeight: "90",
      // thumbnailWidth: "51",
    },
    {
      original: `${baseUrl}/plant3.jpg`,
      thumbnail: `${baseUrl}/plant3.jpg`,
    },
  ];
  return (
    <ImageGallery
      ref={galleryRef}
      items={images}
      showNav={true}
      showThumbnails={true}
      showFullscreenButton={false}
      showPlayButton={false}
      disableSwipe={true}
    />
  );
}

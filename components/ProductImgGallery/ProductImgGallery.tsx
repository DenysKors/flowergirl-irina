"use client";

import ImageGallery from "react-image-gallery";

import { getCldImageUrl } from "next-cloudinary";
import { useRef } from "react";
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";

type ProductImgGalleryProps = {
  title: string;
  imagesUrl: string[];
};

export default function ProductImgGallery({
  imagesUrl,
  title,
}: ProductImgGalleryProps) {
  const galleryRef = useRef<ImageGalleryRef>(null);

  const galleryUrl: GalleryItem[] = imagesUrl.map((el) => {
    const url = getCldImageUrl({
      width: "auto",
      height: "auto",
      quality: "30",
      src: el,
    });
    return {
      original: url,
      thumbnail: url,
      originalAlt: title,
      thumbnailAlt: title,
    };
  });

  return (
    <ImageGallery
      ref={galleryRef}
      items={galleryUrl}
      showNav={true}
      showThumbnails={true}
      showFullscreenButton={false}
      showPlayButton={false}
      disableSwipe={true}
      useBrowserFullscreen={false}
      useTranslate3D={false}
      disableThumbnailScroll={true}
      disableThumbnailSwipe={true}
    />
  );
}

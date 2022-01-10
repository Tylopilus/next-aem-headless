import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImageType } from '../utils/imageType';
import { HeroModel as THeroModel } from '../utils/types';
import { useImageData } from '../utils/useImageData';

export const HeroModel = ({ section }: { section: THeroModel }) => {
  const imageData = useImageData(section.image._authorUrl);
  return (
    <div className="">
      <Image
        src={section.image._authorUrl}
        width={section.image.width}
        height={section.image.height}
        alt={imageData ? imageData['jcr:content'].metadata['dc:title'] : ''}
      />
    </div>
  );
};

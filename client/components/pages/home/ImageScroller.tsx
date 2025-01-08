import Image, { StaticImageData } from 'next/image';
import Image1 from '../../../public/images/f21.jpeg';
import Image2 from '../../../public/images/f22.jpeg';
import Image3 from '../../../public/images/f23.jpeg';
import Image4 from '../../../public/images/f24.jpeg';
import Image5 from '../../../public/images/f25.jpeg';
import Image6 from '../../../public/images/f26.jpeg';
import Image7 from '../../../public/images/f27.jpeg';
import Image8 from '../../../public/images/f28.jpeg';
import Image9 from '../../../public/images/f29.jpeg';
import Image10 from '../../../public/images/f30.jpeg';


function ImageScroller() {
  const contents = [
    { image: Image1 },
    { image: Image2 },
    { image: Image3 },
    { image: Image4 },
    { image: Image5 },
    { image: Image6 },
    { image: Image7 },
    {image:Image8},
    {image: Image9},
    {image:Image10}
  ];

  return (
    <div className='flex overflow-hidden space-x-5 group'>
  <div className="flex flex-row flex-nowrap space-x-5 animate-loop-scroll group-hover:paused">
  {contents.map(({ image }: { image: StaticImageData }, index: number) => (
    <div
      key={index}
      className="w-52 h-52 flex items-center justify-center bg-gray-200 "
    >
      <Image
        src={image}
        alt={`Image ${index + 1}`}
        className="object-cover w-full h-full"
      />
    </div>
  ))}
</div>


<div className="flex flex-row flex-nowrap space-x-5 animate-loop-scroll group-hover:paused" aria-hidden="true">
  {contents.map(({ image }: { image: StaticImageData }, index: number) => (
    <div
      key={index}
      className="w-52 h-52 flex items-center justify-center bg-gray-200 "
    >
      <Image
        src={image}
        alt={`Image ${index + 1}`}
        className="object-cover w-full h-full"
      />
    </div>
  ))}
</div>


    </div>
  );
}

export default ImageScroller;
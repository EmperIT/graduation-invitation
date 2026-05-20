'use client';
import { useEffect, useState } from 'react';

const slides = ['/test.jpg', '/background.jpg', '/flower.png', '/anh1.jpg'];

function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % slides.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {slides.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={`slide-${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${i === index ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
        />
      ))}
    </>
  );
}

interface CollageLayoutProps {
  framed?: boolean;
}

export default function CollageLayout({ framed = false }: CollageLayoutProps) {
  return (
    <div className={`${framed ? 'h-full' : 'min-h-[100dvh]'} w-full flex items-center justify-center sm:p-4 p-0 overflow-hidden`}>

      {/* ĐÃ SỬA: Xóa gap-2 và sm:gap-4 ở đây để các ô dính chặt vào nhau */}
      <div className="relative w-full max-w-full sm:max-w-2xl grid grid-cols-2">

        {/* Góc trên trái */}
        {/* ĐÃ SỬA: Chỉ bo góc ở phía ngoài cùng bên trái và trên cùng (rounded-tl-xl) */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-tl-xl">
          <img src="/anh1.jpg" alt="Top Left" className="w-full h-full object-cover" />
        </div>

        {/* Góc trên phải */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-tr-xl">
          <img src="/top-right.png" alt="Top Right" className="w-full h-full object-contain" />
        </div>

        {/* Góc dưới trái */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-bl-xl">
          <img src="/anh1.jpg" alt="Bottom Left" className="w-full h-full object-cover" />
        </div>

        {/* Góc dưới phải */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-br-xl">
          <video
            src="/video1.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        <div className="absolute top-1/2 left-0 z-20 w-[300px] sm:w-[390px] -translate-y-1/2">

          <div className="relative aspect-[520/479] w-full drop-shadow-2xl">
            <img
              src="/camera.png"
              alt="Camera frame"
              className="relative z-20 h-full w-full object-contain"
            />

            <div className="absolute left-[37.5%] top-[27%] z-30 h-[32.5%] w-[55%] overflow-hidden rounded-[3px] bg-black">
              <Slideshow />
            </div>

            {/* `Iloveu.png` anchored to bottom-right of the video frame */}
            {/* <img
              src="/Iloveu.png"
              alt="Iloveu"
              className="absolute -bottom-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 z-30 drop-shadow-md"
            /> */}
            {/* flower icon anchored to top-left of the video frame (moved here so it's not clipped) */}
            <img
              src="/flower.png"
              alt="flower"
              className="absolute -top-4 left-[28%] z-40 h-12 w-12 rotate-[-15deg] sm:-top-6 sm:h-16 sm:w-16"
            />
          </div>
        </div>



      </div>

    </div>
  );
}

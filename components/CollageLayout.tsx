'use client';
import { useEffect, useState } from 'react';

function Slideshow() {
  const slides = ['/test.jpg', '/background.jpg', '/flower.png', '/anh1.jpg'];
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

export default function CollageLayout() {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center sm:p-4 p-0 overflow-hidden">

      {/* ĐÃ SỬA: Xóa gap-2 và sm:gap-4 ở đây để các ô dính chặt vào nhau */}
      <div className="relative w-full max-w-full sm:max-w-2xl grid grid-cols-2">

        {/* Góc trên trái */}
        {/* ĐÃ SỬA: Chỉ bo góc ở phía ngoài cùng bên trái và trên cùng (rounded-tl-xl) */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-tl-xl">
          <img src="/anh1.jpg" alt="Top Left" className="w-full h-full object-cover" />
        </div>

        {/* Góc trên phải */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-tr-xl">
          <img src="/anh1.jpg" alt="Top Right" className="w-full h-full object-cover" />
        </div>

        {/* Góc dưới trái */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-bl-xl">
          <img src="/anh1.jpg" alt="Bottom Left" className="w-full h-full object-cover" />
        </div>

        {/* Góc dưới phải */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-br-xl">
          <img src="/anh1.jpg" alt="Bottom Right" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">

          <div className="relative w-[240px] h-[150px] sm:w-[280px] sm:h-[180px] bg-[#2a2a2a] rounded-lg p-2 sm:p-3 shadow-2xl rotate-[3deg]">
            <div className="w-full h-full bg-black relative rounded flex items-center justify-center overflow-hidden">
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
              className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 rotate-[-15deg] z-30"
            />
          </div>
        </div>



      </div>

    </div>
  );
}
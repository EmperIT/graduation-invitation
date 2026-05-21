"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import FlowerFall from "./FlowerFall";
import Typewriter from "./Typewriter";

const slides = ["/test.jpg", "/background.jpg", "/flower.png", "/anh1.jpg"];

function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {slides.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={`slide-${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${i === index ? "opacity-100 z-20" : "opacity-0 z-10"}`}
        />
      ))}
    </>
  );
}

interface CollageLayoutProps {
  framed?: boolean;
}

export default function CollageLayout({ framed = false }: CollageLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        
        const isDesktop = window.innerWidth >= 640;
        const baseW = isDesktop ? 672 : 360;
        const baseH = isDesktop ? 885 : 640;
        
        const paddingX = framed ? 0 : (isDesktop ? 32 : 0);
        const paddingY = framed ? 0 : (isDesktop ? 64 : 32);
        
        const availableW = Math.max(0, width - paddingX);
        const availableH = Math.max(0, height - paddingY);
        
        const scaleX = availableW / baseW;
        const scaleY = availableH / baseH;
        
        setScale(Math.min(scaleX, scaleY, isDesktop ? 1.2 : 2)); 
      }
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [framed]);

  return (
    <div
      ref={containerRef}
      className={`${framed ? "h-full w-full" : "min-h-[100dvh] w-full"} relative flex items-center justify-center overflow-hidden`}
    >
      {!framed && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <FlowerFall />
        </div>
      )}

      {/* Wrapper transform scale giúp ảnh không bao giờ bị cắt */}
      <div 
        className="absolute inset-0 z-20 flex justify-center items-center transition-opacity duration-500"
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: "center",
          opacity: isMounted ? 1 : 0
        }}
      >
        <div className="relative w-[360px] sm:w-[672px] shrink-0">
          {/* Desktop: faux wooden frame via theme tokens. Mobile: no frame, just shadow. */}
        <div className="shadow-2xl sm:shadow-none">
          <div className="hidden sm:block rounded-[28px] p-[10px] bg-gradient-to-br from-amber-950/70 via-amber-800/55 to-yellow-950/60 shadow-2xl">
            <div className="rounded-[22px] bg-black/15 p-[6px]">
              <div className="relative grid grid-cols-2 overflow-hidden rounded-[18px]">
                {/* Góc trên trái */}
                {/* ĐÃ SỬA: Chỉ bo góc ở phía ngoài cùng bên trái và trên cùng (rounded-tl-xl) */}
                <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-tl-xl">
                  <img
                    src="/anh1.jpg"
                    alt="Top Left"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Góc trên phải */}
                <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-tr-xl">
                  <img
                    src="/anh2.jpg"
                    alt="Top Right"
                    className="w-full h-full object-cover sm:object-contain"
                  />
                </div>

                {/* Góc dưới trái */}
                <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-bl-xl">
                  <img
                    src="/anh1.jpg"
                    alt="Bottom Left"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Góc dưới phải */}
                <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-br-xl">
                  <video
                    src="/video2.mp4"
                    className="w-full h-full object-cover object-top"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>

                <div className="absolute top-[57%] left-0 z-20 w-[300px] sm:w-[390px] -translate-y-1/2">
                  <div className="relative aspect-[520/479] w-full drop-shadow-2xl">
                    <img
                      src="/camera.png"
                      alt="Camera frame"
                      className="relative z-20 h-[95%] w-[95%] object-contain"
                    />

                    <div className="absolute left-[35%] top-[25%] z-30 h-[33%] w-[54%] overflow-hidden rounded-[3px] bg-black">
                      <Slideshow />
                    </div>

                    <img
                      src="/flower.png"
                      alt="flower"
                      className="absolute top-4 left-[20%] z-40 h-12 w-12 rotate-[-15deg] sm:top-6 sm:h-18 sm:w-18"
                    />
                  </div>
                </div>

                <div className="absolute top-[40%] right-0 z-20 w-[230px] sm:w-[300px] -translate-y-1/2 flex justify-end">
                  <img
                    src="/piece1-cropped.png"
                    alt="Paper"
                    style={{ transform: "scaleY(-1)" }}
                    className="relative z-20 w-full object-contain object-right"
                  />
                  <div className="absolute left-[14%] top-[22%] z-30 w-[76%] overflow-hidden">
                    <p className="paper-invite-note w-full max-w-full whitespace-normal break-words text-left text-[17px] font-medium leading-tight sm:text-[24px]">
                      <Typewriter text="Mời bạn đến tham dự lễ tốt nghiệp của mình nhé" delay={1200} speed={50} />
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 z-20 w-full -translate-x-1/2 px-3 pb-3 sm:px-6 sm:pb-5">
                  <div
                    className="font-bubble mx-auto flex w-full max-w-[350px] items-center justify-between gap-2 rounded-full border border-pink-100/70 bg-pink-200/35 px-3 py-2 text-white shadow-xl backdrop-blur-md sm:max-w-[560px] sm:gap-4 sm:px-5 sm:py-3"
                    style={{
                      textShadow:
                        "0 2px 0 rgba(236, 72, 153, 0.45), 0 4px 10px rgba(0, 0, 0, 0.22)",
                    }}
                  >
                    <div
                      className="banner-text-float shrink-0 text-left leading-none"
                      style={{ animationDelay: "0ms" }}
                    >
                      <div className="text-[11px] font-black uppercase sm:text-[15px]">
                        Friday
                      </div>
                      <div className="text-[15px] font-black sm:text-[22px]">
                        29/5
                      </div>
                    </div>

                    <div className="h-8 w-px shrink-0 bg-white/45 sm:h-10" />

                    <div
                      className="banner-text-float min-w-0 flex-1 text-center leading-none"
                      style={{ animationDelay: "180ms" }}
                    >
                      <div className="truncate text-[18px] font-black sm:text-[28px]">
                        Huyền Diệu
                      </div>
                      <div className="mt-1 truncate text-[10px] font-bold sm:text-[15px]">
                        Đại học Tôn Đức Thắng - Tòa A
                      </div>
                    </div>

                    <div className="h-8 w-px shrink-0 bg-white/45 sm:h-10" />

                    <div
                      className="banner-text-float shrink-0 text-right leading-none"
                      style={{ animationDelay: "360ms" }}
                    >
                      <div className="text-[16px] font-black sm:text-[24px]">
                        10:00
                      </div>
                      <div className="text-[11px] font-black uppercase sm:text-[15px]">
                        AM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Small: no wood frame, just the content itself */}
        <div className="sm:hidden">
          <div className="relative grid grid-cols-2 overflow-hidden rounded-xl">
            {/* Góc trên trái */}
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-tl-xl">
              <img
                src="/anh1.jpg"
                alt="Top Left"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Góc trên phải */}
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-tr-xl">
              <img
                src="/anh2.jpg"
                alt="Top Right"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Góc dưới trái */}
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-bl-xl">
              <img
                src="/anh1.jpg"
                alt="Bottom Left"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Góc dưới phải */}
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-br-xl">
              <video
                src="/video2.mp4"
                className="w-full h-full object-cover object-top"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            <div className="absolute top-[57%] left-0 z-20 w-[220px] -translate-y-1/2">
              <div className="relative aspect-[520/479] w-full drop-shadow-2xl">
                <img
                  src="/camera.png"
                  alt="Camera frame"
                  className="relative z-20 h-[95%] w-[95%] object-contain"
                />

                <div className="absolute left-[35%] top-[25%] z-30 h-[33%] w-[54%] overflow-hidden rounded-[3px] bg-black">
                  <Slideshow />
                </div>

                <img
                  src="/flower.png"
                  alt="flower"
                  className="absolute top-3 left-[20%] z-40 h-9 w-9 rotate-[-15deg]"
                />
              </div>
            </div>

            <div className="absolute top-[40%] right-0 z-20 w-[170px] -translate-y-1/2 flex justify-end">
              <img
                src="/piece1-cropped.png"
                alt="Paper"
                style={{ transform: "scaleY(-1)" }}
                className="relative z-20 w-full object-contain object-right"
              />
              <div className="absolute left-[14%] top-[22%] z-30 w-[76%] overflow-hidden">
                <p className="paper-invite-note w-full max-w-full whitespace-normal break-words text-left text-[13px] font-medium leading-tight">
                  <Typewriter text="Mời bạn đến tham dự lễ tốt nghiệp của mình nhé" delay={1200} speed={50} />
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 z-20 w-full -translate-x-1/2 px-3 pb-3">
              <div
                className="font-bubble mx-auto flex w-full max-w-[350px] items-center justify-between gap-2 rounded-full border border-pink-100/70 bg-pink-200/35 px-3 py-2 text-white shadow-xl backdrop-blur-md"
                style={{
                  textShadow:
                    "0 2px 0 rgba(236, 72, 153, 0.45), 0 4px 10px rgba(0, 0, 0, 0.22)",
                }}
              >
                <div
                  className="banner-text-float shrink-0 text-left leading-none"
                  style={{ animationDelay: "0ms" }}
                >
                  <div className="text-[11px] font-black uppercase">Friday</div>
                  <div className="text-[15px] font-black">29/5</div>
                </div>

                <div className="h-8 w-px shrink-0 bg-white/45" />

                <div
                  className="banner-text-float min-w-0 flex-1 text-center leading-none"
                  style={{ animationDelay: "180ms" }}
                >
                  <div className="truncate text-[18px] font-black">
                    Huyền Diệu
                  </div>
                  <div className="mt-1 truncate text-[10px] font-bold">
                    Đại học Tôn Đức Thắng - Tòa A
                  </div>
                </div>

                <div className="h-8 w-px shrink-0 bg-white/45" />

                <div
                  className="banner-text-float shrink-0 text-right leading-none"
                  style={{ animationDelay: "360ms" }}
                >
                  <div className="text-[16px] font-black">10:00</div>
                  <div className="text-[11px] font-black uppercase">AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

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
  const [mobileScale, setMobileScale] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePhoneClick = () => {
    const isMobile = window.innerWidth < 640 || /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "tel:0379036004";
    } else {
      navigator.clipboard.writeText("0379036004").then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
    
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        
        const isDesktop = window.innerWidth >= 640;
        if (!isDesktop) {
          setScale(1);
          setMobileScale(width / 390);
          continue;
        }

        const baseW = 672;
        const baseH = 885;
        
        const paddingX = framed ? 0 : 32;
        const paddingY = framed ? 0 : 64;
        
        const availableW = Math.max(0, width - paddingX);
        const availableH = Math.max(0, height - paddingY);
        
        const scaleX = availableW / baseW;
        const scaleY = availableH / baseH;
        
        setScale(Math.min(scaleX, scaleY, 1.2)); 
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
        <div className="absolute inset-0 w-full h-full sm:relative sm:inset-auto sm:w-[672px] sm:h-auto shrink-0">
          {/* Desktop: faux wooden frame via theme tokens. Mobile: no frame, just shadow. */}
        <div className="absolute inset-0 sm:relative sm:inset-auto h-full sm:h-auto shadow-2xl sm:shadow-none">
          <div className="hidden sm:block rounded-[28px] p-[10px] bg-gradient-to-br from-amber-950/70 via-amber-800/55 to-yellow-950/60 shadow-2xl">
            <div className="rounded-[22px] bg-black/15 p-[6px]">
              <div className="relative overflow-hidden rounded-[18px]">
                {/* Nền Video Background */}
                <div className="relative w-full aspect-[3/4]">
                  <video
                    src="/video-background.mp4"
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>

                {/* TDT Logo */}
                <img
                  src="/logo-tdt.webp"
                  alt="TDTU Logo"
                  className="absolute top-3 right-3 z-40 w-16 drop-shadow-md sm:top-4 sm:right-4 sm:w-20"
                />

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
                <div className="absolute bottom-0 left-1/2 z-20 w-full -translate-x-1/2 px-3 pb-3 sm:px-6 sm:pb-15">
                  <div
                    className="font-bubble mx-auto flex w-max max-w-[95vw] flex-col gap-1.5 rounded-[20px] border border-pink-100/70 bg-pink-200/35 px-4 py-2.5 text-white shadow-xl backdrop-blur-md sm:gap-2 sm:rounded-[24px] sm:px-6 sm:py-3.5"
                    style={{
                      textShadow: "0 1px 0 rgba(236, 72, 153, 0.45), 0 2px 5px rgba(0, 0, 0, 0.22)",
                    }}
                  >
                    {/* Top: Name */}
                    <div
                      className="banner-text-float text-center text-[22px] font-black leading-tight sm:text-[28px]"
                      style={{ animationDelay: "0ms" }}
                    >
                      Huyền Diệu
                    </div>

                    {/* Middle: Grid/Flex */}
                    <div className="flex w-full items-center justify-center gap-3 sm:gap-6">
                      <div
                        className="banner-text-float shrink-0 text-center leading-[1.1]"
                        style={{ animationDelay: "90ms" }}
                      >
                        <div className="text-[11px] font-black uppercase sm:text-[14px]">Friday</div>
                        <div className="text-[17px] font-black sm:text-[21px]">29/5</div>
                      </div>

                      <div className="h-8 w-px shrink-0 bg-white/45 sm:h-10" />

                      <div
                        className="banner-text-float shrink-0 flex flex-col justify-center text-center leading-[1.15]"
                        style={{ animationDelay: "180ms" }}
                      >
                        <div className="text-[13px] font-black sm:text-[17px]">
                          Đại học Tôn Đức Thắng
                        </div>
                        <div className="mt-0.5 flex items-center justify-center gap-1.5 text-[12px] font-bold sm:mt-1 sm:text-[16px]">
                          <span>Tòa A</span>
                          <a
                            href="https://discovery.tdtu.edu.vn/?fbclid=IwY2xjawR8E1ZleHRuA2FlbQIxMQBicmlkETE2dlZCVHdaQWxCV0NGeTJXc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnEQ3xbn1GP7a5BAhB1rmk5OGGhK1_5nrLN6p9M3YcZA4DXX-sXjjSgS3Y5F_aem_9mRM0gGzCJTJ8UWwHKsAOA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-[0_0_10px_rgba(236,72,153,0.8)] border border-pink-300 hover:bg-white hover:scale-110 transition-all duration-300 animate-bounce"
                            aria-label="Xem Bản Đồ"
                          >
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-3 w-3 sm:h-4 sm:w-4 text-rose-600 drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div className="h-8 w-px shrink-0 bg-white/45 sm:h-10" />

                      <div
                        className="banner-text-float shrink-0 text-center leading-[1.1]"
                        style={{ animationDelay: "270ms" }}
                      >
                        <div className="text-[17px] font-black sm:text-[21px]">10:00</div>
                        <div className="text-[11px] font-black uppercase sm:text-[14px]">AM</div>
                      </div>
                    </div>

                    {/* Bottom: Phone */}
                    <div
                      onClick={handlePhoneClick}
                      className="banner-text-float mt-0.5 flex cursor-pointer items-center justify-center gap-1.5 text-center text-[15px] font-black leading-tight text-rose-500 transition-colors hover:text-rose-600 sm:text-[19px]"
                      style={{ animationDelay: "360ms", textShadow: "none" }}
                    >
                      {copied ? (
                        <span className="text-[14px] text-emerald-500 sm:text-[17px]">Đã sao chép!</span>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <span>0379 036 004</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Small: no wood frame, just the content itself */}
        <div className="sm:hidden absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            {/* Nền Video Background */}
            <video
              src="/video-background.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />

            {/* TDT Logo */}
            <img
              src="/logo-tdt.webp"
              alt="TDTU Logo"
              className="absolute top-3 right-3 z-40 w-16 drop-shadow-md"
            />

            <div className="absolute top-[54%] left-0 z-20 w-[250px] -translate-y-1/2">
              <div style={{ transform: `scale(${mobileScale})`, transformOrigin: "left center", transition: "transform 0.1s ease-out" }}>
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
                    className="absolute top-4 left-[20%] z-40 h-10 w-10 rotate-[-15deg]"
                  />
                </div>
              </div>
            </div>

            <div className="absolute top-[40%] right-0 z-20 w-[190px] -translate-y-1/2 flex justify-end">
              <div style={{ transform: `scale(${mobileScale})`, transformOrigin: "right center", transition: "transform 0.1s ease-out" }} className="w-full">
                <img
                  src="/piece1-cropped.png"
                  alt="Paper"
                  style={{ transform: "scaleY(-1)" }}
                  className="relative z-20 w-full object-contain object-right"
                />
                <div className="absolute left-[14%] top-[22%] z-30 w-[76%] overflow-hidden">
                  <p className="paper-invite-note w-full max-w-full whitespace-normal break-words text-left text-[14px] font-medium leading-tight">
                    <Typewriter text="Mời bạn đến tham dự lễ tốt nghiệp của mình nhé" delay={1200} speed={50} />
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 z-20 w-[390px] -translate-x-1/2 pb-12">
              <div style={{ transform: `scale(${mobileScale})`, transformOrigin: "bottom center", transition: "transform 0.1s ease-out" }} className="w-full flex justify-center">
                <div
                  className="font-bubble mx-auto flex w-max flex-col gap-1.5 rounded-[18px] border border-pink-100/70 bg-pink-200/35 px-4 py-2.5 text-white shadow-xl backdrop-blur-md"
                  style={{
                    textShadow: "0 1px 0 rgba(236, 72, 153, 0.45), 0 2px 5px rgba(0, 0, 0, 0.22)",
                  }}
                >
                  <div
                    className="banner-text-float text-center text-[22px] font-black leading-tight"
                    style={{ animationDelay: "0ms" }}
                  >
                    Huyền Diệu
                  </div>

                <div className="flex w-full items-center justify-center gap-3">
                  <div
                    className="banner-text-float shrink-0 text-center leading-[1.1]"
                    style={{ animationDelay: "90ms" }}
                  >
                    <div className="text-[11px] font-black uppercase">Friday</div>
                    <div className="text-[17px] font-black">29/5</div>
                  </div>

                  <div className="h-8 w-px shrink-0 bg-white/45" />

                  <div
                    className="banner-text-float shrink-0 flex flex-col justify-center text-center leading-[1.15]"
                    style={{ animationDelay: "180ms" }}
                  >
                    <div className="text-[13px] font-black">
                      Đại học Tôn Đức Thắng
                    </div>
                    <div className="mt-0.5 flex items-center justify-center gap-1.5 text-[12px] font-bold">
                      <span>Tòa A</span>
                      <a
                        href="https://discovery.tdtu.edu.vn/?fbclid=IwY2xjawR8E1ZleHRuA2FlbQIxMQBicmlkETE2dlZCVHdaQWxCV0NGeTJXc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnEQ3xbn1GP7a5BAhB1rmk5OGGhK1_5nrLN6p9M3YcZA4DXX-sXjjSgS3Y5F_aem_9mRM0gGzCJTJ8UWwHKsAOA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-[0_0_10px_rgba(236,72,153,0.8)] border border-pink-300 hover:bg-white hover:scale-110 transition-all duration-300 animate-bounce"
                        aria-label="Xem Bản Đồ"
                      >
                         <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-3 w-3 text-rose-600 drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="h-8 w-px shrink-0 bg-white/45" />

                  <div
                    className="banner-text-float shrink-0 text-center leading-[1.1]"
                    style={{ animationDelay: "270ms" }}
                  >
                    <div className="text-[17px] font-black">10:00</div>
                    <div className="text-[11px] font-black uppercase">AM</div>
                  </div>
                </div>

                <div
                  onClick={handlePhoneClick}
                  className="banner-text-float mt-0.5 flex cursor-pointer items-center justify-center gap-1 text-center text-[15px] font-black leading-tight text-rose-500 transition-colors hover:text-rose-600"
                  style={{ animationDelay: "360ms", textShadow: "none" }}
                >
                  {copied ? (
                    <span className="text-[14px] text-emerald-500">Đã sao chép!</span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>0379 036 004</span>
                    </>
                  )}
                </div>
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

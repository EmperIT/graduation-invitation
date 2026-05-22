/* eslint-disable @next/next/no-img-element */
"use client";

import Typewriter from "./Typewriter";

interface NewInvitationLayoutProps {
  dearName?: string;
}

export default function NewInvitationLayout({
  dearName,
}: NewInvitationLayoutProps) {
  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-neutral-950 bg-cover bg-center p-0 sm:p-4 overflow-hidden"
      style={{ backgroundImage: "url('/background_new.jpg')" }}
    >
      {/* Outer blurred background wrapper on desktop for premium visual effect */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-lg hidden sm:block pointer-events-none z-0" />

      {/* Main card matching the mobile phone layout */}
      <div
        className="relative w-full max-w-[440px] min-h-screen sm:min-h-[880px] sm:max-h-[920px] sm:rounded-[36px] shadow-[0_24px_50px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col justify-between pt-10 pb-0 text-neutral-800 bg-cover bg-center z-10"
        style={{ backgroundImage: "url('/background_new.jpg')" }}
      >
        {/* Top Overlay Gradient to darken top text slightly for legibility */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-0" />

        {/* 1. HEADER (INVITATION 2025) */}
        <div className="relative w-full flex justify-between items-center px-8 z-10">
          <span
            className="text-[#E2C799] text-2xl tracking-[0.25em] font-light uppercase select-none"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 700,
            }}
          >
            Invitation
          </span>
          <span
            className="text-[#E2C799] text-2xl tracking-[0.25em] font-light select-none"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 700,
            }}
          >
            2026
          </span>
        </div>

        {/* 2. TITLE (Graduation Ceremony Image) */}
        <div className="relative flex flex-col items-center mt-4 z-10 select-none w-full px-6">
          <img
            src="/graduation.png"
            alt="Graduation Ceremony"
            className="w-full max-w-[400px] h-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-102"
          />
        </div>

        {/* 3. MIDDLE AREA (Kept empty/spaced to show the face of the graduate in background_new.jpg) */}
        <div className="flex-grow min-h-[220px] sm:min-h-[280px]" />

        {/* 4. BOTTOM INVITATION SECTION WITH WHITE GRADIENT OVERLAY */}
        <div className="relative w-full pt-10 pb-4 px-5 flex flex-col items-center justify-end z-10 overflow-hidden mt-auto">
          {/* White Gradient Overlay (Fades from transparent at the top to white at the bottom) */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 via-white/65 to-transparent pointer-events-none z-0" />

          {/* Background TDT Logo (Ghostly/Faded/Blurred effect) */}
          <div className="absolute top-20 inset-0 flex justify-center items-center pointer-events-none opacity-[0.14] select-none z-0 overflow-hidden">
            <img
              src="/logo-tdt.webp"
              alt="TDTU Logo"
              className="w-[320px] h-auto object-contain filter grayscale brightness-[1.15] contrast-[0.7] scale-110"
            />
          </div>

          {/* Personal Greeting (Thân mời...) */}
          <div className="relative flex flex-col items-center text-center w-full mt-5 mb-5 z-10 select-none">
            <span
              className="text-[23px] tracking-widest font-bold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Thân mời
            </span>
            <div className="relative my-2">
              <span
                className="text-[#a88648] text-[34px] px-4 font-normal inline-block border-b border-[#a88648]/40 pb-1"
                style={{ fontFamily: "var(--font-great-vibes)" }}
              >
                <Typewriter
                  text={dearName || "anh/chị/em/bạn bè"}
                  delay={1400}
                  speed={70}
                />
              </span>
            </div>
            {/* 3 Columns Section (Thời gian, Địa điểm, Liên hệ) */}
            <div className="w-full flex justify-between gap-1 items-stretch z-10">
              {/* Column 1: Thời gian */}
              <div className="flex flex-col items-center flex-1 py-1">
                <div
                  className="border border-[#856a47]/40 rounded-full px-5 py-1 text-[14px] font-bold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent tracking-wider"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Thời gian
                </div>

                <div className="flex items-center gap-2.5 h-full justify-center mt-2">
                  {/* Date stack */}
                  <div className="flex flex-col items-center select-none">
                    <span
                      className="text-[36px] font-medium leading-none bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      29
                    </span>
                    <div className="w-9 h-[1px] bg-[#856a47]/60 my-1" />
                    <span
                      className="text-[36px] font-medium leading-none bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      05
                    </span>
                  </div>

                  {/* Vertical divider */}
                  <div className="w-[1px] h-10 bg-[#856a47]/80" />

                  {/* Time stack */}
                  <div className="flex flex-col items-center justify-center h-full gap-1 select-none">
                    <span
                      className="text-[18px] leading-none font-medium bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      10:00
                    </span>
                    <div className="w-[1.5px] h-3 bg-[#856a47] rounded-full" />
                    <span
                      className="text-[18px] leading-none font-medium bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      11:00
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Địa điểm */}
              <div className="flex flex-col items-center flex-[1.4] py-1 px-1">
                <div
                  className="border border-[#856a47]/40 rounded-full px-5 py-1 text-[14px] font-bold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent tracking-wider"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Địa điểm
                </div>
                <div className="text-center flex flex-col justify-center items-center h-full select-none mt-2">
                  <span
                    className="text-[14px] font-bold leading-tight block bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    Đại học Tôn Đức Thắng
                  </span>
                  <span
                    className="text-[12px] font-medium leading-relaxed mt-1.5 block max-w-[130px] bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    19 Đ. Nguyễn Hữu Thọ
                  </span>
                  <span
                    className="text-[12px] font-medium leading-relaxed block max-w-[130px] bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    P. Tân Hưng, TP. HCM
                  </span>
                </div>
              </div>

              {/* Column 3: Liên hệ */}
              <div className="flex flex-col items-center flex-1 py-1">
                <div
                  className="border border-[#856a47]/40 rounded-full px-5 py-1 text-[14px] font-bold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent tracking-wider"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Liên hệ
                </div>
                <div
                  className="text-center flex flex-col justify-center items-center h-full gap-2 select-none mt-2"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <span className="block text-[12px] leading-tight font-semibold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent">
                    037 903 6004 - Diệu
                  </span>
                  <span className="block text-[12px] leading-tight font-semibold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent">
                    033 405 3171-Trường
                  </span>
                </div>
              </div>
            </div>

            {/* 5. THANK YOU PARAGRAPH */}
            <div className="w-full text-center px-3 border-t border-[#4a433a]/10 pt-3 select-none z-10">
            <p 
              className="text-[14px] text-[#4a433a]/90 leading-relaxed font-medium"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Sự hiện diện của anh chị bạn chính là niềm vinh dự lớn lao và là kỷ niệm quý giá đối với Diệu. Xin chân thành cảm ơn vì đã đồng hành, chia sẻ và ủng hộ Diệu trong hành trình vừa qua!
            </p>

          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

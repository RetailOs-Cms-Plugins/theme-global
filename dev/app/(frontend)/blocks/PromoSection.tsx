'use client'

import React from 'react'

interface PromoSectionProps {
  buttonText?: string
  mainImage?: string
  mainTitle?: string
  onButtonClick?: () => void
  promotionText?: string
  secondaryTitle?: string
  smallImage?: string
}

const PromoSection: React.FC<PromoSectionProps> = ({
  buttonText = 'לכל ההפתעות',
  mainImage = 'https://placehold.co/398x364',
  mainTitle = 'הפתעה שמתחילה בלחיצה...',
  onButtonClick,
  promotionText = 'ואתם מקבלים ₪50 לקנייה הראשונה – עלינו!',
  secondaryTitle = 'הקופסה קופצת, הצעצועים עפים,',
  smallImage = 'https://placehold.co/108x53',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onButtonClick?.()
    }
  }

  return (
    <div className="flex justify-center items-center py-12 w-full max-w-7xl">
      <div className="flex flex-col items-center justify-center md:flex-row gap-8 rounded-3xl px-20 w-full gap-20 relative after:content-[''] after:absolute after:left-0 after:right-0 after:bg-[#C9B7E7] after:rounded-3xl after:-z-10 after:h-[85%] after:top-[8%]">
        {/* Card */}
        <div className="w-full bg-[#F4F4F4] rounded-[12.367px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] p-8 flex flex-col gap-4 relative z-10 overflow-hidden pb-[25%]">
          {/* Small image */}
          <img
            alt="Small"
            className="w-24 h-12 rounded-lg border-4 border-white object-cover bg-gray-100"
            src={smallImage}
          />
          <div className="flex flex-col gap-0 z-10">
            {/* Main title */}
            <h2 className="heading-3 text-color">{mainTitle}</h2>
            {/* Secondary title */}
            <h3 className="blockquote">{secondaryTitle}</h3>
          </div>
          {/* Promotion text */}
          <p className="lead-text z-10">{promotionText}</p>
          {/* Button replace that */}
          <div
            className="w-36 h-10 mt-2 cursor-pointer relative flex items-center z-10"
            onClick={onButtonClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            <div className="absolute inset-0 bg-white rounded-full" />
            <div className="relative flex items-center justify-center gap-2 w-full">
              <span className="text-center text-base font-semibold underline z-10">
                {buttonText}
              </span>
              <div className="w-8 h-8 bg-[#C9B7E7] rounded-full flex items-center justify-center z-10">
                {/* Arrow icon */}
                <svg
                  className="w-4 h-4 rotate-180"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          {/* SVG line at the bottom */}
          <div className="absolute left-0 bottom-0 w-full h-1/2 pointer-events-none z-0 flex items-end">
            <svg
              className="w-full h-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 460 310"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M460 253.5V257.245C441.519 269.059 390.59 300.152 369.239 305.787C362.724 307.5 356.133 308.427 349.609 310H322.5C316.686 308.193 310.591 307.51 304.739 305.787C242.305 287.354 191.21 202.585 173.206 143.56C170.336 134.151 167.578 124.116 166.382 114.352C164.961 113.968 164.83 114.717 164.036 115.269C159.782 118.218 154.931 123.573 150.416 126.906C119.409 149.795 81.8496 162.536 45.8791 141.893C27.6135 131.399 13.5824 114.061 0 98.4275V91.8744C16.7607 113.762 38.4289 139.562 66.3602 146.649C102.966 155.945 139.423 134.161 164.942 109.718C160.801 80.0974 157.473 40.4136 174.057 13.8921C187.125 -7.00303 211.354 -4.13838 213.112 21.2129C214.869 46.5641 198.286 76.2498 182.255 96.0684C180.02 98.83 170.364 108.164 169.654 109.689C168.055 113.153 174.028 133.477 175.477 138.467C196.678 211.207 261.225 316.357 349.113 306.246C378.475 302.866 435.2 268.525 459.981 253.5H460ZM168.27 105.917C188.77 85.6489 212.831 49.6909 209.288 19.4248C207.353 2.92028 191.556 -2.15371 180.871 10.4189C161.652 33.0272 163.933 78.4217 168.27 105.917Z"
                fill="#194363"
              />
            </svg>
          </div>
        </div>
        {/* Main image container */}
        <div className="w-full flex items-center justify-center md:py-20">
          <img
            alt="Main"
            className="flex items-center justify-center rounded-2xl border-4 border-white w-full"
            src={mainImage}
          />
        </div>
      </div>
    </div>
  )
}

export default PromoSection

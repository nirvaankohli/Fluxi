import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="w-full max-w-[50%] pl-8 md:pl-16 lg:pl-24 pr-4 md:pr-8 lg:pr-12 flex flex-col items-start text-left">
      <div className="w-full mb-6 md:mb-8">
        <h1
          className="text-black font-normal leading-tight"
          style={{
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: 'clamp(2rem, 8vw, 5.2rem)',
            fontWeight: 400,
            color: 'rgba(0,0,0,1)',
            lineHeight: '1.1'
          }}
        >
          The Study Hub That Adapts to you.
        </h1>
      </div>

      <div
        className="w-full mb-8 md:mb-12"
        style={{
          fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
          fontSize: 'clamp(1.125rem, 3vw, 1.875rem)',
          fontWeight: 400,
          color: 'rgba(72,72,72,1)',
          lineHeight: '1.3'
        }}
      >
       With Fluxi, what once took years to learn can now be mastered in weeks—or even days. Study smarter, learn faster, achieve more.
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
        <button
          className="flex justify-center items-center border-0 bg-transparent cursor-pointer transition-transform hover:scale-105 w-full sm:w-auto"
          style={{
            width: 'clamp(200px, 45vw, 220px)',
            height: 'clamp(60px, 12vw, 73px)',
            borderRadius: '20px',
            backgroundColor: '#2D2D2D',
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: 'clamp(1rem, 4vw, 1.5rem)',
            fontWeight: 400,
            color: 'rgba(255,255,255,1)',
            filter: 'drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))'
          }}
        >
          Get Started
        </button>

        <button
          className="flex justify-center items-center border-0 bg-transparent cursor-pointer transition-transform hover:scale-105 w-full sm:w-auto"
          style={{
            width: 'clamp(200px, 45vw, 220px)',
            height: 'clamp(60px, 12vw, 73px)',
            borderRadius: '20px',
            background: 'rgba(217, 217, 217, 0.13)',
            boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(1px)',
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: 'clamp(1.15rem, 4vw, 1.7rem)',
            fontWeight: 400,
            color: 'rgba(0,0,0,1)'
          }}
        >
          Why Us?
        </button>
      </div>
    </div>
  );
};

export default Hero;

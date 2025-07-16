'use client'
import { useState, useEffect } from 'react';

const HeroBanner: React.FC = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section
            className="relative w-full h-[650px] bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: "url('/download.jpg')",
                transform: `translateY(${scrollPosition * 0.1}px)`,
            }}
        >
            <div className="absolute inset-0 bg-black opacity-70"></div>
            
            {/* Area miring di bawah banner dengan z-index lebih tinggi */}
            <div className="absolute bottom-[-100px] left-0 w-full h-[260px] bg-white transform skew-y-[176deg] z-20"></div>
            
            {/* Kontainer teks dengan efek parallax */}
            <div
                className="relative z-10 flex items-center justify-center flex-col w-full h-full text-center text-white"
                style={{
                    transform: `translateY(${scrollPosition * 0.6}px)`,
                }}
            >
                <h1 className="text-[50px] font-bold">
                    Ideas
                </h1>
                <p className="text-[20px]">
                    Welcome To Ideas Page from Naufal To Suitmedia
                </p>
            </div>
        </section>
    );
};

export default HeroBanner;
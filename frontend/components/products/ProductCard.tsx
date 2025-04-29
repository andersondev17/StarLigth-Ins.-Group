import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ProductProps {
    image: string;
    title: string;
    description: string;
    delay: number;
}

const ProductCard = ({ image, title, description, delay, index }: ProductProps & { index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;
        gsap.fromTo(
            cardRef.current,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                delay,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            }
        );
    }, [delay]);

    return (
        <div
            ref={cardRef}
            className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-b from-[#152642] to-[#0A1931] transition duration-500"
        >
            {/* Image container with responsive height */}
            <div className="relative w-full h-0 pb-[60%] sm:pb-[56%] md:pb-[52%] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={index === 1}
                />
            </div>

            {/* Content */}
            <div className="z-20 flex flex-col flex-grow p-4 sm:p-5 md:p-6">
                <span className="mb-2 text-sm font-semibold text-[#1E88E5]">0{(delay * 10).toFixed(0)}</span>
                <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold text-white">{title}</h3>
                <p className="mb-4 sm:mb-6 flex-grow text-sm sm:text-base text-[#B0BEC5]">{description}</p>
                <Link
                    href={`/products/${title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="mt-auto inline-flex items-center font-semibold text-[#1E88E5] transition-transform duration-300 group-hover:translate-x-2"
                >
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>

            {/* Hover line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#1E88E5] transition-all duration-500 group-hover:w-full" />
        </div>
    );
};

export default ProductCard;
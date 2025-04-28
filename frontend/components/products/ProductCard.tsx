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
const ProductCard = ({ image, title, description, delay }: ProductProps & { index: number }) => {
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
            {/* Imagen */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />

            </div>

            {/* Contenido */}
            <div className="z-20 flex flex-col flex-grow p-6">
                <span className="mb-2 text-sm font-semibold text-[#1E88E5]">0{(delay * 10).toFixed(0)}</span>
                <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
                <p className="mb-6 flex-grow text-[#B0BEC5]">{description}</p>
                <Link
                    href={`/products/${title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="mt-auto inline-flex items-center font-semibold text-[#1E88E5] transition-transform duration-300 group-hover:translate-x-2"
                >
                    Learn More
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>

            {/* Línea hover */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#1E88E5] transition-all duration-500 group-hover:w-full" />
        </div>
    );
};
export default ProductCard;
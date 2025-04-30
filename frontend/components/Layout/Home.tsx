'use client';
import Button from "@/components/ui/button";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Registramos ScrollTrigger solo cuando es necesario
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRevealRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detector de dispositivo móvil
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const updateMobile = () => setIsMobile(mediaQuery.matches);

        mediaQuery.addEventListener('change', updateMobile);
        updateMobile(); // Valor inicial

        return () => mediaQuery.removeEventListener('change', updateMobile);
    }, []);

    // Animaciones GSAP
    useEffect(() => {
        if (!imagesLoaded || !heroRef.current || !contentRef.current || !imageRevealRef.current) return;

        const ctx = gsap.context(() => {
            // Animación de entrada del contenido
            gsap.fromTo(".hero-content > *",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }
            );

            // Animación del efecto reveal usando el div con clase overlay
            gsap.fromTo(imageRevealRef.current,
                { clipPath: 'circle(31.1% at 64% 64%)' },
                isMobile
                    ? {
                        clipPath: 'circle(150% at 50% 65%)',
                        duration: 1.2,
                        delay: 0.3,
                        ease: "power2.inOut"
                    }
                    : {
                        clipPath: 'circle(150% at 50% 65%)',
                        scrollTrigger: {
                            trigger: heroRef.current,
                            start: 'top top',
                            end: 'bottom center',
                            scrub: 1,
                        }
                    }
            );

            // Movimiento del contenido hacia abajo con valores más grandes para asegurar que se esconda
            gsap.to(contentRef.current, {
                y: isMobile ? 300 : 300,
                opacity: 0,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: isMobile ? '60% top' : '50% top',
                    scrub: 0.8,
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, [imagesLoaded, isMobile]);

    // Manejador de carga de imágenes - ahora solo necesitamos uno
    const handleImagesLoaded = () => setImagesLoaded(true);

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative h-[100svh] overflow-hidden"
        >
            {/* Una única imagen para el fondo con media queries en CSS */}
            <div className="absolute inset-0 z-[1]">
                <Image
                    src={isMobile ? "/img/heroMobile.webp" : "/img/hero.jpg"}
                    alt="Starry night with mountain silhouette"
                    fill
                    priority={true}
                    quality={isMobile ? 60 : 75}
                    sizes="100vw"
                    className="object-cover brightness-50"
                    placeholder="blur"
                    decoding="async"
                    blurDataURL={isMobile
                        ? "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSDIAAAABD3D1/1BERFHrGgBENDY2BgA="
                        : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAeEAABBAEFAAAAAAAAAAAAAAABAAIDBAURBhITYf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AKfR5bTLjrDmkkbAwujYXENA4AJPQREoj//Z"
                    }
                    onLoad={handleImagesLoaded}
                />
            </div>

            {/* Capa de revelación */}
            <div
                ref={imageRevealRef}
                className="absolute inset-0 z-[10] overflow-hidden"
            >
                {/* Una única instancia de imagen con manejo responsivo */}
                <Image
                    src={isMobile ? "/img/heroMobile.webp" : "/img/hero.jpg"}
                    alt="Starry night with mountain silhouette"
                    fill
                    quality={isMobile ? 60 : 75}
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            {/* Contenido del hero */}
            <div
                ref={contentRef}
                className="hero-content absolute z-[20] 
                    top-1/4 sm:top-1/3 
                    left-4 sm:left-12 md:left-16 lg:left-24 
                    max-w-[280px] xs:max-w-[320px] sm:max-w-md md:max-w-lg
                    px-2 sm:px-0"
            >
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Your Trusted <span className="text-primary-100">Insurance Partner</span>
                </h1>

                <p className="mt-3 sm:mt-6 text-base xs:text-lg sm:text-xl md:text-2xl text-light-100">
                    Securing Futures, Illuminating Protection
                </p>

                <div className="mt-5 sm:mt-8">
                    <Button
                        containerClass="
                            w-fit bg-primary-200 text-dark-100 hover:bg-primary-200/80 
                            rounded-full font-bold cursor-pointer transition-all duration-300
                            text-sm sm:text-base 
                            px-4 sm:px-5 md:px-6
                            py-2 sm:py-2.5 md:py-3
                            min-h-8 sm:min-h-10
                            hover:scale-105
                        "
                        title="Contact an Agent"
                    >
                        <Link href="/contact">Contact an Agent</Link>
                    </Button>
                </div>
            </div>

            {/* Indicador de scroll - visible en todas las resoluciones */}
            <div className="absolute bottom-8 right-6 sm:right-8 z-[25] flex flex-col items-center">
                <p className="text-white font-medium tracking-widest text-xs sm:text-sm uppercase mb-2 opacity-80">
                    Scroll
                </p>
                <div className="w-6 h-10 border border-white/40 rounded-full flex justify-center">
                    <div className="w-1.5 h-3 bg-white/80 rounded-full mt-1 animate-bounce"></div>
                </div>
            </div>

            {/* Gradiente de transición */}
            <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-24 
                bg-gradient-to-t from-dark-100/60 sm:from-dark-100/40 to-transparent z-[15]"></div>
        </section>
    );
};

export default Hero;
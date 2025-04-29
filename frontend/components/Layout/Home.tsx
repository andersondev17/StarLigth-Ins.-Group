'use client';
import Button from "@/components/ui/button";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación inicial de entrada
            gsap.timeline({ defaults: { ease: 'power3.out' } })
                .fromTo(".hero-content > *",
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.15 }
                );

            // Animación de la imagen al hacer scroll
            gsap.fromTo(".image-reveal",
                { clipPath: 'circle(31.1% at 64% 64%)' },
                {
                    clipPath: 'circle(150% at 50% 65%)',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom center',
                        scrub: 1,
                    }
                }
            );

            // Animación del contenido: desplazamiento moderado que no corte el botón
            if (contentRef.current) {
                gsap.to(contentRef.current, {
                    y: 100, // Valor más moderado para evitar que se corte el botón
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: '60% top', // Un poco más largo para que sea más suave
                        scrub: 0.8, // Más suave para evitar movimientos bruscos
                    }
                });
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative h-dvh overflow-hidden"
        >
            <div className="absolute inset-0">
                <Image
                    src="/img/hero.jpg"
                    alt="Starry night with mountain silhouette"
                    fill
                    priority
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="brightness-50 hidden sm:block"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSDIAAAABD3D1/1BERFHrGgBENDY2BgA="
                />
                <Image
                    src="/img/heroMobile.webp"
                    alt="Starry night with mountain silhouette"
                    fill
                    priority
                    quality={75}
                    sizes="100vw"
                    className="brightness-50 sm:hidden"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSDIAAAABD3D1/1BERFHrGgBENDY2BgA="
                />
            </div>

            {/* Reveal image simplificado */}
            <div className="image-reveal absolute inset-0 z-10">
                <Image
                    src="/img/hero.jpg"
                    alt="Starry night with mountain silhouette"
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="hidden sm:block"
                />
                <Image
                    src="/img/heroMobile.webp"
                    alt="Starry night with mountain silhouette"
                    fill
                    quality={90}
                    sizes="100vw"
                    className="sm:hidden"
                />
            </div>

            {/* Contenido simplificado */}
            <div ref={contentRef} className="hero-content absolute z-30 top-1/4 left-6 sm:left-12 md:left-16 lg:left-24 max-w-md sm:max-w-lg px-4 sm:px-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Your Trusted <span className="text-primary-100">Insurance Partner</span>
                </h1>
                <p className="mt-6 text-xl md:text-2xl text-light-100">
                    Securing Futures, Illuminating Protection
                </p>
                <div className="mt-8">
                    <Button
                        containerClass="btn-primary py-3 px-8 text-lg hover:scale-105"
                        title="Contact an Agent"
                    >
                        <Link href="/contact">Contact an Agent</Link>
                    </Button>
                </div>
            </div>
            <div className="absolute bottom-4 right-4 z-50 text-white font-semibold tracking-widest text-sm sm:text-base uppercase">
                (Scroll Down)
            </div>


        </section>
    );
};

export default Hero;
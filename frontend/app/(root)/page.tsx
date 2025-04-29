'use client';
import Home from "@/components/Layout/Home";
import ProductsShowcase from "@/components/ProductsShowcase";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

// Registramos ScrollTrigger en el cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Page = () => {
  const pageRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const decoratorRef = useRef<HTMLDivElement>(null);

  // Efecto para las animaciones de transición entre secciones estilo Awwwards
  useEffect(() => {
    if (!pageRef.current || !productsRef.current || !decoratorRef.current) return;

    const ctx = gsap.context(() => {
      // Animación de entrada del decorador
      gsap.fromTo(decoratorRef.current,
        { 
          width: "0%", 
          opacity: 0 
        },
        {
          width: "2rem",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de la sección de productos al hacer scroll
      gsap.fromTo(productsRef.current,
        { 
          y: 30, 
          opacity: 0.8 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5
          }
        }
      );

      // Efecto parallax entre secciones
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          // Aplicar efecto de parallax al hacer scroll
          const progress = self.progress;
          gsap.set(productsRef.current, {
            borderTopLeftRadius: `${2.5 - (progress * 0.5)}rem`,
            borderTopRightRadius: `${2.5 - (progress * 0.5)}rem`,
          });
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden perspective-1000">
      {/* Hero Section con máscara de transición mejorada */}
      <div className="relative">
        <Home />
        
        {/* Gradiente mejorado con mayor tamaño y opacidad variable */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-dark-100/90 via-dark-100/40 to-transparent z-20"></div>
      </div>

      {/* Products Section con superposición estilo Awwwards */}
      <div 
        ref={productsRef}
        className="relative z-30 bg-dark-100 rounded-t-[2.5rem] -mt-24 sm:-mt-32 md:-mt-40 
          shadow-xl transform-gpu will-change-transform transition-all duration-300"
      >
        <div className="w-full h-24 bg-dark-100 rounded-t-[2.5rem] flex items-center justify-center">
          {/* Línea decorativa con animación */}
          <div 
            ref={decoratorRef}
            className="h-1 bg-gradient-to-r from-primary-200/10 via-primary-200 to-primary-200/10 
              mx-auto rounded-full transition-all duration-700"
          ></div>
        </div>
        
        {/* Contenido de productos con animación staggered */}
        <div className="products-content">
          <ProductsShowcase />
        </div>
      </div>
      
      {/* Overlay para manejo de scroll suave entre secciones */}
      <div className="fixed inset-0 pointer-events-none z-[-1]"></div>
    </main>
  );
};

export default Page;
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

  // Efecto para las animaciones de transición entre secciones
  useEffect(() => {
    if (!pageRef.current || !productsRef.current) return;

    const ctx = gsap.context(() => {
      // Configuración inicial de la sección de productos
      gsap.set(productsRef.current, {
        y: 100, // Posición inicial por debajo del hero
        borderRadius: "2.5rem 2.5rem 0 0" // Bordes redondeados para efecto de superposición
      });

      // Animación de "deslizar por encima" - la sección de productos sube sobre el hero
      gsap.to(productsRef.current, {
        y: 0, // Se mueve a su posición final (0)
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top bottom", // Comienza cuando la parte superior del elemento llega al fondo de la ventana
          end: "top center",   // Termina cuando la parte superior llega al centro
          scrub: 0.8,          // Efecto suave de "arrastre"
          // markers: false,   // Para depuración 
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="relative overflow-hidden">
      {/* Hero Section */}
      <Home />
      
      {/* Products Section con efecto de superposición */}
      <div 
        ref={productsRef}
        className="relative z-30 bg-dark-100 -mt-24 sm:-mt-28 md:-mt-32 
          shadow-xl transform-gpu will-change-transform"
      >
        {/* Línea decorativa - se mueve con la sección */}
        <div className="w-full h-24 flex items-center justify-center">
          <div className="h-1 w-16 bg-gradient-to-r from-primary-200/10 via-primary-200 to-primary-200/10 
            rounded-full"></div>
        </div>
        
        {/* Contenido de productos */}
        <ProductsShowcase />
        
        {/* Espacio adicional al final */}
        <div className="h-24"></div>
      </div>
    </main>
  );
};

export default Page;
// ProductsShowcase.tsx
import ProductCard from '@/components/products/ProductCard';
import { createStars } from '@/lib/animationUtils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProductsShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      image: '/img/products/homeowners.webp',
      title: 'Homeowners Insurance',
      description:
        'Safeguard your home sweet home with our homeowners insurance.',
      delay: 0.1
    },
    {
      image: '/img/products/condo.webp',
      title: 'Condo Insurance',
      description:
        'Navigate the complexities of business risks with our tailored commercial insurance.',
      delay: 0.3
    },
    {
      image: '/img/products/commercial.webp',
      title: 'Commercial Insurance',
      description:
        "Elevate your condo living experience with our specialized condo insurance",
      delay: 0.5
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Animación del título
    gsap.fromTo(
      titleRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=150',
          toggleActions: 'play none none none'
        }
      }
    );

    // Crear y animar estrellas
    if (sectionRef.current) {
      createStars(sectionRef.current);
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-[#0A1931] to-[#152642]"
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-[#0A1931]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }} />

      <div className="container mx-auto px-4" ref={titleRef}>
        <span className="block mb-3 text-sm font-semibold text-center uppercase tracking-wider text-primary-200">
          - Our Protection Plans -
        </span>
        <h2 className="mb-6 text-center text-5xl font-bold text-white">
          Products  <br />
          Designed for <span className="text-primary-200">Your Life</span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-xl text-light-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((prod, i) => (
          <ProductCard key={prod.title} index={i + 1} {...prod} />
        ))}
      </div>

      <div className="mt-20 text-center">
        <Link
          href="/products"
          className="inline-block rounded-full bg-[#1E88E5] px-8 py-4 font-bold text-[#0A1931] transition-transform duration-300 hover:scale-105 hover:bg-opacity-80 shadow-lg"
        >
          Explore All Insurance Options
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-[#152642]" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }} />
    </section>
  );
};

export default ProductsShowcase;

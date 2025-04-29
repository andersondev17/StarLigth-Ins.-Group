'use client';
import Home from "@/components/Layout/Home";
import ProductsShowcase from "@/components/ProductsShowcase";

const Page = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <Home />
        
        {/* Gradiente sutil para mejorar la transición */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-100/40 to-transparent z-20"></div>
      </div>

      {/* Products Section con superposición estilo Awwwards */}
      <div className="relative z-40 bg-dark-100 rounded-t-[2.5rem] -mt-20 sm:-mt-28 md:-mt-32 shadow-xl transform-gpu">
        <div className="w-full h-20 bg-dark-100 rounded-t-[2.5rem]">
          {/* Línea decorativa sutil */}
          <div className="w-16 h-1 bg-primary-200/30 mx-auto mt-6 rounded-full"></div>
        </div>
        <ProductsShowcase />
      </div>
    </main>
  );
};

export default Page;
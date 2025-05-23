'use client';

import Footer from "@/components/Layout/Footer";
import NavBar from "@/components/Layout/navbar/Navbar";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // Page transition effect
  useEffect(() => {
    startTransition(() => {
      setPageLoaded(true);
    });    
    // Reset scroll position on page change
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, [pathname]);

  return (
    <div className={`flex flex-col min-h-screen ${pageLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
      {/* Navbar */}
      <NavBar />
      
      {/* Main content */}
      <main className="flex-grow relative">
        {children}
      </main>
      
      <Footer />
      {/* Footer */}
    </div>
  );
};

export default RootLayout;
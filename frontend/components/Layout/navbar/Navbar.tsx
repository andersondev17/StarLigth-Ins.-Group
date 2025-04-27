'use client';
// Navbar.tsx
import { NAV_ITEMS, NAV_ITEMS_MOBILE } from "@/constants/navData";
import { useScrollNavbar } from "@/hooks/useScrollNavbar";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import ContactInfo from "./ContactInfo";
import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import NavItem from "./NavItem";

// Carga diferida de GSAP
const loadGSAP = () => import("gsap").then(gsap => gsap);
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isScrolled, navRef } = useScrollNavbar();
    const menuRef = useRef<HTMLDivElement>(null);
    const gsapRef = useRef<any>(null);

    const handleNavigation = (id: string) => {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const toggleMenu = () => {
        setIsMenuOpen(prev => {
            document.body.style.overflow = !prev ? 'hidden' : '';
            return !prev;
        });
    };

    // Cargar GSAP solo cuando sea necesario
    useEffect(() => {
        if (isMenuOpen) {
            loadGSAP().then(gsap => {
                gsapRef.current = gsap;
            });
        }
    }, [isMenuOpen]);

    // Animación optimizada
    const animateMenu = (shouldOpen: boolean) => {
        if (!menuRef.current || !gsapRef.current) return;
        
        gsapRef.current.to(menuRef.current, {
            opacity: shouldOpen ? 1 : 0,
            duration: 0.2,
            ease: "power2.out",
            overwrite: true
        });
    };

    useEffect(() => {
        animateMenu(isMenuOpen);
    }, [isMenuOpen]);


    // Close menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isMenuOpen) {
                setIsMenuOpen(false);
                document.body.style.overflow = '';
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed inset-x-0 z-50 transition-all duration-500 ${
                    isScrolled ? "py-3" : "py-8"
                }`}
            >
                <div className="max-w-8xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo component */}
                    <Logo isScrolled={isScrolled} />

                    {/* Navigation components */}
                    <div className="relative">
                        {/* Desktop navigation  */}
                        <DesktopNav 
                            items={NAV_ITEMS} 
                            isMenuOpen={isMenuOpen}
                            toggleMenu={toggleMenu}
                            handleNavigation={handleNavigation}
                        />

                        {/* Mobile navigation toggle */}
                        <MobileNav 
                            isMenuOpen={isMenuOpen} 
                            toggleMenu={toggleMenu} 
                        />
                    </div>
                </div>
            </nav>

            {/* Full screen menu  */}
            <div 
                ref={menuRef}
                className={`fixed inset-0 z-40 bg-white transition-opacity duration-300 ${
                    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                
                <div className="max-w-7xl mx-auto px-8 py-30 flex h-full">
                    
                    <div className="flex w-full">
                        {/* Left side - Navigation opened categories - using NAV_ITEMS_MOBILE */}
                        <div className="w-1/3 pr-10 flex flex-col justify-center lg:block hidden">
                            <div className="flex flex-col gap-8 perspective-container" style={{ perspective: '1000px' }}>
                                {NAV_ITEMS_MOBILE.map(item => (
                                    <NavItem 
                                        key={item} 
                                        item={item} 
                                        handleNavigation={handleNavigation}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right side - Additional content (desktop only) */}
                        <div className="w-2/3 pl-10 py-30 border-l border-gray-200 flex flex-col justify-between lg:flex hidden">
                            {/* Feature highlight */}
                            <div className="flex flex-col gap-6 max-w-2xl bg-white/95 p-8 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-bold text-dark-100">Insurance For Your Future</h3>
                                <p className="text-dark-300/80 text-lg">
                                    StarLight Insurance provides comprehensive coverage options for individuals, families, and businesses. Our team of experienced agents is ready to help you navigate the complexities of insurance.
                                </p>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 text-[#1E88E5] hover:text-[#1E88E5]/80 font-medium font-Montserrat"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigation("#contact");
                                        toggleMenu();
                                    }}
                                >
                                    Learn more about our plans
                                    <TiLocationArrow className="text-lg" />
                                </a>
                            </div>

                            {/* Contact info */}
                            <div className="mt-auto pt-10 flex justify-between items-end">
                                <div className="bg-white/95 p-8 rounded-lg shadow-lg">
                                    <ContactInfo className="text-black text-lg" />
                                </div>
                                
                            </div>
                        </div>
                        
                        {/* Mobile menu content - Using NAV_ITEMS_MOBILE for mobile */}
                        <div className="flex flex-col h-full relative w-full lg:hidden">
                            {/* Menu Items - Vertical Layout for Mobile */}
                            <div className="flex flex-col gap-4 mb-10 perspective-container" style={{ perspective: '1000px' }}>
                                {NAV_ITEMS_MOBILE.map(item => (
                                    <NavItem 
                                        key={item} 
                                        item={item} 
                                        handleNavigation={handleNavigation}
                                    />
                                ))}
                            </div>

                            {/* Contact Info & CTA */}
                            <div className="mt-auto">
                                <ContactInfo className="text-dark-300/70 mb-6" />

                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 mt-4"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigation("#contact");
                                    }}
                                >
                                    <span className="text-dark-100 text-base font-medium">Find an Agent</span>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-100 text-white">
                                        <TiLocationArrow className="text-lg" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
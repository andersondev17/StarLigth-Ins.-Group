'use client';
import { NAV_ITEMS } from "@/constants/navData";
import { useScrollNavbar } from "@/hooks/useScrollNavbar";
import { MenuToggleButtonProps } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import Logo from "./Logo";
import MenuContent from "./MenuContent";
import NavItem from "./NavItem";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isScrolled, navRef } = useScrollNavbar();
    const menuRef = useRef<HTMLDivElement>(null);

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

                    {/* Navigation components - Combined desktop/mobile */}
                    <div className="relative">
                        {/* Desktop navigation */}
                        <div className="hidden lg:flex items-center">
                            <div className="bg-[#ffffff] backdrop-blur-md rounded-3xl px-8 py-2 flex items-center">
                                {/* Menu Items */}
                                <div className="flex gap-8">
                                    {NAV_ITEMS.map((item) => (
                                        <NavItem 
                                            key={item} 
                                            item={item} 
                                            handleNavigation={handleNavigation} 
                                        />
                                    ))}
                                </div>

                                {/* Menu Separator */}
                                <div className="w-px h-8 bg-primary-200/20 mx-6"></div>

                                {/* Menu Toggle Button */}
                                <MenuToggleButton 
                                    isMenuOpen={isMenuOpen} 
                                    toggleMenu={toggleMenu} 
                                    className="bg-dark-100 text-white hover:bg-dark-200" 
                                />
                            </div>
                        </div>

                        {/* Mobile navigation toggle */}
                        <MenuToggleButton 
                            isMenuOpen={isMenuOpen} 
                            toggleMenu={toggleMenu} 
                            className="lg:hidden bg-white text-black hover:bg-white/20" 
                        />
                    </div>
                </div>
            </nav>

            {/* Consolidated Menu Content */}
            <MenuContent
                isOpen={isMenuOpen}
                menuRef={menuRef}
                handleNavigation={handleNavigation}
                toggleMenu={toggleMenu}
            />
        </>
    );
};

// toggle button as a helper component
const MenuToggleButton = ({ isMenuOpen, toggleMenu, className = "" }: MenuToggleButtonProps) => (
    <button
        className={`rounded-full p-3 backdrop-blur-md transition-colors duration-200 ${className}`}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={toggleMenu}
    >
        {isMenuOpen ? (
            <HiX size={20} className="transition-all duration-300 rotate-0" />
        ) : (
            <HiMenuAlt4 size={20} className="transition-all duration-300 rotate-0" />
        )}
    </button>
);

export default Navbar;
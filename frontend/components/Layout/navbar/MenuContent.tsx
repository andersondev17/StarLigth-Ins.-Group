import { NAV_ITEMS_MOBILE } from "@/constants/navData";
import { MenuContentProps } from "@/types/types";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import NavItem from "./NavItem";

const MenuContent = ({ isOpen, menuRef, handleNavigation }: MenuContentProps) => {
    const [isMobileView, setIsMobileView] = useState(false);

    // Detect mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobileView(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div
            ref={menuRef}
            className={`fixed inset-0 py-20 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Background with blur */}
            <div className="absolute inset-0 bg-dark-100/90 backdrop-blur-sm"></div>

            <div className="relative z-45 h-full flex flex-col">
                <div className="flex-1 flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 px-8 lg:px-16 py-20 flex flex-col justify-center">
                        <div className="flex flex-col gap-6 perspective-container">
                            {NAV_ITEMS_MOBILE.map((item) => (
                                <div key={item} className="py-2">
                                    <NavItem
                                        item={item}
                                        handleNavigation={handleNavigation}
                                        isLarge={true}
                                        isMobile={isMobileView}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-6 border-t border-white/10">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-white hover:text-primary-200 transition-colors"
                            >
                                <FaInstagram size={20} />
                                <span className="text-sm tracking-wider">INSTAGRAM</span>
                            </a>
                        </div>

                        {/* Legal links (similar to OH Architecture) */}
                        <div className="mt-6 flex flex-row  gap-6 text-xs text-light-400">
                            <a
                                href="/privacy-policy"
                                className="hover:text-white tracking-wider transition-colors"
                            >
                                PRIVACY POLICY
                            </a>
                            <a
                                href="/terms-of-service"
                                className="hover:text-white tracking-wider transition-colors"
                            >
                                TERMS OF SERVICE
                            </a>

                        </div>
                        <div className="mt-6 flex flex-col lg:flex-row gap-6 text-xs text-light-400">
                            <a href="mailto:contact@starlight.com" className="block transition-colors hover:text-primary-200 font-medium mb-1">
                                contact@starlight.com
                            </a>
                            <a
                                href="/terms-of-service"
                                className="hover:text-white tracking-wider transition-colors"
                            >
                                123 Insurance Avenue                            </a>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default MenuContent;
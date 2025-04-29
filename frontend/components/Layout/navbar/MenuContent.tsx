import AnimatedText from "@/components/ui/AnimatedText";
import { NAV_ITEMS_MOBILE } from "@/constants/navData";
import { MenuContentProps } from "@/types/types";
import { useEffect, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import ContactInfo from "./ContactInfo";
import NavItem from "./NavItem";

const MenuContent = ({ isOpen, menuRef, handleNavigation, toggleMenu }: MenuContentProps) => {
    const [isMobileView, setIsMobileView] = useState(false);
    
    // Detectar si estamos en vista móvil
    useEffect(() => {
        const checkMobile = () => {
            setIsMobileView(window.innerWidth < 1024);
        };
        
        // Comprobar al inicio
        checkMobile();
        
        // Comprobar al cambiar tamaño de ventana
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div 
            ref={menuRef}
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            {/* Fondo transparente con blur */}
            <div className="absolute inset-0 bg-transparent backdrop-blur-md"></div>
            
            {/* Overlay semitransparente para legibilidad */}
            <div className="absolute inset-0 bg-dark-100/60"></div>

            <div className="relative z-45 max-w-7xl mx-auto px-8 py-8 h-full flex">
                <div className="flex w-full">
                    {/* Navigation Items */}
                    <div className="w-full lg:w-1/3 lg:pr-10 flex flex-col justify-center">
                        <div className="flex flex-col gap-8 perspective-container">
                            {NAV_ITEMS_MOBILE.map((item) => (
                                <NavItem 
                                    key={item} 
                                    item={item} 
                                    handleNavigation={handleNavigation}
                                    isLarge={!isMobileView} // Solo grande en desktop
                                    isMobile={isMobileView} // Indicar si es móvil
                                />
                            ))}
                        </div>
                    </div>

                    {/* Additional content - desktop only */}
                    <div className="hidden lg:flex w-2/3 pl-10 py-20 border-l border-white/10 flex-col justify-between">
                        {/* Feature highlight */}
                        <div className="flex flex-col gap-6 max-w-2xl bg-white/95 p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-dark-100">Insurance For Your Future</h3>
                            <p className="text-dark-300/80 text-lg">
                                StarLight Insurance provides comprehensive coverage options for individuals, families, and businesses. Our team of experienced agents is ready to help you navigate the complexities of insurance.
                            </p>
                            
                            {/* Usando AnimatedText para el enlace de Learn more */}
                            <div className="group flex items-center">
                                <AnimatedText
                                    asLink={true}
                                    href="#contact"
                                    baseColor="#1E88E5"
                                    className="inline-flex items-center gap-2 font-medium"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigation("#contact");
                                        toggleMenu();
                                    }}
                                >
                                    Learn more about our plans
                                </AnimatedText>
                                <TiLocationArrow className="ml-2 transform transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>

                        {/* Contact info */}
                        <div className="mt-auto flex justify-between items-end">
                            <div className="bg-white/95 p-8 rounded-lg shadow-lg">
                                <ContactInfo className="text-black text-lg" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile-only content */}
                    <div className="lg:hidden w-full flex flex-col justify-end pb-8">
                        <div className="bg-white/95 p-6 rounded-lg shadow-lg">
                            <ContactInfo className="text-black" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuContent;
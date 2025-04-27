import { useRef } from "react";
import { HiX } from "react-icons/hi";
import { TiLocationArrow } from "react-icons/ti";
import ContactInfo from "./ContactInfo";

interface DesktopMenuProps {
    isMenuOpen: boolean;
    items: readonly string[];
    handleNavigation: (id: string) => void;
    toggleMenu: () => void;
}

const DesktopMenu = ({ isMenuOpen, items, handleNavigation, toggleMenu }: DesktopMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <div 
            ref={menuRef}
            className={`hidden lg:block fixed inset-0 z-40 bg-white/95 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="max-w-7xl mx-auto px-8 py-8 flex h-full">
                <div className="flex w-full">
                    {/* Left side - Navigation categories */}
                    <div className="w-1/3 pr-10 flex flex-col justify-center">
                        <div className="flex flex-col gap-8">
                            {items.map(item => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigation(`#${item.toLowerCase().replace(/\s+/g, '-')}`);
                                    }}
                                    className="text-dark-100 text-4xl font-bold transition-all duration-200 hover:text-primary-200"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Additional content */}
                    <div className="w-2/3 pl-10 py-30 border-l border-gray-200 flex flex-col justify-between">
                        {/* Feature highlight */}
                        <div className="flex flex-col gap-6 max-w-2xl bg-white/95 p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-dark-100">Insurance For Your Future</h3>
                            <p className="text-dark-300/80 text-lg">
                                StarLight Insurance provides comprehensive coverage options for individuals, families, and businesses. Our team of experienced agents is ready to help you navigate the complexities of insurance.
                            </p>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-primary-200 hover:text-primary-200/80 font-medium"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation("#contact");
                                    toggleMenu();
                                }}
                            >
                                Learn more about our plans
                                <TiLocationArrow />
                            </a>
                        </div>

                        {/* Contact info */}
                        <div className="mt-auto pt-10 flex justify-between items-end">
                            <div className="bg-white/95 p-8 rounded-lg shadow-lg">
                                <ContactInfo className="text-black text-lg" />
                            </div>
                            
                            <button
                                onClick={toggleMenu}
                                className="rounded-full p-3 bg-dark-100 text-white hover:bg-dark-300 transition-all duration-300"
                                aria-label="Close menu"
                            >
                                <HiX size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopMenu;
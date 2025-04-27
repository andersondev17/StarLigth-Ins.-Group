import { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import ContactInfo from "./ContactInfo";

interface MobileMenuProps {
    isMenuOpen: boolean;
    items: readonly string[];
    handleNavigation: (id: string) => void;
}

const MobileMenu = ({ isMenuOpen, items, handleNavigation }: MobileMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <div 
            ref={menuRef}
            className={`lg:hidden fixed inset-0 z-40 bg-white/95 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="flex flex-col h-full px-8 py-20 relative">
                {/* Menu Items - Vertical Layout for Mobile */}
                <div className="flex flex-col gap-4 mb-10">
                    {items.map(item => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation(`#${item.toLowerCase().replace(/\s+/g, '-')}`);
                            }}
                            className="text-dark-100 text-3xl font-medium transition-all duration-200 hover:text-primary-200 py-3"
                        >
                            {item}
                        </a>
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
                            <TiLocationArrow />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
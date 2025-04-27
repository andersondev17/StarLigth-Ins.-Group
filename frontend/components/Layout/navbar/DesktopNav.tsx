import { HiMenuAlt4, HiX } from "react-icons/hi";
import NavItem from "./NavItem";

interface DesktopNavProps {
    items: readonly string[];
    isMenuOpen: boolean;
    toggleMenu: () => void;
    handleNavigation: (id: string) => void;
}

const DesktopNav = ({ items, isMenuOpen, toggleMenu, handleNavigation }: DesktopNavProps) => {
    return (
        <div className="hidden lg:flex items-center">
            <div className="bg-[#ffffff] backdrop-blur-md rounded-3xl px-8 py-2 flex items-center perspective-container" style={{ perspective: '1000px' }}>
                {/* Menu Items */}
                <div className="flex gap-8">
                    {items.map((item) => (
                        <NavItem 
                            key={item} 
                            item={item} 
                            handleNavigation={handleNavigation} 
                        />
                    ))}
                </div>

                {/* Menu Separator */}
                <div className="w-px h-8 bg-primary-200/20 mx-6"></div>

                {/* Menu Button with Transform Effect */}
                <button
                    className="rounded-full p-3 bg-dark-100 text-white hover:bg-dark-200 transition-all duration-300 relative"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <HiX size={20} className="transition-all duration-300 rotate-0" />
                    ) : (
                        <HiMenuAlt4 size={20} className="transition-all duration-300 rotate-0" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default DesktopNav;
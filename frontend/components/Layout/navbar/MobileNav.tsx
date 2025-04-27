import { HiMenuAlt4, HiX } from "react-icons/hi";

interface MobileNavProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

const MobileNav = ({ isMenuOpen, toggleMenu }: MobileNavProps) => {
    return (
        <button
            className="lg:hidden rounded-full p-3 bg-white backdrop-blur-md text-black hover:bg-white/20 transition-colors duration-200"
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
};

export default MobileNav;
import { RefObject } from "react";

export interface MenuToggleButtonProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    className?: string;
}
export interface NavItemProps {
    item: string;
    handleNavigation: (id: string) => void;
    isLarge?: boolean;
    isMobile?: boolean;
}

export interface MenuContentProps {
    isOpen: boolean;
    menuRef: RefObject<HTMLDivElement | null>;
    handleNavigation: (id: string) => void;
    toggleMenu: () => void;
}

export interface LogoProps {
    isScrolled: boolean;
    isPastHero: boolean;
    className?: string;
    isCompact?: boolean;
}

export interface ContactInfoProps {
    className?: string;
}
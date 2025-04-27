// In useScrollNavbar.tsx
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

export const useScrollNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const navRef = useRef<HTMLDivElement>(null);
    const { y: scrollY } = useWindowScroll();
    const lastScrollY = useRef(0);

    // Simplified navbar animation with CSS instead of GSAP
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Determine if scrolled
            setIsScrolled(currentScrollY > 20);
            
            // Determine if should hide/show navbar
            if (currentScrollY > 100) {
                setIsVisible(lastScrollY.current > currentScrollY);
            } else {
                setIsVisible(true);
            }
            
            lastScrollY.current = currentScrollY;
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { isScrolled, isVisible, navRef };
};
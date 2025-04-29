import { NavItemProps } from '@/types/types';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const NavItem = ({ item, handleNavigation, isLarge = false, isMobile = false }: NavItemProps) => {
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!itemRef.current) return;

        const elem = itemRef.current;
        const label = elem.querySelector('.nav-label');
        if (!label) return;
        
        // Definir el color base y el color hover
        const baseColor = isLarge || isMobile ? "#FFFFFF" : "#000000";
        const hoverColor = "#1E88E5"; // StarLight blue
        
        // Create mouse enter animation handler
        const handleMouseEnter = () => {
            if (isMobile) return; // No animation for mobile
            
            // Create flip animation timeline
            const tl = gsap.timeline();
            tl.to(label, {
                duration: 0.2,
                rotationX: 90,
                y: -5,
                ease: "power1.inOut",
                transformOrigin: "center center"
            })
            .to(label, {
                duration: 0.2,
                rotationX: 0,
                y: 0,
                color: hoverColor,
                ease: "power1.inOut",
                transformOrigin: "center center"
            });
        };
        
        // Create mouse leave animation handler
        const handleMouseLeave = () => {
            if (isMobile) return; // No animation for mobile
            
            // Create reset animation timeline
            const tl = gsap.timeline();
            tl.to(label, {
                duration: 0.2,
                rotationX: -90,
                y: 5,
                ease: "power1.inOut",
                transformOrigin: "center center"
            })
            .to(label, {
                duration: 0.2,
                rotationX: 0,
                y: 0,
                color: baseColor,
                ease: "power1.inOut",
                transformOrigin: "center center"
            });
        };
        
        // Add event listeners
        elem.addEventListener('mouseenter', handleMouseEnter);
        elem.addEventListener('mouseleave', handleMouseLeave);
        
        // Cleanup function
        return () => {
            elem.removeEventListener('mouseenter', handleMouseEnter);
            elem.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isLarge, isMobile]);

    const href = `#${item.toLowerCase().replace(/\s+/g, '-')}`;

    // Simplificado: aplica directamente el color correcto según el contexto
    const textColorClass = isLarge || isMobile ? "text-white" : "text-black";

    return (
        <div
            ref={itemRef}
            className="perspective-item"
        >
            <a
                href={href}
                onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(href);
                }}
                className={`
                    ${textColorClass}
                    ${isLarge ? "text-4xl font-bold" : "font-medium text-sm tracking-wide relative group overflow-hidden block"}
                    ${isMobile ? "text-3xl py-3" : ""}
                    transition-all duration-200 hover:text-primary-200
                `}
            >
                <span className="nav-label inline-block">
                    {item}
                </span>
                {!isLarge && !isMobile && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-200 transition-all duration-300 group-hover:w-full"></span>
                )}
            </a>
        </div>
    );
};

export default NavItem;
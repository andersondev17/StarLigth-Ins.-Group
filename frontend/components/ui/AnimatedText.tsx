'use client';
import gsap from 'gsap';
import { useCallback, useEffect, useRef } from 'react';

interface AnimatedTextProps {
    children: React.ReactNode;
    className?: string;
    baseColor?: string;
    hoverColor?: string;
    underline?: boolean;
    onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    href?: string;
    asLink?: boolean;
    disabled?: boolean;
}

/**
 * AnimatedText - Componente reutilizable para aplicar efecto de flip 3D en textos
 * 
 * Puede comportarse como un span normal o como un enlace, y aplica una animación de rotación 3D
 * al hacer hover, con cambio de color opcional y subrayado opcional.
 */
const AnimatedText = ({
    children,
    className = "",
    baseColor = "",
    hoverColor = "#1E88E5", // StarLight blue por defecto
    underline = false,
    onClick,
    href,
    asLink = false,
    disabled = false,
}: AnimatedTextProps) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const elementRef = asLink ? linkRef : textRef;

    // Función para aplicar la animación de entrada
    const handleMouseEnter = useCallback(() => {
        if (disabled || !elementRef.current) return;

        const element = elementRef.current;
        const label = element.querySelector('.animated-text-label');
        if (!label) return;

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
    }, [disabled, hoverColor, elementRef]);

    // Función para aplicar la animación de salida
    const handleMouseLeave = useCallback(() => {
        if (disabled || !elementRef.current) return;

        const element = elementRef.current;
        const label = element.querySelector('.animated-text-label');
        if (!label) return;

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
                color: baseColor || "",
                ease: "power1.inOut",
                transformOrigin: "center center"
            });
    }, [disabled, baseColor, elementRef]);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Add event listeners
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function
        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseEnter, handleMouseLeave, elementRef]);

    // Aplicar estilos de color iniciales
    const initialStyle = baseColor ? { color: baseColor } : {};

    // Estilos para el contenedor
    const containerStyle = `
    perspective-1000 inline-block relative
    ${className}
  `;

    // Estilos para cuando se renderiza con subrayado
    const underlineStyles = underline ? "group" : "";

    // Decidir qué elemento renderizar basado en la prop asLink
    if (asLink) {
        return (
            <a
                ref={linkRef}
                href={href || "#"}
                onClick={onClick}
                className={`${containerStyle} ${underlineStyles}`}
            >
                <span
                    className="animated-text-label inline-block"
                    style={initialStyle}
                >
                    {children}
                </span>
                {underline && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-200 transition-all duration-300 group-hover:w-full"></span>
                )}
            </a>
        );
    }

    return (
        <span
            ref={textRef}
            className={`${containerStyle} ${underlineStyles} ${onClick ? "cursor-pointer" : ""}`}
            onClick={onClick}
        >
            <span
                className="animated-text-label inline-block"
                style={initialStyle}
            >
                {children}
            </span>
            {underline && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-200 transition-all duration-300 group-hover:w-full"></span>
            )}
        </span>
    );
};

export default AnimatedText;
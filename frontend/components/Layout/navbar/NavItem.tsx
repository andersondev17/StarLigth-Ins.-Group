import AnimatedText from '@/components/ui/AnimatedText';
import { NavItemProps } from '@/types/types';

const NavItem = ({ item, handleNavigation, isLarge = false, isMobile = false }: NavItemProps) => {
    const href = `#${item.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Determinamos los colores base dependiendo del contexto
    const baseColor = isLarge || isMobile ? "#FFFFFF" : "#000000";
    
    // Determinamos las clases de tamaño según el contexto
    const sizeClasses = isLarge 
        ? "text-4xl font-bold" 
        : isMobile 
            ? "text-xl py-3 tracking-widest font-montserrat" 
            : "font-medium text-sm tracking-wide";

    return (
        <div className="perspective-item">
            <AnimatedText
                asLink={true}
                href={href}
                onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(href);
                }}
                className={`${sizeClasses} transition-all duration-200`}
                baseColor={baseColor}
                hoverColor="#1E88E5"
                disabled={isMobile} // Desactivar la animación en móvil
            >
                {item}
            </AnimatedText>
        </div>
    );
};

export default NavItem;
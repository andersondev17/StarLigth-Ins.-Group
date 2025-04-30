import { LogoProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ isScrolled }: LogoProps) => {
    return (
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            {/* Logo con ajustes responsivos */}
            <div className={`relative flex-shrink-0 transition-all duration-500
                ${isScrolled 
                    ? 'hidden'
                    : 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16'
                }`}
            >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 rounded-full bg-primary-200/10 filter blur-xl scale-150 opacity-70 group-hover:opacity-100 group-hover:bg-primary-200/20 transition-all duration-700"></div>
                
                {/* Imagen del logo */}
                <Image
                    src="/img/logo.png"
                    alt="StarLight Insurance Logo"
                    fill
                    className="object-contain rounded-full transition-transform duration-700 group-hover:scale-110"
                    priority
                />
            </div>
            
            {/* Texto del logo */}
            <div className="flex flex-col">
                <span className={`text-white font-bold font-montserrat tracking-wide leading-tight transition-all duration-500
                    ${isScrolled 
                        ? 'hidden' 
                        : 'text-lg sm:text-xl md:text-2xl'
                    }`}
                >
                    StarLight
                </span>
                <span className={`text-white uppercase tracking-widest font-montserrat transition-all duration-500 mt-[-2px]
                    ${isScrolled 
                        ? 'hidden' 
                        : 'text-[8px] sm:text-[9px] md:text-[10px]'
                    }`}
                >
                    Insurance Group
                </span>
            </div>
        </Link>
    );
};

export default Logo;
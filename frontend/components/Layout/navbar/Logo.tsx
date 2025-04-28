import { LogoProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ isScrolled }: LogoProps) => {
    return (
        <Link href="/" className="flex items-center gap-3 group relative">
            <div className={`relative ${isScrolled ? 'w-14 h-14' : 'w-16 h-16'} transition-all duration-500 flex-shrink-0`}>
                <div className="absolute inset-0 rounded-full bg-primary-200/10 filter blur-xl scale-150 opacity-70 group-hover:opacity-100 group-hover:bg-primary-200/20 transition-all duration-700"></div>
                <Image
                    src="/img/logo.png"
                    alt="StarLight Insurance Logo"
                    fill
                    className="object-contain z-5 transition-transform duration-700 group-hover:scale-110 rounded-full"
                    priority
                />
            </div>
            <div className="flex flex-col">
                <span className={`text-white font-bold ${
                    isScrolled ? 'text-xl' : 'text-2xl'
                } font-montserrat transition-all duration-500 tracking-wide leading-tight`}>
                    StarLight
                </span>
                <span className={`text-white uppercase tracking-widest ${
                    isScrolled ? 'text-[8px]' : 'text-[10px]'
                } font-montserrat transition-all duration-500 mt-[-2px]`}>
                    Insurance Group
                </span>
            </div>
        </Link>
    );
};

export default Logo;
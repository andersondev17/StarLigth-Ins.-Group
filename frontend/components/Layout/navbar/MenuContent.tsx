import { NAV_ITEMS_MOBILE } from "@/constants/navData";
import { MenuContentProps } from "@/types/types";
import { TiLocationArrow } from "react-icons/ti";
import ContactInfo from "./ContactInfo";
import NavItem from "./NavItem";

const MenuContent = ({ isOpen, menuRef, handleNavigation, toggleMenu }: MenuContentProps) => {
    return (
        <div
            ref={menuRef}
            className={`fixed inset-0 z-40 bg-white/95 transition-opacity duration-300 ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="max-w-7xl mx-auto px-8 py-8 flex h-full">
                {/* Mobile Menu Layout */}
                <div className="flex flex-col h-full relative w-full lg:hidden">
                    <div className="flex flex-col gap-4 mb-10 pt-16">
                        {NAV_ITEMS_MOBILE.map(item => (
                            <NavItem 
                                key={item} 
                                item={item} 
                                handleNavigation={handleNavigation}
                                isMobile
                            />
                        ))}
                    </div>

                    {/* Mobile Contact Info & CTA */}
                    <div className="mt-auto pb-8">
                        <ContactInfo className="text-dark-300/70 mb-6" />
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 mt-4"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation("#contact");
                                toggleMenu();
                            }}
                        >
                            <span className="text-dark-100 text-base font-medium">Find an Agent</span>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-100 text-white">
                                <TiLocationArrow />
                            </div>
                        </a>
                    </div>
                </div>
                
                {/* Desktop Menu Layout */}
                <div className="hidden lg:flex w-full">
                    {/* Left side - Navigation */}
                    <div className="w-1/3 pr-10 py-8 flex flex-col justify-center">
                        <div className="flex flex-col gap-8">
                            {NAV_ITEMS_MOBILE.map(item => (
                                <NavItem 
                                    key={item} 
                                    item={item} 
                                    handleNavigation={handleNavigation}
                                    isLarge
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right side - Feature Content */}
                    <div className="w-2/3 pl-10 py-20 border-l border-gray-200 flex flex-col justify-between">
                        {/* Feature highlight */}
                        <div className="flex flex-col gap-6 max-w-2xl bg-white/95 p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-dark-100">Insurance For Your Future</h3>
                            <p className="text-dark-300/80 text-lg">
                                StarLight Insurance provides comprehensive coverage options for individuals, families, and businesses. Our team of experienced agents is ready to help you navigate the complexities of insurance.
                            </p>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-primary-200 hover:text-primary-200/80 font-medium"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation("#contact");
                                    toggleMenu();
                                }}
                            >
                                Learn more about our plans
                                <TiLocationArrow />
                            </a>
                        </div>

                        {/* Contact info */}
                        <div className="mt-auto pt-10 flex justify-between items-end">
                            <div className="bg-white/95 p-8 rounded-lg shadow-lg">
                                <ContactInfo className="text-black text-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuContent;
import { ContactInfoProps } from "@/types/types";

const ContactInfo = ({ className = "" }: ContactInfoProps) => {
    return (
        <div className={`text-sm leading-relaxed font-montserrat transition-colors  ${className}`}>
            <a href="mailto:contact@starlight.com" className="block transition-colors hover:text-primary-200">
                contact@starlight.com
            </a>
            <p className="text-black ">123 Insurance Avenue</p>
            <p className="text-black ">New York, NY 10001</p>
        </div>
    );
};

export default ContactInfo;
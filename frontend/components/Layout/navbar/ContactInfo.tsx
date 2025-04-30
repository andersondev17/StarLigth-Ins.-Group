import { ContactInfoProps } from "@/types/types";

const ContactInfo = ({ className = "" }: ContactInfoProps) => {
    return (
        <div className={`text-sm leading-relaxed font-montserrat ${className}`}>
            <a href="mailto:contact@starlight.com" className="block transition-colors hover:text-primary-200 font-medium mb-1">
                contact@starlight.com
            </a>
            <p className="mb-1">123 Insurance Avenue</p>
            <p>New York, NY 10001</p>
        </div>
    );
};

export default ContactInfo;
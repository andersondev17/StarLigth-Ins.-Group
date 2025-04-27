interface ContactInfoProps {
    className?: string;
}

const ContactInfo = ({ className = "" }: ContactInfoProps) => {
    return (
        <div className={`text-sm leading-relaxed text-black ${className}`}>
            <a href="mailto:contact@starlight.com" className="block transition-colors hover:text-primary-200">
                contact@starlight.com
            </a>
            <p>123 Insurance Avenue</p>
            <p>New York, NY 10001</p>
        </div>
    );
};

export default ContactInfo;
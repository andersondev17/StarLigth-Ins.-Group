// components/ui/Button.tsx
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    containerClass?: string;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const baseStyles = 'group relative z-10 overflow-hidden rounded-full text-black transition-all duration-200 ease-in-out transform hover:scale-105 shadow-lg relative overflow-hidden group';

const sizeStyles = {
    sm: 'px-3 py-2 text-xs min-h-9',
    md: 'px-7 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
    
};

const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-primary bg-transparent hover:bg-primary/10',
    ghost: 'hover:bg-primary/10'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    title,
    id,
    leftIcon,
    rightIcon,
    containerClass,
    variant = 'default',
    size = 'md',
    className,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            id={id}
            className={cn(
                baseStyles,
                sizeStyles[size],
                variantStyles[variant],
                containerClass,
                className
            )}
            {...props}
        >
            {leftIcon && (
                <span className="mr-2 inline-flex items-center">
                    {leftIcon}
                </span>
            )}

            <span className="relative inline-flex overflow-hidden font-sans uppercase text- font-semibold tracking-wider">
                {title}
            </span>

            {rightIcon && (
                <span className="ml-2 inline-flex items-center">
                    {rightIcon}
                </span>
            )}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
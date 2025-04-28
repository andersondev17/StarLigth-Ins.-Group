

export const fadeIn = (element: HTMLElement, duration: number = 300): void => {
    if (!element) return;

    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in-out`;

    // Force browser to recognize the initial state before changing
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
};

export const fadeOut = (element: HTMLElement, duration: number = 300): Promise<void> => {
    return new Promise((resolve) => {
        if (!element) {
            resolve();
            return;
        }

        element.style.opacity = '1';
        element.style.transition = `opacity ${duration}ms ease-in-out`;

        // Force browser to recognize the initial state before changing
        setTimeout(() => {
            element.style.opacity = '0';

            // Resolve after animation completes
            setTimeout(resolve, duration);
        }, 10);
    });
};

export const slideDown = (element: HTMLElement, duration: number = 300): void => {
    if (!element) return;

    // Get the element's height
    element.style.height = 'auto';
    const height = element.offsetHeight;

    // Set initial state
    element.style.height = '0px';
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms ease-in-out`;

    // Force browser to recognize the initial state before changing
    setTimeout(() => {
        element.style.height = `${height}px`;

        // Clean up after animation
        setTimeout(() => {
            element.style.height = 'auto';
        }, duration);
    }, 10);
};

export const slideUp = (element: HTMLElement, duration: number = 300): Promise<void> => {
    return new Promise((resolve) => {
        if (!element) {
            resolve();
            return;
        }

        // Get the element's height
        const height = element.offsetHeight;

        // Set initial state
        element.style.height = `${height}px`;
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease-in-out`;

        // Force browser to recognize the initial state before changing
        setTimeout(() => {
            element.style.height = '0px';

            // Resolve after animation completes
            setTimeout(resolve, duration);
        }, 10);
    });
};

/**
 * Handles menu animation without using GSAP
 */
export const animateMenu = (element: HTMLElement | null, isOpen: boolean, duration: number = 300): void => {
    if (!element) return;

    if (isOpen) {
        // Show menu
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px)';
        element.style.pointerEvents = 'all';
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;

        // Force browser to recognize the initial state before changing
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);
    } else {
        // Hide menu
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = `opacity ${duration}ms ease-in, transform ${duration}ms ease-in`;

        // Force browser to recognize the initial state before changing
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(-20px)';

            // Remove pointer events after animation
            setTimeout(() => {
                element.style.pointerEvents = 'none';
            }, duration);
        }, 10);
    }
};


export const createStars = (parentElement: HTMLElement, starCount: number = 30): void => {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'absolute inset-0 pointer-events-none overflow-hidden';
    parentElement.append(starsContainer);

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3 + 1;
        Object.assign(star.style, {
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: Math.random() > 0.8 ? '#FFC107' : '#F8F9FA',
            opacity: `${Math.random() * 0.5 + 0.3}`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 3 + 2}s ${Math.random() * 2}s infinite alternate`
        });
        star.className = 'absolute rounded-full';
        starsContainer.append(star);
    }

    // Agregar animación de parpadeo
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    styleSheet.insertRule(`
        @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 0.8; transform: scale(1.3); }
        }
    `, styleSheet.cssRules.length);
};

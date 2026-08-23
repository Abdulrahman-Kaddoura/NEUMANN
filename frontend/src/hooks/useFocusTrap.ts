import { useEffect } from 'react';

export function useFocusTrap(
    panelRef: React.RefObject<HTMLElement | null>,
    isOpen: boolean
) {
    useEffect(() => {
        if (!isOpen || !panelRef.current) return;

        const panel = panelRef.current;

        const focusableElements = panel.querySelectorAll<HTMLElement>(
            'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        );

        const focusable = Array.from(focusableElements);

        if (focusable.length > 0) {
            focusable[0].focus();
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key !== 'Tab') return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (!first || !last) return;

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        panel.addEventListener('keydown', handleKeyDown);

        return () => {
            panel.removeEventListener('keydown', handleKeyDown);
        };
    }, [panelRef, isOpen]);
}
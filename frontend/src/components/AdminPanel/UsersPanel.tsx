import { useRef, useState } from 'react';
import { UsersTable } from './UsersTable';
import './UsersPanel.css'

interface UsersPanelProps {
    setAdminFABVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setUsersPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UsersPanel({ setAdminFABVisible, setUsersPanelVisible }: UsersPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
    const dragOffset = useRef({ x: 0, y: 0 });

    function handleDragStart(e: React.PointerEvent<HTMLDivElement>) {
        if ((e.target as HTMLElement).closest('button')) return;

        const panel = panelRef.current;
        if (!panel) return;

        const rect = panel.getBoundingClientRect();
        dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        setPosition({ x: rect.left, y: rect.top });

        e.currentTarget.setPointerCapture(e.pointerId);
    }

    function handleDragMove(e: React.PointerEvent<HTMLDivElement>) {
        if (e.buttons !== 1) return;
        const panel = panelRef.current;
        if (!panel) return;

        const maxX = window.innerWidth - panel.offsetWidth;
        const maxY = window.innerHeight - panel.offsetHeight;
        const x = Math.min(Math.max(0, e.clientX - dragOffset.current.x), Math.max(0, maxX));
        const y = Math.min(Math.max(0, e.clientY - dragOffset.current.y), Math.max(0, maxY));
        setPosition({ x, y });
    }

    const style = position
        ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' }
        : undefined;

    

    return (
        <div className='users-panel' ref={panelRef} style={style}>
            <div
                className='users-panel-drag-handle'
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
            >
                <span>Users</span>
                <button
                    type='button'
                    aria-label="Close modal"
                    onClick={() => { setAdminFABVisible(true); setUsersPanelVisible(false) }}
                >&times;</button>
            </div>

            <UsersTable />
        </div>
    );
}

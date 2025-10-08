import React from 'react';
import { useAppSelector } from './hooks';

export default function IsDarkModeWrapper({
    children
}: {
    children: React.ReactNode
}) {
    const isDarkMode = useAppSelector((state) => state.darkMode);
    
    return (
        <div className={`h-full w-full ${isDarkMode ? 'dark' : ''}`}>
                {children}
        </div>
    )
}
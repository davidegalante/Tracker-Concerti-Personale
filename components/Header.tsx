
import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
    return (
        <header className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text">
                🎵 Concert Tracker
            </h1>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
        </header>
    );
};

export default Header;

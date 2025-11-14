import React from 'react';
import { CheckCircleIcon, CogIcon, WarningIcon, QuestionMarkCircleIcon } from './icons';

interface HeaderProps {
    isAuthenticated: boolean;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onSettingsClick: () => void;
    onHelpClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLoginClick, onLogoutClick, onSettingsClick, onHelpClick }) => {
    return (
        <header className="flex justify-between items-center pb-4 border-b border-border-muted">
            <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">AI Workflow System</h1>
                <div 
                    className="flex items-center gap-2 mt-2 text-sm"
                >
                    {isAuthenticated ? (
                        <>
                            <CheckCircleIcon className="w-5 h-5 text-success" />
                            <span className="text-text-secondary">Logged in as Robert Mills</span>
                            <span className="text-text-muted">|</span>
                            <button onClick={onLogoutClick} className="text-text-muted hover:text-text-primary transition-colors">Logout</button>
                        </>
                    ) : (
                        <button onClick={onLoginClick} className="flex items-center gap-2">
                            <WarningIcon className="w-5 h-5 text-warning" />
                            <span className="text-text-muted hover:text-text-primary transition-colors">Not logged in</span>
                        </button>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                 <button
                    onClick={onHelpClick}
                    className="p-2 border border-border-muted rounded-lg hover:bg-white/10 transition-colors duration-200"
                    aria-label="Open help"
                >
                    <QuestionMarkCircleIcon className="w-6 h-6 text-text-secondary" />
                </button>
                <button
                    onClick={onSettingsClick}
                    className="p-2 border border-border-muted rounded-lg hover:bg-white/10 transition-colors duration-200"
                    aria-label="Open settings"
                >
                    <CogIcon className="w-6 h-6 text-text-secondary" />
                </button>
            </div>
        </header>
    );
};
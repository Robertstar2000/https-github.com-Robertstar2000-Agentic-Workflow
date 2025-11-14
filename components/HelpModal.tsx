import React, { useEffect, useRef } from 'react';
import { XIcon } from './icons';
import { helpContent } from '../help_content';

interface HelpModalProps {
    onClose: () => void;
}

// Simple markdown to HTML converter
const parseMarkdown = (text: string) => {
    return text
        .split('\n')
        .map(line => {
            if (line.startsWith('### ')) {
                return `<h3>${line.substring(4)}</h3>`;
            }
            if (line.startsWith('#### ')) {
                return `<h4>${line.substring(5)}</h4>`;
            }
            if (line.trim() === '---') {
                return '<hr class="border-border-muted my-4" />';
            }
            if (line.startsWith('*   **')) { // Bold list item
                const content = line.substring(6).replace(/\*\*:/, '**:</strong>');
                return `<li class="ml-4 list-disc">${content}</li>`;
            }
             if (line.startsWith('*   ')) { // simple list item
                return `<li class="ml-4 list-disc">${line.substring(4)}</li>`;
            }
            // Basic bold and italic
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return `<p class="text-text-secondary leading-relaxed">${line}</p>`;
        })
        .join('');
};


export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div ref={modalRef} className="bg-card-bg border border-border-muted rounded-xl shadow-2xl w-full max-w-3xl h-[80vh] flex flex-col p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-xl font-semibold">Help & Instructions</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
                        <XIcon className="w-6 h-6 text-text-muted" />
                    </button>
                </div>
                <div className="prose prose-invert max-w-none flex-grow overflow-y-auto pr-2 space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(helpContent) }} />
                </div>
            </div>
        </div>
    );
};

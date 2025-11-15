

import React from 'react';
import { LightBulbIcon } from './icons';

/**
 * A simple component that displays a usage tip to the user.
 */
export const Tip: React.FC = () => {
    return (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-text-muted">
            <LightBulbIcon className="w-4 h-4 text-amber-300" />
            <span>Tip: Try a vague goal like "Improve our system's performance"...</span>
        </div>
    );
};
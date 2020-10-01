import React from 'react';
import './BlueBackground.scss';

export const BlueBackground: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...rest }) => (
    <div className={`BlueBackground ${className}`} {...rest}>
        {children}
    </div>
)

export default BlueBackground;
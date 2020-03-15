import React from 'react';
import './BlueBackground.scss';

interface Props {
    children?: React.ReactNode
}

const BlueBackground: React.FC<Props> = ({ children }) => (
    <div className="BlueBackground">
        {children}
    </div>
)

export default BlueBackground;
import React from 'react';
import './Card.scss';

interface Props {
    children: React.ReactNode,
    className?: string,
    onClick?: () => void
}
const Card: React.FC<Props> = ({ children, className = "", ...rest }) => {

    return (
        <div className={`Card ${className}`} {...rest}>
            {children}
        </div>
    );
}

export default Card;
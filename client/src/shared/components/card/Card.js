import React from 'react';
import './Card.scss';

const Card = ({ children, className, ...rest }) => {

    if(!children) return null;

    className = className ? className : "";
    
    return (
        <div className={`Card ${className}`} {...rest}>
            {children}
        </div>
    );
}

export default Card;
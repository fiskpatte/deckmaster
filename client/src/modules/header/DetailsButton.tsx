import React from 'react';
import { ReactComponent as DetailsIcon } from '../../assets/icons/detailsIcon.svg';

const DetailsButton: React.FC = () => {
    return (
        <div className="HeaderItem DetailsButton">
            <DetailsIcon />
        </div>
    )
}

export default DetailsButton;
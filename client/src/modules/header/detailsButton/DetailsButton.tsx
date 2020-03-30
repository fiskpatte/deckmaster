import React from 'react';
import { ReactComponent as DetailsIcon } from '../../../assets/icons/detailsIcon.svg';
import './DetailsButtons.scss';

export const DetailsButton: React.FC = () => {
    return (
        <div className="DetailsButton">
            <DetailsIcon />
        </div>
    )
}

export default DetailsButton;
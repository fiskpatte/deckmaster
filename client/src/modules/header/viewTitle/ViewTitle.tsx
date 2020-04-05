import React from 'react';
import './ViewTitle.scss';
import { useLocation } from 'react-router-dom';
import { getRouteTitleFromPath } from '../../../routes.functions';

export const ViewTitle: React.FC = () => {
    const location = useLocation()
    let title = getRouteTitleFromPath(location.pathname)
    return (
        <div className="ViewTitle">
            {title}
        </div>
    )
}

export default ViewTitle;
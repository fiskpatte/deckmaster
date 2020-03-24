import React from 'react';
import './Paper.scss'

interface Props {
    children?: React.ReactNode
}

const Paper: React.FC<Props> = ({ children }) => (
    <div className="Paper">
        {children}
    </div>
)

export default Paper;
import React from 'react';
import './Loader.scss'

interface Props {
    content?: string;
    color?: "light" | "dark";
}
export const Loader: React.FC<Props> = ({ content, color = "light" }) => {
    return (
        <>
            <div className={`Loader color-${color}`} >
                {content ?
                    <div className="text" >
                        {content}
                    </div>
                    : null}
            </div>
        </>
    );
};

export default Loader;
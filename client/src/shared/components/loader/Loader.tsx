import React from 'react';
import './Loader.scss'

interface Props {
    content?: string
}
export const Loader: React.FC<Props> = ({ content }) => {
    return (
        <>
            <div className="Loader" >
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
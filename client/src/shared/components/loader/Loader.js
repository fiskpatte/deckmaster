import React from 'react';
import './Loader.scss'

const Loader = ({ content = "" }) => {
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
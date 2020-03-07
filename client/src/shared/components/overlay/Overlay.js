import React from 'react';
import './Overlay.scss'
import { motion } from 'framer-motion';

const Overlay = ({ visible, animate = true }) => {
    const variants = {
        visible: { opacity: 0.7, pointerEvents: "auto", transition: { ease: "linear" } },
        hidden: { opacity: 0, pointerEvents: "none", transition: { ease: "linear" } }
    }
    return (
        <>
            {animate ?
                <motion.div className="Overlay" initial={"hidden"} animate={visible ? "visible" : "hidden"} variants={variants} />
                : <div className="Overlay" />}
        </>
    )
};

export default Overlay;
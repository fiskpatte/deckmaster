import React from 'react';
import './Overlay.scss'
import { motion, Variants } from 'framer-motion';

interface Props {
    visible: boolean,
    onClick: () => void,
    animate?: boolean
}
const Overlay: React.FC<Props> = ({ visible, onClick, animate = true }) => {
    const variants: Variants = {
        visible: { opacity: 0.7, pointerEvents: "auto", transition: { ease: "linear" } },
        hidden: { opacity: 0, pointerEvents: "none", transition: { ease: "linear" } }
    }
    return (
        <>
            {animate ?
                <motion.div className="Overlay" onClick={onClick} initial={"hidden"} animate={visible ? "visible" : "hidden"} variants={variants} />
                : <div className="Overlay" onClick={onClick} />}
        </>
    )
};

export default Overlay;
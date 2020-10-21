import React from 'react';
import './Overlay.scss'
import { motion, Variants } from 'framer-motion';

interface Props {
    visible: boolean,
    onClick: () => void,
    animate?: boolean,
    transparent?: boolean,
    zIndex?: number,
    duration?: number,
}
export const Overlay: React.FC<Props> = ({ visible, onClick, animate = true, transparent = false, zIndex, duration = 0.14 }) => {
    const variants: Variants = {
        visible: { opacity: 0.7, pointerEvents: "auto", transition: { ease: "linear", duration: duration } },
        hidden: { opacity: 0, pointerEvents: "none", transition: { ease: "linear", duration: duration } }
    }
    return (
        <>
            {animate ?
                <motion.div className="Overlay" onClick={onClick} initial={"hidden"} animate={visible ? "visible" : "hidden"} variants={variants} style={{ zIndex: zIndex ?? 5 }} />
                : visible ?
                    <div className={`Overlay ${transparent ? "Transparent" : ""}`} onClick={onClick} style={{ zIndex: zIndex ?? 5 }} />
                    : null
            }
        </>
    )
};

export default Overlay;
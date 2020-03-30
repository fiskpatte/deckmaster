import React, { useState, useEffect } from 'react';
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrowDownIcon.svg';
import './Collapsible.scss';
import { motion } from 'framer-motion';
interface Props {
    children: React.ReactNode,
    isCollapsedParent?: boolean,
    setIsCollapsedParent?: () => void
}
export const Collapsible: React.FC<Props> = ({ children, isCollapsedParent = true, setIsCollapsedParent }) => {
    const [isCollapsed, setIsCollapsedState] = useState(true);
    let toggleIsCollapsed = () => setIsCollapsedState(!isCollapsed);
    let setIsCollapsed = setIsCollapsedParent ?? toggleIsCollapsed;

    useEffect(() => {
        if (setIsCollapsedParent) {
            setIsCollapsedState(isCollapsedParent);
        }
    }, [setIsCollapsedParent, isCollapsedParent])


    const contentVariants = {
        visible: { opacity: 1, height: "auto", transition: { ease: "linear" } },
        hidden: { opacity: 0, height: 0, transition: { ease: "linear" } }
    };

    const iconVariants = {
        down: { transform: "scale(1, 1)", transiftion: { ease: "linear" } },
        up: { transform: "scale(1, -1)", transiftion: { ease: "linear" } }
    }

    return (
        <div className="Collapsible">
            <motion.div className="childrenContainer" initial={"hidden"} animate={isCollapsed ? "hidden" : "visible"} variants={contentVariants}>
                {children}
            </motion.div>
            <motion.div className="iconContainer" initial={"down"} animate={isCollapsed ? "down" : "up"} variants={iconVariants} onClick={setIsCollapsed}>
                <ArrowDownIcon />
            </motion.div>
        </div>
    );
}

export default Collapsible;
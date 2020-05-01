import React from 'react';
import './Popup.scss';
import { Card } from '../card';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  visible: boolean;
}

export const Popup: React.FC<Props> = ({ children, visible }) => {

  const variants = {
    visible: { opacity: 1, translateX: "-50%", translateY: "0%", display: "block", transition: { ease: "linear", duration: 0.2 } },
    hidden: {
      opacity: 0, translateX: "-50%", translateY: "-60%", transition: { ease: "linear", duration: 0.2 }, transitionEnd: {
        display: "none",
      }
    }
  };

  return (
    <>
      <motion.div className="Popup" initial={"hidden"} animate={visible ? "visible" : "hidden"} variants={variants}>
        <Card>
          {children}
        </Card>
      </motion.div>
    </>
  );
}

export default Popup;

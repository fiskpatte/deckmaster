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
    visible: { opacity: 1, top: "160%", transition: { ease: "linear", duration: 0.2 } },
    hidden: { opacity: 0, top: "100%", transition: { ease: "linear", duration: 0.2 } }
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

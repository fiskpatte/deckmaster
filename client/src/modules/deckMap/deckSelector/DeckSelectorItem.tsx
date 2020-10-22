import React from "react";
import Button from "../../../components/button";
import { motion } from "framer-motion";

interface Props {
  name: string;
  order: number;
  isCurrent: boolean;
  onClick: () => void;
  isOpen: boolean;
}

const DeckSelectorItem: React.FC<Props> = ({ name, order, isCurrent, onClick, isOpen }) => {
  const extended = {
    opacity: 1,
    translateY: "0%",
    transition: { ease: "linear", duration: 0.2 },
  };
  const collapsed = { opacity: 0, translateY: `-${(order - 1) * 100}%`, transition: { ease: "linear", duration: 0.2 } };

  const itemVariants = {
    extended: extended,
    collapsed: collapsed,
    current: { ...collapsed, opacity: 1 }
  };

  const getVariant = () => isOpen ? "extended" : isCurrent ? "current" : "collapsed"
  return (
    <motion.div
      initial={getVariant()}
      animate={getVariant()}
      variants={itemVariants}
      className="DeckSelectorItem"
    >
      <Button
        className={`DeckSelectorItemButton ${isCurrent ? "Selected" : ""}`}
        onClick={onClick}
        label={name}
      />
    </motion.div>

  );
};

export default DeckSelectorItem;

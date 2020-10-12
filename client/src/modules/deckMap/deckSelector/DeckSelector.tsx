import React from "react";
import DeckSelectorItem from "./DeckSelectorItem";
import "./DeckSelector.scss";

interface Props {
  deckNames: string[];
  currentDeckName: string;
}

export const DeckSelector: React.FC<Props> = ({
  deckNames,
  currentDeckName,
}) => {
  return (
    <div className="DeckSelector">
      {deckNames.map((name) => (
        <DeckSelectorItem
          name={name}
          isCurrent={name === currentDeckName}
          key={name}
        />
      ))}
    </div>
  );
};

export default DeckSelector;

// import React, { useState } from "react";
// import OutsideAlerter from "../../../components/outsideAlerter/OutsideAlerter";
// import "./DeckSelector.scss";

// interface Props {
//   deckNames: string[];
//   currentDeckName: string;
//   setCurrentDeck: (name: string) => void;
// }

// export const DeckSelector: React.FC<Props> = ({
//   deckNames,
//   currentDeckName,
//   setCurrentDeck,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const onDeckClick = (name: string) => {
//     if (isOpen) {
//       setCurrentDeck(name);
//       setIsOpen(false);
//     } else {
//       setIsOpen(true);
//     }
//   };

//   const filteredDeckNames = deckNames.filter(
//     (deckName) => isOpen || deckName === currentDeckName
//   );

//   const onOutsideClick = () => {
//     if (isOpen) {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <OutsideAlerter onOutsideClick={onOutsideClick}>
//       <div className="DeckSelector">
//         {filteredDeckNames.map((deckName) => (
//           <div
//             onClick={() => onDeckClick(deckName)}
//             className={`DeckSelectorItem ${
//               deckName === currentDeckName ? "Selected" : ""
//             }`}
//           >
//             {deckName}
//           </div>
//         ))}
//       </div>
//     </OutsideAlerter>
//   );
// };

// export default DeckSelector;

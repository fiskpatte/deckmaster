import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentDeck } from './../../../store/actions/appActions';
const DeckSelectorItem = ({ deck, isCurrent }) => {
    const dispatch = useDispatch();
    const onClick = () => { dispatch(setCurrentDeck(deck)) };
    
    return (
        <div className={`DeckSelectorItem ${isCurrent ? "Selected" : ""}`} onClick={onClick}>
            {deck.deck}
        </div>
    );
}

export default DeckSelectorItem;
import React from 'react';
import './DeckMap.scss'
import CargoDetails from './CargoDetails/CargoDetails';
import DeckSelector from './DeckSelector/DeckSelector';
import DeckMapSvg from './DeckMapSvg';
import { useSelector } from 'react-redux';

const DeckMap = () => {
    const { currentDeck, currentCargo, deckMap } = useSelector(state => state.appReducer)
    if (!currentDeck) return null;
    console.log(currentDeck, currentCargo)
    return (
        <div className="DeckMap">
            <div className="Header">
                <CargoDetails currentCargo={currentCargo} />
                <DeckSelector deckMap={deckMap} currentDeck={currentDeck} />
            </div>
            <DeckMapSvg currentCargo={currentCargo} currentDeck={currentDeck} />
        </div>
    )
}

export default DeckMap;
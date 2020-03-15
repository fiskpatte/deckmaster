import React from 'react';
import DeckSelectorItem from './DeckSelectorItem';
import './DeckSelector.scss'
import { DeckSelectorProps } from '../types';

const DeckSelector: React.FC<DeckSelectorProps> = ({ deckMap, currentDeck }) => {
    return (
        <div className="DeckSelector">
            {deckMap.map((deck, ix) =>
                <DeckSelectorItem deck={deck} isCurrent={deck.deck === currentDeck.deck} key={ix} />
            )}
        </div>
    );
};

export default DeckSelector;
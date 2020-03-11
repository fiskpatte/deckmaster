import React from 'react';
import DeckSelectorItem from './DeckSelectorItem';

const DeckSelector = ({ deckMap, currentDeck }) => {
    return (
        <div className="DeckSelector">
            {deckMap.map((deck, ix) =>
                <DeckSelectorItem deck={deck} isCurrent={deck.deck === currentDeck.deck} key={ix} />
            )}
        </div>
    );
};

export default DeckSelector;
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentDeck } from '../../../store/actions/appActions';
import { Card } from '../../../shared/components/card';
import { Deck } from '../../../shared/types/deckMap';

interface Props {
    deck: Deck,
    isCurrent: boolean
}

const DeckSelectorItem: React.FC<Props> = ({ deck, isCurrent }) => {
    const dispatch = useDispatch();
    const onClick = () => { dispatch(setCurrentDeck(deck)) };

    return (
        <Card className={`DeckSelectorItem ${isCurrent ? "Selected" : ""}`} onClick={onClick}>
            {deck.name}
        </Card>
    );
}

export default DeckSelectorItem;
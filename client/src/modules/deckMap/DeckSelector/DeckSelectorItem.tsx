import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentDeck } from '../../../store/actions/appActions';
import { Card } from '../../../shared/components/card';
import { DeckSelectorItemProps } from '../DeckMap.types';

const DeckSelectorItem: React.FC<DeckSelectorItemProps> = ({ deck, isCurrent }) => {
    const dispatch = useDispatch();
    const onClick = () => { dispatch(setCurrentDeck(deck)) };

    return (
        <Card className={`DeckSelectorItem ${isCurrent ? "Selected" : ""}`} onClick={onClick}>
            {deck.deck}
        </Card>
    );
}

export default DeckSelectorItem;
import * as React from 'react';
import './DeckMap.scss';
import CargoDetails from './CargoDetails/CargoDetails';
import DeckSelector from './DeckSelector/DeckSelector';
import DeckMap from './DeckMap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'
import ConfirmButton from './ConfirmButton';

export const DeckMapContainer: React.FC = () => {
    const { currentDeck, deckMap, currentPosition } = useSelector((state: RootState) => state.appReducer)
    const { currentCargo } = useSelector((state: RootState) => state.cargoReducer)

    return (
        <div className="DeckMap">
            <div className="Header" >
                <CargoDetails currentCargo={currentCargo} />
                <DeckSelector deckMap={deckMap} currentDeck={currentDeck} />
            </div>
            <DeckMap currentCargo={currentCargo} currentDeck={currentDeck} currentPosition={currentPosition} />
            <div className="Footer">
                {currentPosition ? <ConfirmButton /> : null}
            </div>
        </div>
    )
}

export default DeckMapContainer;
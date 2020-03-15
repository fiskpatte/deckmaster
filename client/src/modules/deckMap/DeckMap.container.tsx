import React, { useRef, useEffect, useState } from 'react';
import './DeckMap.scss';
import CargoDetails from './CargoDetails/CargoDetails';
import DeckSelector from './DeckSelector/DeckSelector';
import DeckMap from './DeckMap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'

const DeckMapContainer: React.FC = () => {
    const { currentDeck, currentCargo, deckMap } = useSelector((state: RootState) => state.appReducer)
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerFixedHeight, setHeaderFixedHeight] = useState("auto");
    useEffect(() => {
        if(headerRef.current){
            setHeaderFixedHeight(`${headerRef.current.offsetHeight}px`);
        }
    }, [])

    return (
        <div className="DeckMap">
            <div className="Header" ref={headerRef} style={{ height: headerFixedHeight }}>
                <CargoDetails currentCargo={currentCargo} />
                <DeckSelector deckMap={deckMap} currentDeck={currentDeck} />
            </div>
            <DeckMap currentCargo={currentCargo} currentDeck={currentDeck} />
        </div>
    )
}

export default DeckMapContainer;
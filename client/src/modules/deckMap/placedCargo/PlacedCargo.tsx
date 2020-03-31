import * as React from 'react';
import { Cargo } from '../../../shared/types/deckMap';
import CargoIcon from '../CargoIcon';

interface Props {
    cargo: Array<Cargo>
}

export const PlacedCargo: React.FC<Props> = ({ cargo }) => {
    if (cargo.length === 0) return null;
    return (
        <>
            {cargo.map((c, ix) => {
                return (
                    <CargoIcon key={ix} x={c.LCG} y={c.TCG} width={c.length} height={c.width} />
                );
            })}
        </>
    );
};

export default PlacedCargo;
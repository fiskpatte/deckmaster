import React, {useState} from 'react'
import BlueBackground from '../../shared/components/blueBackground/BlueBackground'
import Paper from '../../shared/components/paper';
import { getMockCargo } from '../../api/endpoints';
import { setCurrentCargo } from '../../store/actions/cargoActions';
import ErrorMessage from '../../shared/components/errorMessage';

export default function EnterCargoScreen() {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const onNextButtonClick = async () => {
        // I detta läge ska vi mocka ett cargo.
        // Sedan ska vi sätta detta i redux
        try {
            if(error){
                setError('');
            }
            const cargo = await getMockCargo()
            console.log("cargo: ", cargo)
            setCurrentCargo(cargo);
        } catch(error){
            // Show error
            setError('Cargo not found')
        }
    }

    return (
        <BlueBackground>
            <Paper>
                <input value={input} onChange={e => setInput(e.target.value)} />
                <button onClick={onNextButtonClick}>Next</button>
                {error && <ErrorMessage message={error} />}
            </Paper>
        </BlueBackground>
    )
}
import React, {useState} from 'react'
import BlueBackground from '../../shared/components/blueBackground/BlueBackground'
import Paper from '../../shared/components/paper/Paper'
import ErrorMessage from '../../shared/components/errorMessage/ErrorMessage';

export default function EnterCargoScreen() {
    const [input, setInput] = useState('');
    const [error] = useState('');

    const onNextButtonClick = async () => {
        // I detta läge ska vi mocka ett cargo.
  
    }

    return (
        <BlueBackground>
            <Paper>
                
                <button onClick={onNextButtonClick}>Next</button>
                {error && <ErrorMessage message={error} />}
            </Paper>
        </BlueBackground>
    )
}

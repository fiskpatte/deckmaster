import React from 'react';
import './LoginScreen.scss';
import { ReactComponent as DeckmasterLogo } from '../../assets/icons/deckmasterLogo.svg';

interface Props {
    username: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    onLoginButtonClick: () => void,
    error: string
}
const InputContainer: React.FC<Props> = ({ username, setUsername, password, setPassword, onLoginButtonClick, error }) => {
    return (
        <div className="InputContainer">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                <div></div>
                <DeckmasterLogo />
            </div>
            <div>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <br></br>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <br></br>
                <button onClick={onLoginButtonClick}>Log in</button>
                <h4 style={{ color: 'red' }}>{error}</h4>
            </div>

        </div>
    )
}
export default InputContainer;

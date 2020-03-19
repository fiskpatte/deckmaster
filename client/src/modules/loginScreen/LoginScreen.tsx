import React, { useState } from 'react'
import BlueBackground from '../../shared/components/blueBackground/BlueBackground'
import { login } from '../../api/endpoints'
import { useHistory } from 'react-router-dom';
import InputContainer from './InputContainer';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('Pontus2');
    const [password, setPassword] = useState('testtest')
    const [error, setError] = useState('')
    const history = useHistory();

    const onLoginButtonClick = async () => {
        console.log("sads")
        if (!username || !password) {
            return;
        }

        if (error) {
            setError('');
        }

        try {
            console.log("sad")
            await login(username, password);
            history.push("/placecargo");
        } catch (error) {
            setError('Login failed');
        }
    }

    return (
        <BlueBackground>
            <InputContainer
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                onLoginButtonClick={onLoginButtonClick}
                error={error} />
        </BlueBackground>
    )
}

export default LoginScreen;
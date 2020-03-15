import React, { useState } from 'react'
import BlueBackground from '../../shared/components/blueBackground/BlueBackground'
import {login} from  '../../api/endpoints'
import { useHistory } from 'react-router-dom';

export default function LoginScreen() {
    const [username, setUsername] = useState('Pontus2');
    const [password, setPassword] = useState('testtest')
    const [error, setError] = useState('')
    const history = useHistory();

    const onLoginButtonClick = async () => {
        if(!username || !password){
            return;
        }

        if(error){
            setError('');
        }

        try {
            await login(username, password);
            history.push("/loading");
        } catch(error){
            setError('Login failed');
        }
    }

    return (
        <BlueBackground>
            <h1>Login</h1>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <br></br>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <br></br>
            <button onClick={onLoginButtonClick}>Log in</button>
            <h4 style={{color: 'red'}}>{error}</h4>
        </BlueBackground>
    )
}

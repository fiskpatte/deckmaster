import React, { useState, useEffect } from 'react'
import BlueBackground from '../../shared/components/blueBackground/BlueBackground'
import {login} from  '../../api/index'
export default function LoginScreen() {
    const [username, setUsername] = useState('Pontus2');
    const [password, setPassword] = useState('testtest')
    const [error, setError] = useState('')

    useEffect(() => {

    }, [])

    const onLoginButtonClick = async () => {
        if(!username || !password){
            return;
        }
        if(error){
            setError('');
        }
        try {
            const accessToken = await login(username, password);
            console.log("accessToken: ", accessToken);
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

import React from 'react';
import './LoginScreen.scss';
import Logo from '../header/Logo';

export default function InputContainer({username, setUsername, password, setPassword, onLoginButtonClick, error}) {
    return (
        <div className="InputContainer">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                
                <div></div>
                <Logo />
            </div>
            <div>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <br></br>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                <br></br>
                <button onClick={onLoginButtonClick}>Log in</button>
                <h4 style={{color: 'red'}}>{error}</h4>
            </div>
            
        </div>
    )
}

import React, { useState } from 'react';
import './Login.css';

import api from '../services/api'

import logo from '../assets/logo.svg'

export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) { // e => evento
        e.preventDefault(); //Evita o reload da página

        const response = await api.post('/devs', {
            username //Isso funciona quando chave é igual valor
        });

        console.log(response.data);

        history.push('/main');
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt='Tindev' />
                <input
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
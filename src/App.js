import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({})

    async function handleSearch() {
        
        if(input === '') {
            alert("Type a postal code to search!")
            return;
        }

        function verification(response) {
            if (Object.keys(response.data).length === 1) {
                alert("This postal code don't exist. Please review.");
            } 
        }

        try{
            const response = await api.get(`${input}/json`)
            setCep(response.data)
            setInput("")
        }catch{
            const response = await api.get(`${input}/json`)
            setInput("")
            verification(response)
        }
    }

    return ( 
        <div className="container">
            <h1 className="title">Postal Code Search</h1>

            <div className="containerInput">
                <input
                type="text"
                placeholder="Type a postal code..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />

                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color="#FFF" />
                </button>

            </div>

            {Object.keys(cep).length > 1 && (
                <main className="main">

                    <h2>Postal Code: {cep.cep}</h2>

                    <span>{cep.logradouro}</span>
                    <span>Number: {cep.complemento}</span>
                    <span>{cep.bairro}</span>
                    <span>{cep.localidade} - {cep.uf}</span>

                </main>
            )}

            <div className='examples'>
                <h3>Postal code examples:</h3>
                <p>13015-301</p>
                <p>21730-230</p>
                <p>13025-060</p>
            </div>


        </div>
    );
}

export default App;
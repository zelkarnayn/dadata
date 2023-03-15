import { useState } from 'react';
import './App.css';

function App() {
  const [INN, setINN] = useState('')
  const [nameCompany, setNameCompany] = useState('')
  const [shortName, setShortName] = useState('')
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')

  const handleSearchInn = async (e) => {
    e.preventDefault()
    if (INN) {
      var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
      var token = "e46e580967c4546e18a3a7686971fcc627029892";
      var query = INN;
    
      var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
        }
      const res = await fetch(url, options)
      const company = await res.json()
      setNameCompany(company.suggestions[0].data.name.short_with_opf);
      setShortName(company.suggestions[0].data.name.short)
      setFullName(company.suggestions[0].data.name.full_with_opf)
      setAddress(company.suggestions[0].data.address.value)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e) => handleSearchInn(e)}>
          <h1>Компания или ИП</h1>
          <input
            type="text"
            name="company"
            onChange={(e) => setNameCompany(e.target.value)}
            value={nameCompany}/>
          <h3>Организация (LEGAL)</h3>
          <h3>Краткое наименование</h3>
          <input
            type="text"
            name="shortName" onChange={(e) => setShortName(e.target.value)}
            value={shortName}/>
          <h3>Полное наименование</h3>
          <input
            type="text"
            name="fullName" onChange={(e) => setFullName(e.target.value)}
            value={fullName}/>
          <h3>ИНН / КПП</h3>
          <input
            type="text"
            name="INN"
            onChange={(e) => setINN(e.target.value)}/>
          <h3>Адрес</h3>
          <input
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}/>
          <button onClick={(e) => handleSearchInn(e)}>ИСКАТЬ</button>
        </form>
      </header>
    </div>
  );
}

export default App;

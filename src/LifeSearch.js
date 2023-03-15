import React from 'react';
import { useState } from 'react';
import './App.css';

const LifeSearch = () => {
        const [company, setCompany] = useState('')
        const [data, setData] = useState('')
        const [INN, setINN] = useState('')
        const [shortName, setShortName] = useState('')
        const [fullName, setFullName] = useState('')
        const [address, setAddress] = useState('')
        const [blur, setBlur] = useState(false)
      
        const handleSearch = async (e) => {
          e.preventDefault()
          if (data) {
            var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
            var token = "e46e580967c4546e18a3a7686971fcc627029892";
            var query = data;
          
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
            const search = await res.json()
            setCompany(search.suggestions)
          }
        }

        const changeBlur = () => {
          setBlur(true)
        }

        const handleGet = (company) => {
          setData(company.data.name.short_with_opf);
          setShortName(company.data.name.short)
          setFullName(company.data.name.full_with_opf)
          setAddress(company.data.address.value)
          setINN(`${company.data.inn} / ${company.data.kpp}`)
          setBlur(false)
        }
        return (
          <div className="App">
            <header className="App-header">
              <form>
                <h1>Компания или ИП</h1>
                <input
                  type="text"
                  name="company"
                  onFocus={() => changeBlur()}
                  onChange={(e) => {setData(e.target.value); handleSearch(e)}}
                  value={data}/>
                {company && data.length >= 1 && blur ? company.map((item) => <h4 key={item.data.hid} onClick={() => handleGet(item)}>{item.value}</h4>) : null}
                <h3>Организация (LEGAL)</h3>
                <h3>Краткое наименование</h3>
                <input
                  type="text"
                  name="shortName"
                  onChange={(e) => setShortName(e.target.value)}
                  value={shortName}/>
                <h3>Полное наименование</h3>
                <input
                  type="text"
                  name="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}/>
                <h3>ИНН / КПП</h3>
                <input
                  type="text"
                  name="INN"
                  onChange={(e) => setINN(e.target.value)}
                  value={INN}/>
                <h3>Адрес</h3>
                <input
                  type="text"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}/>
              </form>
            </header>
          </div>
        );
};

export default LifeSearch;
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Country from './Country';
import CountryAPI from './CountryAPI';

function App() {
  return (
   
      <div className='countries_container'>
        <Country/>
        <CountryAPI/>
        </div>
       
  );
}

export default App;

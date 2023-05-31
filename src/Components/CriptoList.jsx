import React, { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
import CryptoCard from './CriptoCards';
import { Graph } from './grap';
import '../styles/CriptoList.css';

const CryptoList = () => {
    const [cryptoList, setCryptoList] = useState([]);
    const [searchInput, setSearchInput] = useState('');


    const fetchCryptoList = async () => {
        try {
            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=30d&locale=en&precision=3'
            );
            const data = await response.json();
            setCryptoList(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (cryptoList.length === 0) {
        fetchCryptoList();
    }


    const filtered = searchInput
        ? cryptoList.filter(
            (coin) =>
                coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchInput.toLowerCase())
        )
        : cryptoList;

    return (
        <div className="criptoContainer">
            <h1>Control panel</h1>
            <div className="search-container">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Enter your search request"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <h2 className="sub">Crypto currencies</h2>
            <p className="line">___________________________________________________</p>

            <div className="crypto-list">
                {filtered.map((crypto) => (
                    <div
                        className="crypto-card"
                        key={crypto.id}
                        
                    >
                        <CryptoCard
                            name={crypto.name}
                            symbol={crypto.symbol}
                            image={crypto.image}
                            price={crypto.current_price}
                        />
                    </div>
                ))}
            </div>
            <Graph/>
        </div>
    );
};

export default CryptoList;
import React, { useEffect, useState } from 'react'
import css from "./ListofCoins.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Homepage from '../../component/Homepage/Homepage';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltered } from '../../features/coinSlice';

export default function ListofCoins() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const filteredCoins = useSelector((state) => state.coin.filtered);
    const passedFilteredCoins = location.state?.filtered || [];

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [searchQuery, setSearchQuery] = useState('');    

    const handleNavigateForBack = () => {
        navigate("/");
    }

    const handleNavigateDetails = (id) => {
        navigate(`/description/${id}`);
    }

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };
    
    const handleSearch = () => {
        const filtered = filteredCoins.filter((coin) => {
          return coin.coin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.description.toLowerCase().includes(searchQuery.toLowerCase());
        });
        dispatch(setFiltered(filtered));
        setSearchQuery('');
    };

    const render = filteredCoins.length > 0 ? (
        <div className={css.coinList}>
            {filteredCoins.map((coin, index) => (
                <div key={index} className={css.coinItem}>
                    <img src={coin.imageFront} alt={coin.coin_name} className={css.coinImage} />
                    <div className={css.coinInfo}>
                        <h3 className={css.coinName} onClick={() => handleNavigateDetails(coin.coin_id)}>{coin.coin_name} </h3>
                        <p className={css.coinDescription}>{coin.description} </p>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p>No coins found. Try another search.</p>
    )

    const routing = () => {
        navigate('/advanced-filter');
      };

  return (
    <div className={css.container}>
      <h1 className={css.h1}>List of the coins</h1>
      <p className={css.router} onClick={handleNavigateForBack}>Homepage — List of the coins</p>
      <div className = {css.header}>
          <label>Input field</label>
      </div>
      <input className={css.input} type = "text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button className={css.searchBtn} onClick={handleSearch}>Search</button>
      <div className={css.filters} onClick={routing}>
        <div className={css.filter} >Advanced filter</div>
        <span>˅</span>
      </div>
      {render}
    </div>
  )
}

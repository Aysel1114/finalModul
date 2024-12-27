import React, { useEffect, useState } from 'react'
import Homepage from '../../component/Homepage/Homepage'
import css from "./Homepage1.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { setCoins, setFiltered, setSearchInput } from '../../features/coinSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Homepage1() {
  const location = useLocation();
  const navigate = useNavigate();

  const coins = useSelector((state) => state.coin.coins);
  const filtered = useSelector((state) => state.coin.filtered);
  const dispatch = useDispatch();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/coins")
    .then((response) => response.json())
    .then((data) => {
        console.log("data", data);
        const uniqueValues = [];
        const filteredData = data.filter((coin) => {
          if(!uniqueValues.includes(coin.coin_type)) {
            uniqueValues.push(coin.coin_type);
            return true;
          }
          return false;
        })
        console.log("filteredData", filteredData);
        dispatch(setCoins(data));
        dispatch(setFiltered(filteredData));
    })
}, [dispatch])

  const handleShowAll = (coinType) => {
    navigate("/listOfCoins");
    const allItems = coins.filter((coin) => (coin.coin_type) === coinType);
    console.log("allItems", allItems);
    dispatch(setFiltered(allItems));
  };

  const handleNavigate = () => {
    setIsFilterActive(prevState => !prevState);
    if(location.pathname === "/advanced-filter") {
        navigate("/");
    }
    else {
        navigate("/advanced-filter");
    }
  }

  const handleNavigateForButton = () => {
    fetch("http://localhost:3000/coins")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const filtered = data.filter((coin) => {
          return coin.coin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.description.toLowerCase().includes(searchQuery.toLowerCase());
        });
        dispatch(setFiltered(filtered));
      })
      .catch((error) => console.error("Error fetching data:", error));
    navigate("/listOfCoins");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    dispatch(setSearchInput(value));
  };

  return (
    <div>
      <h1 className={css.h1}>Homepage</h1>
      <div className={css.miniContainer}>
        <div className={css.header}>
          <label>Input field</label>
        </div>
        <input
          className={css.input}
          type="text"
          onChange={handleChange}
        />
        <button
          className={css.searchBtn}
          onClick={handleNavigateForButton}
        >
          Search
        </button>
        <div className = {css.filters} onClick={handleNavigate}>
          <div className={css.filter}>Advanced filter </div>
          <span>{isFilterActive ? "˄" : "˅"}</span>
        </div>
        <div className={css.coinsList}>
          {filtered.length > 0 ? (
              filtered.map((coin, index) => (
                  <div key={index} className={css.coinItem}>
                      <h3 className={css.h3}>{coin.coin_type}</h3>
                      <p className={css.show} onClick={() => handleShowAll(coin.coin_type)}>Show all <span>›</span></p>
                      <img className={css.img} src={coin.imageFront} alt = {coin.coin_name}/>
                  </div>
              ))
          ) : (
              <p>Loading coins...</p>
          )}
        </div>
      </div>
    </div>
  )
}

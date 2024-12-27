import React, { useState } from 'react'
import css from "./Homepage.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCoins, setFiltered, setSearchInput } from '../../features/coinSlice';

export default function Homepage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isFilterActive, setIsFilterActive] = useState(false);
    const dispatch = useDispatch();
    const searchInput = useSelector((state) => state.coin.searchInput);

    const handleNavigate = () => {
        setIsFilterActive(prevState => !prevState);
        if(location.pathname === "/advanced-filter") {
            navigate("/");
        }
        else {
            navigate("/advanced-filter");
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        dispatch(setSearchInput(value));
    }

    const handleNavigateForButton = () => {
        fetch("http://localhost:3000/coins")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.filter((coin) => {
                console.log(coin.coin_name);
            })
            console.log("searchInput = " + searchInput);
            const filteredData = data.filter((coin) => {
              return coin.coin_name.toLowerCase().includes(searchInput.toLowerCase());
            })
            console.log(filteredData);
            dispatch(setFiltered(filteredData));
            const filteredDescriptionData = data.filter((coin) => {
                return coin.description.toLowerCase().includes(searchInput.toLowerCase());
            })
            dispatch(setFiltered(filteredDescriptionData));
            console.log(searchInput);
        })
        .catch((error) => console.error("Error fetching data:", error));
        navigate("/listOfCoins");
    }

    return (
        <div className={css.container}>
            <div className = {css.header}>
                <label>Input field</label>
            </div>
            <input className={css.input} type = "text" onChange={handleChange} />
            <button className={css.searchBtn} onClick={handleNavigateForButton}>Search</button>
        </div>
    )
}

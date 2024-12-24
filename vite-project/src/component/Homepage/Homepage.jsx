import React, { useState } from 'react'
import css from "./Homepage.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltered, setSearchInput } from '../../features/coinSlice';

export default function Homepage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isFilterActive, setIsFilterActive] = useState(false);
    const dispatch = useDispatch();
    const searchInput = useSelector((state) => state.coin.searchInput);
    // const [title, setTitle] = useState("");

    const handleNavigate = () => {
        setIsFilterActive(prevState => !prevState);
        if(location.pathname === "/advanced-filter") {
            navigate("/");
        }
        else {
            navigate("/advanced-filter");
        }
        // setIsFilterActive(!isFilterActive);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        // console.log(value);
        // setTitle(value);
        dispatch(setSearchInput(value));
    }

    const handleNavigateForButton = () => {
        fetch("http://localhost:3000/coins")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.filter((coin) => {
                // console.log("coin", coin);
                console.log(coin.coin_name);
            })
            console.log("searchInput = " + searchInput);
            // console.log(data.coin_name);
            const filteredData = data.filter((coin) => {
              return coin.coin_name.toLowerCase().includes(searchInput.toLowerCase());
            // searchInput.toLowerCase().includes(coin.coin_name.toLowerCase());
            })
            console.log(filteredData);
            dispatch(setFiltered(filteredData));
            console.log(searchInput);
        })
        .catch((error) => console.error("Error fetching data:", error));
        navigate("/listOfCoins");
    }

    // const searchButton = () => {
    //   fetch("http://localhost:3000/coins")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const filteredData = data.filter((coin) => {
    //       coin.coin_name.toLowerCase().includes(searchInput.toLowerCase());
    //     })
    //     dispatch(setFiltered(filteredData));
    //   })
    // }

    return (
        <div className={css.container}>
            {/* <h1 className = {css.h1}>Homepage</h1> */}
            <div className = {css.header}>
                <label>Input field</label>
            </div>
            <input className={css.input} type = "text" onChange={handleChange} />
            <button className={css.searchBtn} onClick={handleNavigateForButton}>Search</button>
            <div className = {css.filters} onClick={handleNavigate}>
              <div className={css.filter}>Advanced filter </div>
              {/* <span>˅</span> */}
              <span>{isFilterActive ? "˄" : "˅"}</span>
              {/* <img src = {logo} alt = "Hello"/> */}
            </div>
        </div>
    )
}

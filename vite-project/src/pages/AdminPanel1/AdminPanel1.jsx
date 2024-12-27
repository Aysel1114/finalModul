import React, { useEffect } from 'react'
import Homepage from '../../component/Homepage/Homepage'
import css from "./AdminPanel1.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { setCoins, setFiltered, setSearchInput } from '../../features/coinSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function AdminPanel1() {
    const location = useLocation();
    const navigate = useNavigate();
    const coins = useSelector((state) => state.coin.coins);
    const searchInput = useSelector((state) => state.coin.searchInput);
    const dispatch = useDispatch();
    console.log("coins", coins);
    useEffect(() => {
        fetch("http://localhost:3000/coins")
        .then((response) => response.json())
        .then((data) => {
            dispatch(setCoins(data.slice(0, 2)));
        })
    }, [])
    console.log(coins);

    const handleSearch = () => {
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
            dispatch(setCoins(filteredData));
            console.log(searchInput);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }

    const handleNavigateDetails = (id) => {
        navigate(`/description/${id}`);
    }

    const handleNavigate = () => {
        navigate("/adminPanel2");
    }

    const handleChange = (e) => {
        const value = e.target.value;
        dispatch(setSearchInput(value));
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/coins/${id}`, {
            method: "DELETE"
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === 'Sikkə uğurla silindi') { 
                dispatch(setCoins(coins.filter(coin => coin.coin_id !== id))); 
            } 
            else { 
                console.error("Error deleting coin:", data.error); 
            }
        })
        .catch((error) => console.error("Error deleting coin:", error));
    }

    const render = coins.length > 0 ? (
        <div className={css.coinList}>
            {coins.map((coin, index) => (
                <div key={index} className={css.coinItem}>
                    <img src={coin.imageFront} alt={coin.coin_name} className={css.coinImage} />
                    <div className={css.coinInfo}>
                        <h3 className={css.coinName} onClick={() => handleNavigateDetails(coin.coin_id)}>{coin.coin_name} </h3>
                        <p className={css.coinDescription}>{coin.description} </p>
                    </div>
                    <div className={css.buttons}>
                        <button onClick={() => navigate(`/adminPanelEdit/${coin.coin_id}`)} className={css.button} >Edit</button>
                        <button onClick={() => handleDelete(coin.coin_id)} className={css.button} >Delete</button>
                    </div>
                </div>
            ))}
            <div className={css.newCoin}>
                <img className={css.blankCoin} src = "https://i.postimg.cc/vBx5xfyh/Добавить_монету.png" alt = "empty"/>
                <p className={css.router} onClick={handleNavigate}>Add a new coin</p>
            </div>
        </div>
    ) : (
        <p>No coins found. Try another search.</p>
    )

  return (
    <div className={css.container}>
        <h1 className={css.h1}>Admin Panel</h1>
        <div className = {css.header}>
            <label>Input field</label>
        </div>
        <input className={css.input} type = "text" onChange={handleChange} />
        <button className={css.searchBtn}  onClick={handleSearch}>Search</button>
        {render}
    </div>
  )
}

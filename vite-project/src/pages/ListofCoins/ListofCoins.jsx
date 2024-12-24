import React, { useEffect, useState } from 'react'
import css from "./ListofCoins.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Homepage from '../../component/Homepage/Homepage';
import { useSelector } from 'react-redux';

export default function ListofCoins() {
    const navigate = useNavigate();
    const location = useLocation();
    const [coins, setCoins] = useState([]);
    const filteredCoins = useSelector((state) => state.coin.filtered);

    const handleNavigateForBack = () => {
        navigate("/");
    }

    const handleNavigateDetails = (id) => {
        navigate(`/description/${id}`);
    }
    
    useEffect(() => {
        console.log("filteredCoins", filteredCoins);
    }, [filteredCoins])


    const render = filteredCoins.length > 0 ? (
        <div className={css.coinList}>
            {filteredCoins.map((coin, index) => (
                <div key={index} className={css.coinItem}>
                    <img src={coin.imageFront} alt={coin.coin_name} className={css.coinImage} />
                    <div className={css.coinInfo}>
                        <h3 className={css.coinName} onClick={() => handleNavigateDetails(coin.id)}>{coin.coin_name} </h3>
                        <p className={css.coinDescription}>{coin.description} </p>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p>No coins found. Try another search.</p>
    )

  return (
    <div className={css.container}>
        <h1 className={css.h1}>List of the coins</h1>
        <p className={css.router} onClick={handleNavigateForBack}>Homepage — List of the coins</p>
        <Homepage/>
        {render}
    </div>
  )
}

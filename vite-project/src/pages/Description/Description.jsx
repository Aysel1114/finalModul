import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import css from "./Description.module.css";

export default function Description() {
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    const [coin, setCoin] = useState(null);
    const allCoins = useSelector((state) => state.coin.filtered);
    console.log("allCoins", allCoins);

    useEffect(() => {
        const selectedCoin = allCoins.find((coin) => String(coin.id) === id);
        setCoin(selectedCoin);
        console.log("SelectedCoin", selectedCoin);
    }, [id, allCoins]);

    if (!coin) {
        return <p>Loading...</p>;
    }

    const handleNavigate = () => {
        navigate('/listOfCoins');
    }


  return (
    <div className={css.container}>
        <div className={css.images}>
            <img src={coin.imageFront} alt={coin.coin_name} className={css.image} />
            <img src={coin.imageBack} alt={coin.coin_name} className={css.image} />
        </div>
        <div className={css.info}>
            <h1 className={css.title}>{coin.coin_name}</h1>
            <p className={css.description}>{coin.description}</p>
            <p className={css.description}>{coin.obverseDetails}</p>
            <p className={css.description}>{coin.reverseDetails}</p>
            <table className={css.table}>
                <tr>
                    <td>Issuing Country</td>
                    <td>{coin.issuingCountry} </td>
                </tr>
                <tr>
                    <td>Composition</td>
                    <td>{coin.composition}</td>
                </tr>
                <tr>
                    <td>Quality</td>
                    <td>{coin.quality}</td>
                </tr>
                <tr>
                    <td>Denomination</td>
                    <td>{coin.denomination}</td>
                </tr>
                <tr>
                    <td>Yaer</td>
                    <td>{coin.year}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{coin.weight}</td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td>{coin.price}</td>
                </tr>
            </table>
            <p className={css.router} onClick={handleNavigate}>Back to the list</p>
            {/* <p>{coin.country}</p>
            <p>{coin.composition}</p>
            <p>{coin.quality}</p>
            <p>{coin.price}</p>
            <p>{coin.year}</p> */}
        </div>
    </div>
  )
}

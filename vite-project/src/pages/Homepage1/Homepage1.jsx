import React, { useEffect, useState } from 'react'
import Homepage from '../../component/Homepage/Homepage'
import css from "./Homepage1.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { setCoins, setFiltered } from '../../features/coinSlice';

export default function Homepage1() {

  const coins = useSelector((state) => state.coin.coins);
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.coin.searchInput);
  // console.log(searchInput);
  // const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/coins")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        // dispatch(setMovies(data.Search.slice(0,2)));
        // dispatch(setFiltered(data.Search.slice(0, 2)));
        const uniqueValues = [];
        const filteredData = data.filter((coin) => {
          if(!uniqueValues.includes(coin.coin_type)) {
            uniqueValues.push(coin.coin_type);
            return true;
          }
          return false;
        })
        console.log(filteredData);
        dispatch(setCoins(filteredData));
    })
}, [dispatch])

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
    <div>
      <h1 className={css.h1}>Homepage</h1>
      <div className={css.miniContainer}>
        <Homepage/>
        <div className={css.coinsList}>
          {coins.length > 0 ? (
              coins.map((coin, index) => (
                  <div key={index} className={css.coinItem}>
                      <h3 className={css.h3}>{coin.coin_type}</h3>
                      <p className={css.show}>Show all <span>›</span></p>
                      <img className={css.img} src={coin.imageFront} alt = {coin.coin_name}/>
                      {/* <p>{coin.price}</p> */}
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

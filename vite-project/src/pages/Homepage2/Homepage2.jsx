import React, { useEffect, useState } from 'react'
import Homepage from '../../component/Homepage/Homepage'
import css from "./Homepage2.module.css";

export default function Homepage2() {

    const [countries, setCountries] = useState([]);
    const [metals, setMetals] = useState([]);
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/coins")
        .then((response) => response.json())
        .then((data) => {
            // const countryList = data.map((coin) => coin.issuingCountry);
            const countryList = [...new Set(data.map((coin) => coin.issuingCountry))];
            const metalList = [...new Set(data.map((coin) => coin.composition))];
            const qualityList = [...new Set(data.map((coin) => coin.quality))];
            setCountries(countryList);
            setMetals(metalList);
            setQualities(qualityList);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [])

    const render = () => {
        return (
            <div>
                <label className={css.label}>Issuing country
                    <select className={css.select}>
                        {countries.map((country, index) => (
                            <option key = {index} value = {country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={css.label}>Metal
                    <select className={css.select}>
                        {metals.map((metal, index) => (
                            <option key = {index} value = {metal}>
                                {metal}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={css.label}>Quality of the coin
                    <select className={css.select}>
                        {qualities.map((quality, index) => (
                            <option key = {index} value = {quality}>
                                {quality}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        )
    }

  return (
    <div className={css.container}>
        <h1 className={css.h1}>Homepage</h1>
        <Homepage/>
        <div className = {css.miniContainer}>
            <div>
                {/* <label className={css.label}>Issuing country */}
                    {/* <select className={css.select}>
                        <option value = "Canada">Canada</option>
                    </select> */}
                    {render()}
                {/* </label> */}
                {/* <label className={css.label}>Metal
                    <select className={css.select}>
                        <option value = "Gold">Gold</option>
                    </select>
                </label> */}
                {/* <label className={css.label}>Quality of the coin
                    <select className={css.select}>
                        <option value = "Proof">Proof</option>
                    </select>
                </label> */}
            </div>
            <div>
                <label className={css.label}>Price
                    <div className={css.insideValues}>
                        <label>from
                            <input className={css.input} />
                        </label>
                        <label>to
                            <input className={css.input}/>
                        </label>
                    </div>
                </label>
                <label className={css.label}>Year of issue
                    <div className={css.insideValues}>
                        <label>from
                            <input className={css.input}/>
                        </label>
                        <label>to
                            <input className={css.input}/>
                        </label>
                    </div>
                </label>
            </div>
        </div>
    </div>
  )
}

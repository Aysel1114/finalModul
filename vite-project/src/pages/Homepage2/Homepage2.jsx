import React, { useEffect, useState } from 'react'
import Homepage from '../../component/Homepage/Homepage'
import css from "./Homepage2.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setFiltered, setPriceRange, setSelectedCountry, setSelectedMetal, setSelectedQuality, setYearRange } from '../../features/coinSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Homepage2() {
    const location = useLocation();
    const navigate = useNavigate();

    const [countries, setCountries] = useState([]);
    const [metals, setMetals] = useState([]);
    const [qualities, setQualities] = useState([]);
    const selectedCountry = useSelector((state) => state.coin.selectedCountry);
    const selectedMetal = useSelector((state) => state.coin.selectedMetal);
    const selectedQuality = useSelector((state) => state.coin.selectedQuality);
    const priceRange = useSelector((state) => state.coin.priceRange);
    const yearRange = useSelector((state) => state.coin.yearRange);
    const dispatch = useDispatch();
    const [isFilterActive, setIsFilterActive] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/coins")
        .then((response) => response.json())
        .then((data) => {
            const countryList = [...new Set(data.map((coin) => coin.issuingCountry))];
            const metalList = [...new Set(data.map((coin) => coin.composition))];
            const qualityList = [...new Set(data.map((coin) => coin.quality))];
            setCountries(countryList);
            setMetals(metalList);
            setQualities(qualityList);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [])

    const applyFilters = () => {
        fetch("http://localhost:3000/coins")
        .then((response) => response.json())
        .then((data) => {
            console.log("data", data);
            const newData = data.filter((coin) => {
                console.log("coin", coin.issuingCountry);
                const matchesCountry = selectedCountry ? coin.issuingCountry === selectedCountry : true;
                const matchesMetal = selectedMetal ? coin.composition === selectedMetal : true;
                const matchesQuality = selectedQuality ? coin.quality === selectedQuality : true;
                const matchesPrice =
                    priceRange.from || priceRange.to
                        ? (priceRange.from ? coin.price >= priceRange.from : true) &&
                          (priceRange.to ? coin.price <= priceRange.to : true)
                        : true;
                const matchesYear =
                    yearRange.from || yearRange.to
                        ? (yearRange.from ? coin.year >= yearRange.from : true) &&
                          (yearRange.to ? coin.year <= yearRange.to : true)
                        : true;
                console.log("matchesCountry = " + matchesCountry)
                return matchesCountry && matchesMetal && matchesQuality && matchesPrice && matchesYear;
            });
            console.log("newData", newData);
            dispatch(setFiltered(newData));
            navigate("/listOfCoins", {
                state: {
                    filtered: newData
                }
            });
        })
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

    const render = () => {
        return (
            <div>
                <label className={css.label}>Issuing country
                    <select className={css.select} value = {selectedCountry} onChange={(e) => dispatch(setSelectedCountry(e.target.value))}>
                        <option>Country</option>
                        {countries.map((country, index) => (
                            <option key = {index} value = {country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={css.label}>Metal
                    <select className={css.select} value={selectedMetal} onChange={(e) => dispatch(setSelectedMetal(e.target.value))} >
                        <option>Metal</option>
                        {metals.map((metal, index) => (
                            <option key = {index} value = {metal}>
                                {metal}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={css.label}>Quality of the coin
                    <select className={css.select} value={selectedQuality} onChange={(e) => dispatch(setSelectedQuality(e.target.value))} >
                        <option>Quality</option>
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
        <div className = {css.header}>
            <label>Input field</label>
        </div>
        <input className={css.input} type = "text" />
        <button className={css.searchBtn}  onClick={applyFilters}>Search</button>
        <div className = {css.filters} onClick={handleNavigate}>
          <div className={css.filter}>Advanced filter </div>
          <span>{isFilterActive ? "˅" : "˄"}</span>
        </div>
        <div className = {css.miniContainer}>
            <div>
                {render()}
            </div>
            <div>
                <label className={css.label}>Price
                    <div className={css.insideValues}>
                        <label>from
                            <input className={css.input} value={priceRange.from} onChange={(e) => dispatch(setPriceRange({ ...priceRange, from: e.target.value }))} />
                        </label>
                        <label>to
                            <input className={css.input} value={priceRange.to} onChange={(e) => dispatch(setPriceRange({ ...priceRange, to: e.target.value }))} />
                        </label>
                    </div>
                </label>
                <label className={css.label}>Year of issue
                    <div className={css.insideValues}>
                        <label>from
                            <input className={css.input} value={yearRange.from} onChange={(e) => dispatch(setYearRange({ ...yearRange, from: e.target.value }))} />
                        </label>
                        <label>to
                            <input className={css.input} value={yearRange.to} onChange={(e) => dispatch(setYearRange({ ...yearRange, to: e.target.value }))} />
                        </label>
                    </div>
                </label>
            </div>
        </div>
    </div>
  )
}

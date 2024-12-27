import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import css from "./AdminPanelEdit.module.css"

export default function AdminPanelEdit() {

    const { coin_id } = useParams();
    const navigate = useNavigate();
    const [coinTypes, setCoinTypes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        denomination: '',
        year: '',
        price: '',
        issuingCountry: '',
        composition: '',
        description: '',
        obverseDetails: '',
        reverseDetails: '',
        quality: '',
        weight: '',
        imageFront: '',
        imageBack: '',
        coin_type: '',
    });

    useEffect(() => {
      fetch(`http://localhost:3000/coins/${coin_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Məlumat tapılmadı.");
          }
          return response.json();
        })
        .then((coinData) => {
          fetch("http://localhost:3000/coinTypes")
            .then((response) => response.json())
            .then((coinTypesData) => {
              const matchingCoinType = coinTypesData.find((coinType) => coinType.typeID === coinData.type_id);
              setFormData({
                ...coinData,
                coin_type: matchingCoinType ? matchingCoinType.typeName : "",
              });
              setCoinTypes(coinTypesData);
            })
            .catch((error) => {
              console.error("Xəta:", error);
              alert("Sikkə növləri yüklənərkən xəta baş verdi.");
            });
        })
        .catch((error) => {
          console.error("Xəta:", error);
          alert("Sikkə məlumatı yüklənərkən xəta baş verdi.");
        });
    }, [coin_id]);

    const handleChange = (e) => {
      const { name, value } = e.target;
    
      if (name === "coin_type") {
        const selectedType = coinTypes.find((type) => type.typeName === value);
        setFormData({
          ...formData,
          coin_type: value,
          type_id: selectedType ? selectedType.typeID : null,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    
      const updatedData = { ...formData };
      const { coin_type, ...newData } = updatedData;
      console.log(newData);
    
      fetch(`http://localhost:3000/coins/${coin_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Sikkə yenilənərkən xəta baş verdi.");
          }
          return response.json();
        })
        .then(() => {
          alert("Sikkə məlumatları uğurla yeniləndi!");
          navigate("/adminpanel1");
        })
        .catch((error) => {
          console.error("Xəta:", error);
          alert("Sikkə məlumatını yeniləmək mümkün olmadı.");
        });
    };

  return (
    <div className={css.container}>
      <h1 className={css.h1}>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <div className={css.miniContainer}>
          <div>
            <label className={css.label}>Coin name
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                type="text" 
                placeholder="Enter coin name" 
                className={css.input}
              />
            </label>
            <label className={css.label}>Face value
              <input 
                name="denomination" 
                value={formData.denomination} 
                onChange={handleChange} 
                type="text" 
                placeholder="Enter face value" 
                className={css.input}
              />
            </label>
            <label className={css.label}>Year of issue
              <input 
                name="year" 
                value={formData.year} 
                onChange={handleChange} 
                type="text" 
                placeholder="Enter year of issue" 
                className={css.input}
              />
            </label>
            <label className={css.label}>Price
              <input 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                type="text" 
                placeholder="Enter price" 
                className={css.input}
              />
            </label>
            <label className={css.label}>Country
              <input 
                name="issuingCountry" 
                value={formData.issuingCountry} 
                onChange={handleChange} 
                type="text" 
                placeholder="Enter country" 
                className={css.input}
              />
            </label>
            <label className={css.label}>Metal
              <input 
                name="composition" 
                value={formData.composition} 
                onChange={handleChange}  
                type="text" 
                placeholder="Enter metal" 
                className={css.input}
              />
            </label>
          </div>
          <div>
            <label className={css.label2}>Description
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Enter short description"
                className={css.textarea}
              />
            </label>
            <label className={css.label2}>Obverse description
              <textarea 
                name="obverseDetails" 
                value={formData.obverseDetails} 
                onChange={handleChange} 
                placeholder="Enter long description"
                className={css.textarea}
              />
            </label>
            <label className={css.label2}>Reverse description
              <textarea 
                name="reverseDetails" 
                value={formData.reverseDetails} 
                onChange={handleChange} 
                placeholder="Enter long description"
                className={css.textarea}
              />
            </label>
            <label className={css.label}>Quality of the coin
              <input 
                name="quality" 
                value={formData.quality} 
                onChange={handleChange} 
                type="text" 
                placeholder="Enter quality" 
                className={css.input}
              />
            </label>
            <label className={css.label}>Weight
              <input 
                name="weight" 
                value={formData.weight} 
                onChange={handleChange} 
                type="text" 
                placeholder="Enter weight" 
                className={css.input}
              />
            </label>
          </div>
          <div className={css.info}>
            <div className={css.infoLabel}>
              <label className={css.label}>Link to obverse image
                <input 
                  name="imageFront" 
                  value={formData.imageFront} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Enter link to obverse image" 
                  className={css.input}
                />
              </label>
              <label className={css.label}>Link to reverse image
                <input 
                  name="imageBack" 
                  value={formData.imageBack} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Enter link to reverse image" 
                  className={css.input}
                />
              </label>
              <label className={css.label}>Coin Type
                <select 
                  name="coin_type" 
                  value={formData.coin_type} 
                  onChange={handleChange} 
                  className={css.input}
                >
                  <option value="">Select type</option>
                  {coinTypes.map((coinType) => (
                    <option key={coinType.typeID} value={coinType.typeName}>
                      {coinType.typeName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={css.buttons}>
              <button type="submit" className={css.button}>Save</button>
              <button 
                type="button" 
                onClick={() => navigate('/adminPanel1')} 
                className={css.button}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

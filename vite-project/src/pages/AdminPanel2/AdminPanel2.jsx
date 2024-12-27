import React, { useState } from 'react'
import css from "./AdminPanel2.module.css"
import { useNavigate } from 'react-router-dom'

export default function AdminPanel2() {
    const navigate = useNavigate();

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
        type_id: '',
      });

      const [message, setMessage] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: name === "type_id" ? parseInt(value, 10) : value,
      });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        const isFormValid = Object.values(formData).every(
          (value) => value !== null && value !== ""
        );
      
        if (!isFormValid) {
            setMessage('Please fill in all fields.');
            return;
        }
      
        setMessage(''); 
    
        fetch('http://localhost:3000/coins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to add coin.');
            }
            return response.json();
          })
          .then((result) => {
            alert('Coin added successfully!');
            console.log(result);
            setFormData({
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
              type_id: '',
            });
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while adding the coin.');
          });
      };

    return (
      <div className={css.container}>
        <h1 className={css.h1}>Admin Panel</h1>
        {message && <p className={css.message}>{message}</p>}
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
                <label className={css.label}>Types
                  <select name = "type_id" value={formData.type_id} onChange={handleChange} className={css.input}>
                    <option value = "1">Bullion coins</option>
                    <option value = "2">Exclusive coins</option>
                    <option value = "3">Commemorative coins</option>
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
    );
}

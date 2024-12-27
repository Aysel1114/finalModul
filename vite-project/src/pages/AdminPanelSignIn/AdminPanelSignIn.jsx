import React, { useState } from 'react'
import Admin from '../../component/Admin/Admin'
import css from "./AdminPanelSignIn.module.css";
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminPanelSignIn() {

  const location = useLocation();
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [message, setMessage] = useState("");

  const signup = () => {
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    })
    .then((response) => {
      if(!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Xəta baş verdi.");
        });
      }
      return response.json();
    })
    .then((data) => {
      setMessage("Qeydiyyat uğurla tamamlandı!");
      navigate("/adminPanelLogin");
    })
    .catch((error) => {
      setMessage(error.message || "Xəta baş verdi.");
    })
  }

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNavigate = () => {
    navigate("/adminPanelLogin")
  }

  return (
    <div className={css.container}>
        <h1 className={css.h1}>Admin panel</h1>
        <div className={css.info}>
          <label className={css.label}>Name
            <input name = "name" value = {signupData.name} onChange={handleSignupChange} className={css.input} type = "text" />
          </label>
          <label className={css.label}>Email
            <input name = "email" value = {signupData.email} onChange={handleSignupChange} className={css.input} type = "text" />
          </label>
          <label className={css.label}>Password
            <input name = "password" value = {signupData.password} onChange={handleSignupChange} className={css.input} type = "password" />
          </label>
          <button onClick={signup} className={css.button}>Sign In</button>
          <p className={css.router} onClick={handleNavigate}>Login</p>
          {message && <p>{message}</p>}
        </div>
    </div>
  )
}

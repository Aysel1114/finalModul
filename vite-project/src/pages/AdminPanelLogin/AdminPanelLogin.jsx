import React, { useState } from 'react'
import Admin from '../../component/Admin/Admin'
import css from "./AdminPanelLogin.module.css";
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminPanelLogin() {

  const location = useLocation();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [loginMessage, setLoginMessage] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignInNavigate = () => {
    navigate("/adminPanelSignIn");
  }

  const login = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "İstifadəçi tapılmadı.") {
        setLoginMessage("Email düzgün deyil.");
      } else if (data.message === "Şifrə səhvdir.") {
        setLoginMessage("Şifrə düzgün deyil.");
      } else if (data.message === "Daxil olma uğurla tamamlandı!") {
        navigate("/adminPanel1");
      } else {
        setLoginMessage("Naməlum xəta baş verdi.");
      }
    })
    .catch((error) => {
      setLoginMessage(`Xəta baş verdi: ${error.message}`);
    });
  };
  

  return (
    <div className={css.container}>
        <h1 className={css.h1}>Admin panel</h1>
        <div className={css.info}>
            <label className={css.label}>Email
                <input name = "email" value = {loginData.email} onChange={handleLoginChange} className={css.input} type = "text" />
            </label>
            <label className={css.label}>Password
                <input name = "password" value = {loginData.password} onChange={handleLoginChange} className={css.input} type = "password" />
            </label>
            <button className={css.button} onClick={login}>Login</button>
            <p className={css.router} onClick={handleSignInNavigate}>Sign In</p>
            {loginMessage && <p>{loginMessage}</p>}
        </div>
    </div>
  )
}

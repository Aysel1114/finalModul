import React from 'react'
import Admin from '../../component/Admin/Admin'
import css from "./AdminPanelLogin.module.css";

export default function AdminPanelLogin() {
  return (
    <div>
        <Admin/>
        <div className={css.info}>
            <label>Login
                <input type = "text" />
            </label>
            <label>Password
                <input type = "text" />
            </label>
            <button>Search</button>
        </div>
    </div>
  )
}

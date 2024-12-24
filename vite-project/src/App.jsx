import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage1 from './pages/Homepage1/Homepage1'
import Homepage2 from './pages/Homepage2/Homepage2'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './component/Admin/Admin'
import AdminPanelLogin from './pages/AdminPanelLogin/AdminPanelLogin'
import ListofCoins from './pages/ListofCoins/ListofCoins'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Description from './pages/Description/Description'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage1 />} />
          <Route path="/advanced-filter" element={<Homepage2 />} />
          <Route path='/adminPanel' element={<AdminPanelLogin />}/>
          <Route path='/listOfCoins' element={<ListofCoins />}/>
          <Route path='/description/:id' element={<Description />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );

  // return (
  //   <div>
  //     {/* <Homepage1/> */}
  //     <Homepage2/>
  //   </div>
  // )
}

export default App

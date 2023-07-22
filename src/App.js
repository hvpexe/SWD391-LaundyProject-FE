import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar, Footer, Sidebar} from './Components';
import { Ecommerce, Stores, Calendar, Shippers, Customers, Editor } from './Pages';
import './App.css';

import { useStateContext } from './Contexts/ContextProvider';
import SignIn from './Pages/SignIn';

export const UserContext = createContext([]);
const App = () => {
  const {activeMenu} = useStateContext();

  const [admin, setAdmin] = useState([]);

  return (
    <UserContext.Provider value= {{admin, setAdmin}}>
      {Array.isArray(admin) && admin.length == 0 ? <SignIn /> : <BrowserRouter>
        <div className="flex relative">
          {activeMenu ? (
            <div className="w-64 fixed sidebar bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'bg-main-bg min-h-screen md:ml-64 w-full  '
                : 'bg-main-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-white shadow-md navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Ecommerce />)} />
                <Route path="/ecommerce" element={(<Ecommerce />)} />

                {/* pages  */}
                <Route path="/stores" element={<Stores />} />
                <Route path="/shippers" element={<Shippers />} />
                <Route path="/customers" element={<Customers />} />

                {/* apps  */}
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
      }
    </UserContext.Provider>
  );
};

export default App;
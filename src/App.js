import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { MenuProvider } from './hooks/MenuContext';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Myapis from './pages/MyApis';
import ApiCreate from './pages/ApiCreate';
import ApiOperation from './pages/ApiOperations';
import Resource from './pages/Resource';
import Stage from './pages/Stage';
import UsagePlans from './pages/UsgaePlans';
import UsagePlansCreate from './pages/UsagePlansCreate';
import UsagePlansStage from './pages/UsagePlansStage';



export default function App() {

  return (
    <React.Fragment>
      <MenuProvider>
        <BrowserRouter>    
            <React.Fragment>
              <Sidebar /> 
              <Header />
              
              <Routes>
                <Route path='/myapis' element={<Myapis />}></Route> 
                <Route path='/api/create' element={<ApiCreate />}></Route>               
                <Route path='/api/operation/*' element={<ApiOperation />}></Route>
                <Route path='/usageplans' element={<UsagePlans />}></Route>
                <Route path='/usageplans/create' element={<UsagePlansCreate />}></Route>
                <Route path='/usageplans/stage' element={<UsagePlansStage />}></Route>

                {/* <Route path='/api/operation/:value' element={<Stage />}></Route> */}
                {/* <Route path='/parameter'element={<Parameter />}></Route> */}
                {/* <Route path='/monitoring'element={<Monitoring />}></Route> */}
              </Routes>

            </React.Fragment> 
        </BrowserRouter>
      </MenuProvider>        
    </React.Fragment> 
  );
}


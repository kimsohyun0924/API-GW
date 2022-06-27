import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { MenuProvider } from './hooks/MenuContext';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Dashboard from './pages/Dashboard';
import ApiCreate from './pages/ApiCreate';
import ApiOperation from './pages/ApiOperations';
import Resource from './pages/Resource';



export default function App() {

  return (
    <React.Fragment>
      <MenuProvider>
        <BrowserRouter>    
            <React.Fragment>
              <Sidebar /> 
              <Header />
              
              <Routes>
                {/* <Route path='/dbserver'element={<DBServer />}></Route>  */}
                <Route path='/api/create' element={<ApiCreate />}></Route>   
                <Route path='/api/operation/resource' element={<Resource />}></Route>              
                <Route path='/api/operation' element={<ApiOperation />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route> 
                {/* <Route path='/parameter'element={<Parameter />}></Route> */}
                {/* <Route path='/monitoring'element={<Monitoring />}></Route> */}
                {/* <Route path='/backup' element={<Backup />}></Route>
                <Route path='/' element={<DBServer />}></Route>
                <Route path='*' element={<NotFound />}></Route> */}
              </Routes>

            </React.Fragment> 
        </BrowserRouter>
      </MenuProvider>        
    </React.Fragment> 
  );
}


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { MenuProvider } from './hooks/MenuContext';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';

import Myapis from './pages/API/MyApis';
import ApiCreate from './pages/API/ApiCreate';
import ApiOperation from './pages/API/ApiOperations';
import UsagePlans from './pages/UsagePlan/UsagePlans';
import UsagePlansCreate from './pages/UsagePlan/UsagePlansCreate';
import UsagePlansUpdate from './pages/UsagePlan/UsagePlansUpdate';
import UsagePlansStage from './pages/UsagePlan/UsagePlansStage';
import APIKeys from './pages/ApiKey/APIKeys';
import APIKeyUsagePlans from './pages/ApiKey/APIKeyUsagePlans';



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
                <Route path='/usageplans/edit' element={<UsagePlansUpdate />}></Route>
                <Route path='/usageplans/stage' element={<UsagePlansStage />}></Route>
                <Route path='/apikeys' element={<APIKeys />}></Route>
                <Route path='/apikey/usageplans' element={<APIKeyUsagePlans />}></Route>
  

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


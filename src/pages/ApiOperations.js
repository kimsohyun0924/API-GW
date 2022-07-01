import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router';
import MainContainer from '../layouts/MainContainer';
import { PageTitle, Content, HR } from '../style/PageStyle';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Resource from './Resource';
import Stage from './Stage';
import { style } from '@mui/system';
import { useLocation } from "react-router";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';


const MainDiv = styled.div`
  /* background : pink; */
  padding: 10px 60px 10px 60px;

`;

const HeadDiv = styled.div`
  /* background: pink; */
  padding: 30px 0px 30px 0px;
  font-size: 25px;
  font-weight: bold;
`;

const TSS = styled(Tabs)`
  && {
    min-height: 35px;

  }
`;

const TS = styled(Tab)`
  && {
    font-size: 13px;
    margin: 0px 7px 0px 0px;
    padding: 0px 5px 0px 5px;
    color: black;
    background-color: #f4f4f4;
    min-height: 35px;
  }
`;
 
export default function ApiOperation() {

    const [value, setValue] = useState('0');
    const navigate = useNavigate();
    const { state } = useLocation();

    // console.log(state);
  
    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };

    useEffect(() => {
    
    }, []);

    return ( 
        <React.Fragment>
            <MainContainer>
                <MainDiv>
                  <HeadDiv>{state.name}</HeadDiv>
                    <Box sx={{ width: '100%' }}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                              <TSS value={value} onChange={handleChange} aria-label="basic tabs example">
                                  <TS label="리소스" value="0" />
                                  <TS label="스테이지" value="1" />
                                  <TS label="게이트웨이 응답" value="2" />
                                  <TS label="모델" value="3" />
                              </TSS>
                          </Box>
                          <TabPanel sx={{padding: '5px 0px 0px 0px'}} value="0" >
                              <Resource serviceInfo={state}/>  
                              {/* { navigate('api/operation/resource', {state : state}) }  */}
                          </TabPanel>
                          <TabPanel sx={{padding: '5px 0px 0px 0px'}} value="1" >
                              <Stage/>
                          </TabPanel>
                          <TabPanel sx={{padding: '5px 0px 0px 0px'}} value="2">
                              <div style={{width:"100%", height:"73vh", background:"pink"}}>Item Three</div>
                          </TabPanel>
                          <TabPanel sx={{padding: '5px 0px 0px 0px'}} value="3" >
                              Item Four
                          </TabPanel> 
                        </TabContext> 
                    </Box>
                 </MainDiv>
            </MainContainer>
        </React.Fragment>
        
    );
}


import React, { useEffect, useState, useRef } from 'react';
import { PageTitle, PageSubTitle } from 'style/PageStyle';
import MainContainer from 'layouts/MainContainer';
import MainHeader from 'components/MainHeader';
import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Resource from 'pages/Resource/Resource';
import Stage from 'pages/Stage/Stage';
import { useLocation } from "react-router";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Button from 'components/Button';
import ModalStageDeploy from 'components/ModalStageDeploy'


const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainDiv = styled.div`
  padding: 10px 0px 10px 0px;
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
    const [selectItem, setSelectItem] = useState(null);
    const [createDialog, setCreateDialog] = useState(false);

    // console.log(state);
  
    const handleChange = (event, newValue) => {
        // console.log(newValue);
        setValue(newValue);
    };

    const ModalCreateDialog = () => {
      setCreateDialog(true);
    };

    const onCancel = () => {
      console.log('취소');
      setCreateDialog(false);
    };

    useEffect(() => {
    
    }, []);

    return ( 
        <React.Fragment>
            <MainContainer>
              <MainHeader location={"APIs"}/>
                <HeadDiv>
                  <PageTitle>{state.name}</PageTitle>
                  <div style={{padding: "43px 0px 0px 0px"}}>
                    <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                      <Button size="supersmall" line="line" onClick={ModalCreateDialog}>API 배포</Button>      
                    </ThemeProvider>
                  </div>
                </HeadDiv>
                <MainDiv>
                  {/* <HeadDiv>{state.name}</HeadDiv> */}
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
                              <Stage serviceInfo={state}/> 
                          </TabPanel>
                          <TabPanel sx={{padding: '5px 0px 0px 0px'}} value="2">
                              <div style={{width:"100%", height:"73vh"}}>Item Three</div>
                          </TabPanel>
                          <TabPanel sx={{padding: '5px 0px 0px 0px'}} value="3" >
                              Item Four
                          </TabPanel> 
                        </TabContext> 
                    </Box>
                 </MainDiv> 
            </MainContainer>
            <ModalStageDeploy
              title="API를 배포합니다."
              confirmText="배포"
              cancelText="취소"
              onCancel={onCancel}
              serviceId={state.service_id}
              selectItem={selectItem} 
              setSelectItem={setSelectItem}
              setCreateDialog={setCreateDialog}
              visible={createDialog}>
            </ModalStageDeploy>
        </React.Fragment>
        
    );
}


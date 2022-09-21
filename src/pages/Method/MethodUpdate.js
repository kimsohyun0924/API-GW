import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled, { ThemeProvider } from 'styled-components';

import Button from 'components/Button';
import ToggleSwitch from 'components/ToggleSwitch';
import DropdownMethod from 'components/DropdownMethod';

const AllDiv = styled.div`
    /* min-height: 100%;
    width: 990px; */
    width:100%;
    height: 100%;
    /* padding: 10px 0px 0px 0px; */
`;

const ItemDiv = styled.div`
    display: block;
    padding: 10px 10px 0px 10px;
    /* color: #555555; */
`;

const Item = styled.div`
    display: flex;
    padding: 10px 0px 20px 0px;  
    /* align-items: center;  */
`;

const ItemName = styled.div`
    min-width: 143px;
    width: 17%;
    height: 30px;
    line-height: 15px;
    color: #333336;
    font-size: 14px;
    font-family: Lato Regular;
    padding: 5px 0px 0px 0px;
`;

const ItemInput = styled.div`
    display: flex;
    width: 83%;
    height: 30px;
    font-size: 14px;
`;

const InputForm = styled.input`
    width: 100%;
    height: 30px;
    color: #333333;
    font-size: 14px;
    font-family: Lato Regular;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    padding: 3px 5px 3px 5px;
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px 10px 0px 0px;
`;

export default function MethodUpdate(props) {

  const { resourceId, dropdownItems }= props;
  const [integration_type, setIntegration_type] = useState(null);
  const [method_type, setMethod_type] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
  const [dataTemp, setDataTemp] = useState(null);
  const [inputs, setInputs] = useState({
    url_path: ''
  });
  const { url_path } = inputs;
  const endpointoptionsCommand = [
    {
      "name": "HTTP",
      "value": "HTTP"
    },
    {
      "name": "MOCK",
      "value": "MOCK"
    }
  ];

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  // console.log(inputs);

  const getMethod = async () => {
    //get Method list
    try {
      setError(null);
      const response = await axios.get(
        '/v1.0/g1/paas/apigw/method/'+resourceId,
        {
          headers: { 'user-id' : 'ksh@gmail.com' }
        }
      );
      setDataTemp(response.data); // 데이터는 response.data)
      setIntegration_type(response.data.integration_type);
      setMethod_type(response.data.method_type);
      setInputs({
        url_path : response.data.url_path });
      setToggle(response.data.api_key_using);
    } catch (e) {
      setError(e);
      console.log(error);
    }
  };
  
  useEffect(() => {
    getMethod();
  }, [props.resourceId]);

  const onCreate = () => {
   //update Method
    const updateMethod = async () => {
      try {
        setError(null);
        await axios.put(
          '/v1.0/g1/paas/apigw/method/'+resourceId,
          {
              integration_type: integration_type,
              method_type: method_type,
              url_path: url_path,
              api_key_using: toggle
          },   {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
      }
    };
    updateMethod();
    window.location.reload(true);
  };

  const clickedToggle = () => {
    setToggle(!toggle);
  };

  return (
    <React.Fragment>
      <AllDiv>
        <ItemDiv>
          <Item>
            <ItemName>엔드포인트 유형</ItemName>
            <DropdownMethod dropdownItems={endpointoptionsCommand} default={integration_type} size="large" Command={integration_type} setCommand={setIntegration_type}/>
          </Item>
          <Item>
            <ItemName>Method 종류</ItemName>
            <DropdownMethod dropdownItems={dropdownItems} default={method_type} size="large" Command={method_type} setCommand={setMethod_type}/>
            </Item>
            <Item>
              <ItemName>URL 경로</ItemName>
              <ItemInput>
                <InputForm name="url_path" onChange={onChange} value={url_path}/>
              </ItemInput>
          </Item>
          <Item style={{padding: "0px 10px 10px 0px"}}>
              <ItemName>API Key 활성화</ItemName>
              <ItemInput style={{padding: "10px 0px 0px 0px"}}>
                <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
              </ItemInput>
          </Item>
        </ItemDiv>
        <ButtonDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            {/* <span style={{padding:"0px 10px 0px 0px"}}><Button size="large" line="noline" onClick={onCancel}>취소</Button></span> */}
            <Button size="large" line="line" onClick={onCreate} >저장하기</Button>
          </ThemeProvider>
        </ButtonDiv>
      </AllDiv>
    </React.Fragment>
  );
}

import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';

import styled, { css, ThemeProvider } from 'styled-components';

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
    color: #555555;
    padding: 20px 0px 0px 0px;
`;

const Item = styled.div`
    display: flex;
`;

const ItemName = styled.div`
    width: 17%;
    min-width: 100px;
    height: 30px;
    line-height: 15px;
    font-size: 14px;
    margin-right: 50px;
    padding: 6px 12px 6px 0px;
    /* min-width: 18px; */
    /* margin-right: 50px; */
`;

const ItemInput = styled.div`
    display: flex;
    width: 78%;
    height: 30px;
    /* min-width: 220px; */
    /* align-items: center; */
`;

const InputForm = styled.input`
    width: 100%;
    height: 30px;
    border: solid 1px #b6b6c3;
    background: #ffffff;
    box-sizing: border-box;
    font-size: 14px;
    color: #333333;
    padding: 5px 5px 5px 5px;
    font-family: 'Noto Sans KR', sans-serif !important;
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px 0px 5px 0px;
`;

export default function MethodCreate(props) {

  // console.log(props);

  const { serviceId, resourceId, setIsOpen, dropdownItems, methodCommand, setMethodCommand } = props;
  const [integration_type, setIntegration_type] = useState(null);
  const [method_type, setMethod_type] = useState(methodCommand);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    url_path:''
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

  const onCreate = () => {
    //create Method
    const createMethod = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/apigw/method',
          {
            service_id: serviceId,
            resource_id: resourceId,
            integration_type: integration_type,
            method_type: method_type,
            url_path: url_path,
            api_key_using: toggle
          },
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
      }
    };
    createMethod();
    window.location.reload(true);
  };

  const onCancel = () => {
    console.log("취소");
    setIsOpen(false);
    setMethodCommand("");
  };

  const clickedToggle = () => {
    setToggle((prev) => !prev);
    console.log(toggle);
  };

  return (
    <React.Fragment>
      <AllDiv>
        <ItemDiv>
          <Item>
            <ItemName>엔드포인트 유형</ItemName>
            <DropdownMethod dropdownItems={endpointoptionsCommand} default="엔드포인트 유형" size="large" Command={integration_type} setCommand={setIntegration_type}/>
          </Item>
        </ItemDiv>
        <ItemDiv> 
          <Item>
            <ItemName>Method 종류</ItemName>
            <DropdownMethod dropdownItems={dropdownItems} default={methodCommand} size="large" Command={method_type} setCommand={setMethod_type}/>
            </Item>
          </ItemDiv>
          <ItemDiv> 
            <Item>
              <ItemName>URL 경로</ItemName>
              <ItemInput>
                <InputForm name="url_path" onChange={onChange} value={url_path}/>
              </ItemInput>
          </Item>
        </ItemDiv> 
        <ItemDiv>
          <Item>
              <ItemName>API Key 활성화</ItemName>
              <ItemInput>
                <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
              </ItemInput>
          </Item>
        </ItemDiv>
        <ButtonDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <span style={{padding:"0px 10px 0px 0px"}}><Button size="large" line="noline" onClick={onCancel}>취소</Button></span>
            <Button size="large" line="line" onClick={onCreate} >생성하기</Button>
          </ThemeProvider>
        </ButtonDiv>
      </AllDiv>
    </React.Fragment>
  );
}

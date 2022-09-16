import React, { useState, useRef, useCallback, useEffect } from 'react';
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
    font-size: 15px;
    color: #333333;
    padding: 5px 5px 5px 5px;
    font-family: 'Noto Sans KR', sans-serif !important;
`;

const DropdownContainer = styled.div`
    width: 78%;
    &:hover {
      cursor: pointer;
    }
`;

const DropdownBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 5px 5px 5px;
    border-radius: 2px;
    color: #495057;
    border: 1px solid #b6b6c3;
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%);
    background-color: #ffffff;
    height: 33px;
    font-size: 14px;
`;

const DropdownSelect = styled.p`

`;

const IconSVG = styled.svg`
    margin-left: -28px;
    align-self: center;
    width: 16px;
    height: 16px;
`;

const DropdownMenu = styled.ul`
    display: ${(props) => (props.isActive ? `block` : `none`)};
    width: 51.5%;
    z-index: 10;
    background-color: white;
    position: absolute;
    border: 1px solid #d2d2d2;
    margin-top: 0.2rem;
    overflow-y: auto;
    padding: 0 0;
`;

const DropdownItemContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    border-top: none;
    border-radius: 2px;

    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      color: royalblue;
      background: #e6effc;
    }
  `;

  const DropdownItemName = styled.span`
    font-size: 14px;
    ${props => props.itemName === props.selectedItem && 
      css`
        color: royalblue;
        &:before {
          content: "\u2713";
          padding-right: 0.3rem;
        }
      `
    }
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px 0px 5px 0px;
`;

export default function MethodUpdate(props) {

  const { resourceId, methodCommand, dropdownItems }= props;
  const [integration_type, setIntegration_type] = useState(null);
  const [method_type, setMethod_type] = useState(methodCommand);
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
              <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
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

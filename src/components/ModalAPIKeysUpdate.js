import React, { useState, useRef, useEffect } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import ToggleSwitch from './ToggleSwitch';
import axios from 'axios';
import Button from './Button';
import Logo from '../image/Cancel.svg';
import { checkboxClasses } from '@mui/material';

const DarkBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(153,153,153,0.5);
`;

const DialogBlock = styled.div`
  width: 600px;
  height: 370px;
  padding: 20px 30px 20px 30px;
  background: white;
  border-radius: 2px;
  border : 1px solid black;
`;

const ImgDiv = styled.div`
  display: flex;
  margin-left: 530px;
  justify-content: flex-end;
  cursor: pointer;
`;

const TitleDiv = styled.div`
  font-size : 16px;
  padding : 10px 0px 30px 0px;
`;

const ItemDiv = styled.div`
  display: block;
  color: #333336;
  /* padding: 10px 0px 10px 0px; */
`;

const Item = styled.div`
    /* display: flex;
    padding: 0px 0px 20px 0px; */
    display: flex;
    align-items: center;
`;

const ItemName = styled.div`
    /* width: 150px;
    height: 32px;
    line-height: 32px;
    font-size: 15px; */
    width: 143px;
    height: 45px;
    font-size: 14px;
    padding: 10px 0px 5px 0px;
`;

const ItemInput = styled.div`
    /* width: 380px;
    height: 32px;
    display: flex;
    align-items: center; */
    display: flex;
    width: 380px;
    height: 45px;
    font-size: 14px;
    padding: 10px 0px 5px 0px;
`;

const InputForm = styled.input`
    /* width: 380px;
    height: 32px;
    border: solid 1px #b6b6c3;
    background: #ffffff;
    box-sizing: border-box;
    font-size: 13px;
    color: #333333; */
    width: 380px;
    height: 30px;
    font-size: 14px;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    color: #333336;
    padding: 5px 5px 5px 5px;
`;

const ItemNote = styled.div`
    font-size: 12px;
    color: #777777;
    height: 32px;
    text-align: left;
    display : flex;
    justify-content : center;
    align-items : center;

    ${props => props.state &&
      css`
        color: red;
      `
    }
`;

const Item2 = styled.div`
    display: flex;
    /* width: 917px;
    height: 90px;
    padding: 0px 0px 20px 0px; */
`;

const ItemInput2 = styled.div`
    /* width: 380;
    height: 70px;
    display: flex;
    align-items: center; */
    display: flex;
    width: 380px;
    height: 90px;
    font-size: 14px;
    padding: 10px 0px 5px 0px;
`;

const InputForm2 = styled.textarea`
    /* width: 380px;
    height: 70px;
    border: solid 1px #b6b6c3;
    background: #ffffff;
    box-sizing: border-box;
    font-size: 13px;
    color: #333333; */
    width: 380px;
    min-height: 70px;
    font-size: 14px;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    color: #333336;
    padding: 5px 5px 5px 5px;
    font-family: "Noto Sans KR",sans-serif !important;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0px 5px 0px;
`;

ModalAPIKeysCreate.defaultProps = {
  confirmText: '확인'
};


//제목, 내용, 확인 텍스트, 취소 텍스트
export default function ModalAPIKeysCreate( { title, confirmText, cancelText, onCancel, visible, setUpdateDialog, clickData, setClickData} ) {

  const initialState = {
    "name": null,
    "description": null,
    "api_key_id": null,
    "enabled": null,
    "api_key": null,
    "created_at": null
  }

  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(clickData.enabled);
  const [inputs, setInputs] = useState({
    APIKeyName: clickData.name,
    APIKeyExplain: clickData.description
  });
  const { APIKeyName, APIKeyExplain } = inputs;
  
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  // console.log(inputs);

  const onUpdate = () => {
  
    const updateAPIKey = async () => {
      try {
        setError(null);
        await axios.put(
          '/v1.0/g1/paas/Memsq07/apigw/api-keys/'+clickData.api_key_id,
          {
            name: APIKeyName,
            description: APIKeyExplain,
            enabled: toggle
          }
        );
      } catch (e) {
        setError(e);
      }
    };
    updateAPIKey();
    setClickData(initialState)
    // window.location.reload(true);
    setUpdateDialog(false);
  };

  const clickedToggle = () => {
    setToggle(!toggle);
    console.log(toggle);
  };

  if (!visible) return null;


  return (
      <DarkBackground>
           <DialogBlock>
              <ImgDiv onClick={onCancel}>
                <img src={Logo}/>
              </ImgDiv>
              <TitleDiv><span style={{padding:"0px 10px 0px 0px", fontWeight:"bold"}}>{clickData.name}</span>{title}</TitleDiv>
              <Item>
                  <ItemName>API Key 이름</ItemName>
                  <ItemInput>
                      <InputForm name="APIKeyName" placeholder="API Key 이름을 입력하세요" onChange={onChange} value={APIKeyName || ''}/>
                  </ItemInput>
                  <ItemNote></ItemNote>
              </Item>
              <Item2>
                  <ItemName>API Key 설명</ItemName>
                  <ItemInput2>
                      <InputForm2 name="APIKeyExplain" placeholder="API Key 설명을 입력하세요" onChange={onChange} value={APIKeyExplain || ''}/>
                  </ItemInput2>
                  <ItemNote></ItemNote>
              </Item2>
              <Item>
                  <ItemName>API Key 활성화</ItemName>
                  <ItemInput>
                      <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
                  </ItemInput>
                  <ItemNote></ItemNote>
              </Item>
              <ButtonGroup>
                  <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                  <span style={{padding:"0px 15px 0px 0px"}}><Button size="large" color="gray" line="noline" onClick={onCancel}>{cancelText}</Button></span>
                    <Button size="large" line="line" onClick={onUpdate}>{confirmText}</Button>
                  </ThemeProvider>
              </ButtonGroup>
          </DialogBlock>
      </DarkBackground>
  );
}
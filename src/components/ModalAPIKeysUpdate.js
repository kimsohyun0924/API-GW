import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled, { ThemeProvider } from "styled-components";

import Button from './Button';
import ToggleSwitch from './ToggleSwitch';
import Cancel from 'image/Cancel.svg';

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
    display: block;
    width: 620px;
    height: 390px;
    background: white;
    border-radius: 2px;
    border : 1px solid black;
    padding: 20px 30px 20px 30px;
`;

const ImgDiv = styled.div`
    display: flex;
    cursor: pointer;
    justify-content: flex-end;
    /* margin-left: 530px; */
`;

const TitleDiv = styled.div`
    color: #333333;
    font-size : 16px;
    padding : 15px 0px 20px 0px;
    font-family: Spoqa Han Sans Regular;
`;

const ItemDiv = styled.div`
    display: block;
`;

const Item = styled.div`
    display: flex;
    padding: 10px 10px 20px 10px;  
    /* align-items: center;  */
`;

const ItemName = styled.div`
    width: 143px;
    height: 30px;
    color: #333333;
    font-size: 14px;
    font-family: Lato Regular;
    padding: 5px 0px 0px 0px;
`;

const ItemInput = styled.div`
    width: 390px;
    height: 30px;
    font-size: 14px;
`;

const InputForm = styled.input`
    width: 390px;
    height: 30px;
    color: #333333;
    font-size: 14px;
    font-family: Lato Regular;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    padding: 3px 5px 3px 5px;
`;

const ItemInput2 = styled.div`
    width: 390px;
    height: 90px;
    font-size: 14px;
`;

const InputForm2 = styled.textarea`
    width: 390px;
    height: 90px; 
    color: #333333;
    font-size: 14px;
    font-family: Lato Regular;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    padding: 5px 5px 5px 5px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
`;

ModalAPIKeysCreate.defaultProps = {
    confirmText: '확인'
};

// const ItemNote = styled.div`
//     font-size: 12px;
//     color: #777777;
//     height: 32px;
//     text-align: left;
//     display : flex;
//     justify-content : center;
//     align-items : center;

//     ${props => props.state &&
//       css`
//         color: red;
//       `
//     }
// `;


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

  const [toggle, setToggle] = useState(false);
  const [inputs, setInputs] = useState({
    APIKeyName: '',
    APIKeyExplain: ''
  });
  const { APIKeyName, APIKeyExplain } = inputs;
  const [error, setError] = useState(null);
  
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  // console.log(inputs);


  const onUpdate = () => {
    //update API Key
    const updateAPIKey = async () => {
      try {
        setError(null);
        await axios.put(
          '/v1.0/g1/paas/apigw/api-keys/'+clickData.api_key_id,
          {
            name: APIKeyName,
            description: APIKeyExplain,
            enabled: toggle
          },
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    updateAPIKey();
    setTimeout(() => {
      setClickData(initialState);
      setUpdateDialog(false);
    }, 1000);
    // window.location.reload(true);
  };

  const clickedToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    setToggle(clickData.enabled);
    setInputs({
      APIKeyName: clickData.name,
      APIKeyExplain: clickData.description
    });
  }, [clickData]);

  if (!visible) return null;
  return (
      <DarkBackground>
           <DialogBlock>
              <ImgDiv onClick={onCancel}>
                <img src={Cancel} alt="Cancel"/>
              </ImgDiv>
              <TitleDiv><span style={{padding:"0px 10px 0px 0px", fontWeight:"bold"}}>{clickData.name}</span>{title}</TitleDiv>
              <ItemDiv>
                <Item>
                    <ItemName>API Key 이름</ItemName>
                    <ItemInput>
                        <InputForm name="APIKeyName" placeholder="API Key 이름을 입력하세요" onChange={onChange} value={APIKeyName || ''}/>
                    </ItemInput>
                    {/* <ItemNote></ItemNote> */}
                </Item>
                <Item>
                    <ItemName>API Key 설명</ItemName>
                    <ItemInput2>
                        <InputForm2 name="APIKeyExplain" placeholder="API Key 설명을 입력하세요" onChange={onChange} value={APIKeyExplain || ''}/>
                    </ItemInput2>
                    {/* <ItemNote></ItemNote> */}
                </Item>
                <Item style={{padding: "0px 10px 10px 10px"}}>
                    <ItemName>API Key 활성화</ItemName>
                    <ItemInput style={{padding: "15px 0px 0px 0px"}}>
                        <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
                    </ItemInput>
                    {/* <ItemNote></ItemNote> */}
                </Item>
              </ItemDiv>
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
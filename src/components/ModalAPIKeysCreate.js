import React, { useState, useRef } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import axios from 'axios';
import Button from './Button';
import Logo from '../image/Cancel.svg';
import Spacer from 'react-spacer';

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
  height: 320px;
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

const Item = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
`;

const ItemName = styled.div`
  width: 150px;
  height: 32px;
  line-height: 32px;
  font-size: 15px;
`;

const ItemInput = styled.div`
    width: 380px;
    height: 32px;
    display: flex;
    align-items: center;
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

const InputForm = styled.input`
  width: 380px;
  height: 32px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 13px;
  color: #333333;
`;


const Item2 = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
`;

const ItemInput2 = styled.div`
    width: 380;
    height: 70px;
    display: flex;
    align-items: center;
`;

const InputForm2 = styled.input`
  width: 380px;
  height: 70px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 13px;
  color: #333333;
`;

const ButtonGroup = styled.div`
  margin-top: 11px;
  display: flex;
  justify-content: center;
  
`;

ModalAPIKeysCreate.defaultProps = {
  confirmText: '확인'
};


//제목, 내용, 확인 텍스트, 취소 텍스트
export default function ModalAPIKeysCreate( { title, children, confirmText, cancelText, onCancel, visible, setCreateDialog} ) {

  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    APIKeyName: '',
    APIKeyExplain: ''
  });
  
  const { APIKeyName, APIKeyExplain } = inputs;
  
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  console.log(inputs);

  const onCreate = () => {
  
    const createAPIKey = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/Memsq07/apigw/api-keys/createKey',
          {
            name: APIKeyName,
            description: APIKeyExplain,
            enabled: true
          }
        );
      } catch (e) {
        setError(e);
      }
    };
    createAPIKey();
    window.location.reload(true);
    setCreateDialog(false);
  };

  if (!visible) return null;
  return (
      <DarkBackground>
           <DialogBlock>
              <ImgDiv onClick={onCancel}>
                <img src={Logo}/>
              </ImgDiv>
              <TitleDiv>{title}</TitleDiv>
              <Item>
                  <ItemName>API Key 이름</ItemName>
                  <ItemInput>
                      <InputForm name="APIKeyName" placeholder=" API Key 이름을 입력하세요" onChange={onChange} value={APIKeyName}/>
                  </ItemInput>
                  <ItemNote></ItemNote>
              </Item>
              <Item2>
                  <ItemName>API Key 설명</ItemName>
                  <ItemInput2>
                      <InputForm2 name="APIKeyExplain" placeholder=" API Key 설명을 입력하세요" onChange={onChange} value={APIKeyExplain}/>
                  </ItemInput2>
                  <ItemNote></ItemNote>
              </Item2>
              <ButtonGroup>
                <Spacer grow={1}/>
                  <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                    <span style={{padding:"0px 15px 0px 0px"}}><Button size="large" line="noline" color="gray" onClick={onCancel}>{cancelText}</Button></span>
                    <Button size="large" line="line" onClick={onCreate}>{confirmText}</Button>
                  </ThemeProvider>
               <Spacer grow={1}/> 
              </ButtonGroup>
          </DialogBlock>
      </DarkBackground>
  );
}
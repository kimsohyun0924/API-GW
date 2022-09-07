import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import axios from 'axios';
import Button from './Button';
import Logo from '../image/Cancel.svg';


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
  height: 330px;
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
  display: flex;
  align-items: center;
`;

const ItemName = styled.div`
  width: 143px;
  height: 45px;
  font-size: 14px;
  padding: 10px 0px 5px 0px;
`;

const ItemInput = styled.div`
  display: flex;
  width: 784px;
  height: 45px;
  font-size: 14px;
  padding: 10px 0px 5px 0px;
`;

const InputForm = styled.input`
  width: 400px;
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
  padding: 0 10px;
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
`;

const ItemInput2 = styled.div`
  display: flex;
  width: 784px;
  height: 90px;
  font-size: 14px;
  padding: 10px 0px 5px 0px;
`;

const InputForm2 = styled.textarea`
  width: 400px;
  min-height: 70px;
  font-size: 14px;
  border: solid 1px #b6b6c3;
  box-sizing: border-box;
  color: #333336;
  padding: 5px 5px 5px 5px;
  font-family: "Noto Sans KR",sans-serif !important;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

ModalAPIUpdate.defaultProps = {
  confirmText: '확인'
};


//제목, 내용, 확인 텍스트, 취소 텍스트
export default function ModalAPIUpdate( { title,confirmText, cancelText, onCancel, visible, setUpdateDialog, clickData, setClickData } ) {

  const initialState = {
    "service_id": null,
    "mem_sq": null,
    "name": null,
    "description": null,
    "root_resource_id": null,
    "created_at": null,
    "updated_at": null,
  }

  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    ApiName: clickData.name,
    ApiExplain: clickData.description
  });
  const { ApiName, ApiExplain } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  // console.log(inputs);

  const onUpdate = () => {
    //Update API
    const updateApi = async () => {
      try {
        setError(null);
        await axios.put(
          '/v1.0/g1/paas/Memsq07/apigw/service/'+clickData.service_id,
          {
            api_name: ApiName,
            description: ApiExplain
          }
        );
      } catch (e) {
        setError(e);
      }
    };
    updateApi();
    setClickData(initialState)
    window.location.reload(true);
    setUpdateDialog(false);
  };


  // useEffect(() => {

  // }, [clickData]);
  
  if (!visible) return null;
  return (
      <DarkBackground>
           <DialogBlock>
              <ImgDiv onClick={onCancel}>
                <img src={Logo}/>
              </ImgDiv>
              <TitleDiv><span style={{padding:"0px 10px 0px 0px", fontWeight:"bold"}}>{clickData.name}</span>{title}</TitleDiv>
              <ItemDiv>
                <Item>
                  <ItemName>API 이름</ItemName>
                    <ItemInput>
                        <InputForm name="ApiName" placeholder="API 이름을 입력하세요" onChange={onChange} value={ApiName || '' }/>
                    </ItemInput>
                </Item>
              </ItemDiv>
              <ItemDiv>
                <Item2>
                  <ItemName>API 설명</ItemName>
                  <ItemInput2>
                      <InputForm2 name="ApiExplain" placeholder="API 설명을 입력하세요" onChange={onChange} value={ApiExplain || ''}/>
                  </ItemInput2>
                </Item2>
              </ItemDiv>
              <ButtonGroup>
                  <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                    <span style={{padding:"0px 20px 0px 0px"}}><Button size="large" color="gray" line="noline" onClick={onCancel} >{cancelText}</Button></span>
                    <Button size="large" line="line" Click={onUpdate}>{confirmText}</Button>
                  </ThemeProvider>
              </ButtonGroup>
          </DialogBlock>
      </DarkBackground>
  );
}
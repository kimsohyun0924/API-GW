import React, { useState, useRef } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import ToggleSwitch from '../components/ToggleSwitch';
import CORS from '../pages/CORS';
import Button from '../components/Button';

const ItemDiv = styled.div`
  display: block;
  color: #555555;
  padding: 10px 10px 10px 10px;

`;

const Item = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
`;

const ItemName = styled.div`
  width: 100px;
  /* min-width: 18px; */
  margin-right: 100px;
  height: 32px;
  line-height: 32px;
`;

const ItemInput = styled.div`
    width: 850px;
    min-width: 220px;
    height: 32px;
    display: flex;
    align-items: center;
    
`;

const InputForm = styled.input`
  width: 850px;
  height: 32px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
`;

const Content = styled.div`
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin: 5px 60px 5px 60px;
`;


export default function ResourceCreate() {

    const [inputs, setInputs] = useState({
        ApiName: ''
    });
    
    const onChange = e => {
 
    };

    const onClick = e => {
 
    };



    return (
        <React.Fragment>
          <ItemDiv>
            <Item>
              <ItemName>리소스 경로</ItemName>
              <ItemInput>
                <InputForm name="resource" placeholder=" 리소스 경로 입력" onChange={onChange} />
              </ItemInput>
            </Item>
          </ItemDiv>
          <ItemDiv>
            <Item>
              <ItemName>CORS 활성화</ItemName>
              <ToggleSwitch />
            </Item>
          </ItemDiv>
          <ButtonDiv>
            <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
              <Button size="small" onClick={onClick} noline>취소</Button>
              <Button size="medium" onClick={onClick}>생성하기</Button>
            </ThemeProvider>
          </ButtonDiv>   
        </React.Fragment>
    );
}
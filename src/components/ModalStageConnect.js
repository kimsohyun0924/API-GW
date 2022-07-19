import React, { useState, useRef } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import axios from 'axios';
import Button from './Button';


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
  background: rgba(0, 0, 0, 0.8);
`;

const DialogBlock = styled.div`
  width: 600px;
  height: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const Item = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
`;

const ItemName = styled.div`
  width: 180px;
  min-width: 180px;
  height: 32px;
  line-height: 32px;
  font-size: 15px;
`;

const ItemInput = styled.div`
    width: 500px;
    min-width: 220px;
    height: 32px;
    display: flex;
    align-items: center;
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

const InputForm = styled.input`
  width: 400px;
  height: 32px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
`;


const Item2 = styled.div`
  display: flex;
  height: 100px;
  padding: 0px 0px 30px 0px;
`;

const ItemInput2 = styled.div`
    width: 500px;
    min-width: 220px;
    height: 70px;
    display: flex;
    align-items: center;
`;

const InputForm2 = styled.input`
  width: 400px;
  height: 70px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
`;

const ItemText = styled.span`
  padding-right: 1rem;
  padding-left: 0.3rem;
`;

ModalPopup.defaultProps = {
  confirmText: '확인'
};


//제목, 내용, 확인 텍스트, 취소 텍스트
export default function ModalPopup( { title, children, confirmText, cancelText, onCancel, visible, setUpdateDialog, checkedItems } ) {

  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    ApiName: '',
    ApiExplain: ''
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
    const Api = {
      ApiName,
      ApiExplain
    };
  
    const updateApi = async () => {
      try {
        setError(null);
        await axios.put(
          '/v1.0/g1/paas/Memsq07/apigw/service/'+checkedItems,
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
    window.location.reload(true);
    setUpdateDialog(false);
  };

  if (!visible) return null;
  return (
      <DarkBackground>
           <DialogBlock>
              <h3>{title}</h3>
              <p>{children}</p>
              <Item>
                <ItemName>API 이름</ItemName>
                    <ItemInput>
                            <InputForm name="ApiName" placeholder=" API 이름을 입력하세요" onChange={onChange} value={ApiName}/>
                        </ItemInput>
                        <ItemNote></ItemNote>
                    </Item>
                    <Item2>
                        <ItemName>API 설명</ItemName>
                        <ItemInput2>
                            <InputForm2 name="ApiExplain" placeholder=" API 설명을 입력하세요" onChange={onChange} value={ApiExplain}/>
                        </ItemInput2>
                        <ItemNote></ItemNote>
                    </Item2>
              <ButtonGroup>
                  <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                    <Button size="small" color="gray" onClick={onCancel} noline>{cancelText}</Button>
                    <Button size="small" onClick={onUpdate}>{confirmText}</Button>
                  </ThemeProvider>
              </ButtonGroup>
          </DialogBlock>
      </DarkBackground>
  );
}
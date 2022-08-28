import React, { useState, useEffect, useRef } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import axios from 'axios';
import Button from './Button';
import Logo from '../image/Cancel.svg';
import DropdownMethod from './DropdownMethod';

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
  height: 250px;
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

const ButtonGroup = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;

ModalAPIKeyUsageConnect.defaultProps = {
  confirmText: '확인'
};


//제목, 내용, 확인 텍스트, 취소 텍스트
export default function ModalAPIKeyUsageConnect( { title, confirmText, cancelText, onCancel, setCreateDialog, resourceId, visible, ConnectUsage } ) {

  const [error, setError] = useState(null);
  const [methodCommand, setMethodCommand] = useState(null);
  const [methodCommandValue, setMethodCommandValue] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [usageOptions, setUsageOptions] = useState([]);
  const [data, setData] = useState(null);
  const [selectItem, setSelectItem] = useState(null);


  const fetchUsagePlan = async () => {
    //get UsagePlan
    try {
      setError(null);
      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/usage-plans/'
      );
      setData(response.data);
    } catch (e) {
      setError(e);
    }
  };

  const onCreate = () => {
      
    const createAPIKeyUsageConnet = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/Memsq07/apigw/api-keys/'+resourceId,
          {
            usage_plan_id: selectItem
          }
        );
      } catch (e) {
        setError(e);
      }
    
    };
    createAPIKeyUsageConnet();
    window.location.reload(true);
    setCreateDialog(false);
  };

  useEffect(() => {
    fetchUsagePlan();
  }, []);

  if (!visible) return null;

  return (
      <DarkBackground>
           <DialogBlock>
              <ImgDiv onClick={onCancel}>
                <img src={Logo}/>
              </ImgDiv>
              <TitleDiv>{title}</TitleDiv>
              <Item>
                  <ItemName>Usage Plan</ItemName>
                  <DropdownMethod dropdownItems={data} default="Usage Plan 선택" size="medium" setItem={setMethodCommand} methodCommand={methodCommand} setMethodCommandValue={setMethodCommandValue} selectItem={selectItem} setSelectItem={setSelectItem}/> 
              </Item>
              <ButtonGroup>
                  <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                    <span style={{padding: "0px 20px 0px 0px"}}><Button size="large" color="gray" line="noline" onClick={onCancel}>{cancelText}</Button></span>
                    <Button size="large" line="line" onClick={onCreate}>{confirmText}</Button>
                  </ThemeProvider>
              </ButtonGroup>
          </DialogBlock>
      </DarkBackground>
  );
}
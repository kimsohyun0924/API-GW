import React, { useState, useCallback ,useEffect } from 'react';
import axios from 'axios';

import styled, { css, ThemeProvider } from "styled-components";

import Button from './Button';
import Cancel from 'image/Cancel.svg';
import DropdownStage from 'components/DropdownStage';

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
    width: 620px;
    height: 350px;
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
    color: #333336;
    font-size: 14px;
    font-family: Lato Regular;
    padding: 5px 0px 0px 0px;
`;

const ItemInput = styled.div`
    width: 390px;
    height: 30px;
    font-size: 14px;
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
    /* margin: 10px 0px 5px 0px; */
  
`;

ModalStageDeploy.defaultProps = {
  confirmText: '확인'
};


//제목, 내용, 확인 텍스트, 취소 텍스트
export default function ModalStageDeploy( { title, confirmText, cancelText, onCancel, serviceId, setCreateDialog, visible } ) {

  const [stage_id, setStage_id] = useState(null);
  const [stageOptions, setStageOptions] = useState(null);
  const [inputs, setInputs] = useState({
    StageDescription: ''
  });
  const { StageDescription } = inputs;
  const [error, setError] = useState(null);

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  // console.log(inputs);

  const fetchApis = useCallback(async () => {
    //get api list
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/apigw/stage/service/'+serviceId,
        {
          headers: { 'user-id' : 'ksh@gmail.com' }
        }
      );
      setStageOptions(response.data); // 데이터는 response.data)
      // console.log(response.data);
    } catch (e) {
      setError(e);
      console.log(error);
    }
  }, [serviceId, error]);

  const onCreate = () => {
    //deploy stage
    const deployStage = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/apigw/stage',
          {
            service_id: serviceId,
            stage_id: stage_id,
            description: StageDescription,
            stage_name: null,
            backend_url: null
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
    deployStage();
    window.location.reload(true);
    setCreateDialog(false);
  };

  useEffect(() => {
    fetchApis();
  }, [fetchApis]);

  if (!visible) return null;
  return (
      <DarkBackground>
           <DialogBlock>
              <ImgDiv onClick={onCancel}>
                <img src={Cancel} alt="Cancel"/>
              </ImgDiv>
              <TitleDiv>{title}</TitleDiv>
              <ItemDiv>
                <Item>
                  <ItemName>배포할 Stage</ItemName>
                  <ItemInput>
                    <DropdownStage dropdownItems={stageOptions} default="Stage 선택" size="medium" Command={stage_id} setCommand={setStage_id}/> 
                    </ItemInput>
                </Item>
                <Item>
                  <ItemName>설명</ItemName>
                  <ItemInput2>
                    <InputForm2 name="StageDescription" placeholder="설명을 입력하세요" onChange={onChange} value={StageDescription}/>
                  </ItemInput2>
                </Item>
              </ItemDiv>
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
import React, { useState, useEffect, useRef } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import axios from 'axios';
import Button from './Button';
import Logo from '../image/Cancel.svg';
import DropdownStage from '../components/DropdownStage';

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
    width: 600px;
    height: 220px;
    /* height: 320px; */
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
    padding : 10px 0px 20px 0px;
`;

const ItemDiv = styled.div`
  display: block;
  color: #333336;
  /* padding: 10px 0px 10px 0px; */
`;

const Item = styled.div`
    display: flex;
    /* padding: 0px 0px 20px 0px; */
    /* align-items: center; */
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

ModalStageDeploy.defaultProps = {
  confirmText: '확인'
};


//제목, 내용, 확인 텍스트, 취소 텍스트
export default function ModalStageDeploy( { title, confirmText, cancelText, onCancel, serviceId, setCreateDialog, visible } ) {

  const [stage_id, setStage_id] = useState(null);
  const [stageOptions, setStageOptions] = useState();
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

  const fetchApis = async () => {
    //get api request
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
    }
  };

  const onCreate = () => {
    //Deploy stage
    const deployStage = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/apigw/stage',
          {
            service_id: serviceId,
            stage_id: stage_id,
            stage_name: null,
            backend_url: null
          },
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
      }
    };
    deployStage();
    window.location.reload(true);
    setCreateDialog(false);
  };

  useEffect(() => {
    fetchApis();
  }, []);

  if (!visible) return null;
  return (
      <DarkBackground>
           <DialogBlock>
              <ImgDiv onClick={onCancel}>
                <img src={Logo}/>
              </ImgDiv>
              <TitleDiv>{title}</TitleDiv>
              <ItemDiv>
                <Item>
                  <ItemName>배포할 Stage</ItemName>
                  <ItemInput>
                    <DropdownStage dropdownItems={stageOptions} default="Stage 선택" size="medium" Command={stage_id} setCommand={setStage_id}/> 
                  </ItemInput>
                </Item>
              </ItemDiv>
              {/* <ItemDiv>
                <Item>
                  <ItemName>설명</ItemName>
                  <ItemInput2>
                    <InputForm2 name="StageDescription" placeholder="설명을 입력하세요" onChange={onChange} value={StageDescription}/>
                  </ItemInput2>
                </Item>
              </ItemDiv> */}
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
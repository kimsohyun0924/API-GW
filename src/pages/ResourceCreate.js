import React, { useState, useRef, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import ToggleSwitch from '../components/ToggleSwitch';
import CORS from '../pages/CORS';
import Button from '../components/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';


const AllDiv = styled.div`
  min-height: 100%;
  width: 990px;
`;


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
  margin-right: 50px;
  height: 32px;
  line-height: 32px;
`;

const ItemInput = styled.div`
    width: 650px;
    min-width: 220px;
    height: 32px;
    display: flex;
    align-items: center;
    
`;

const InputForm = styled.input`
  width: 650px;
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


export default function ResourceCreate(props) {

  const serviceInfo = props.serviceInfo;
  const serviceId = serviceInfo.id;
  const nodeId = props.nodeId;
  const label = props.label;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [ResourceRoot, SetResourceRoot] = useState(null);
  const [inputs, setInputs] = useState({
    resource: '',
  });
  const { resource } = inputs;
    
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  };
  console.log(inputs);

  const onCancel = () => {
    console.log('취소');
    window.location.reload(true);
  }


  const onClick = () => {
    const Api = {
      resource
    };
    
    const createResource = async () => {
      try {
        setError(null);    
        const response = await axios.post(
          '/v1.0/g1/paas/Memsq07/apigw/resources'+nodeId,
          {
            serviceId: serviceId,
            api_name: resource
          }
        );
      } catch (e) {
          setError(e);
      }
    };
    createResource();
    window.location.reload(true);
  };

    return (
        <React.Fragment>
          <AllDiv>
            <ItemDiv>
              <Item>
                <ItemName>리소스 경로</ItemName>
                <ItemInput>
                  <InputForm name="resource" placeholder=" 리소스 경로 입력" onChange={onChange} value={resource}/>
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
                <Button size="small" onClick={onCancel} noline>취소</Button>
                <Button size="medium" onClick={onClick} >생성하기</Button>
              </ThemeProvider>
            </ButtonDiv>
          </AllDiv>   
        </React.Fragment>
    );
}
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ToggleSwitch from 'components/ToggleSwitch';
import CORS from 'pages/Resource/CORS';
import Button from 'components/Button';
import axios from 'axios';


const BodyDiv = styled.div`
    width:100%;
    height: 100%;
    padding : 10px 10px 0px 10px;
`;

const ItemDiv = styled.div`
    display: block;
    /* color: #555555;
    padding: 0px 0px 20px 0px; */
`;

const Item = styled.div`
    display: flex;
    padding: 0px 0px 20px 0px;  
    /* align-items: center;  */
`;

const ItemName = styled.div`
    min-width: 143px;
    width: 17%;
    height: 30px;
    color: #333336;
    font-size: 14px;
    font-family: Lato Regular;
    padding: 5px 0px 0px 0px;
`;

const ItemInput = styled.div`
    display: flex;
    width: 83%;
    height: 30px;
    font-size: 14px;
`;

const InputForm = styled.input`
    width: 100%;
    height: 30px;
    color: #333333;
    font-size: 14px;
    font-family: Lato Regular;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    padding: 3px 5px 3px 5px;
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px 0px 0px 0px;
`;


export default function ResourceCreate(props) {

  const serviceInfo = props.serviceInfo;
  const serviceId = serviceInfo.service_id;
  const resourceId = props.resourceId;
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
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

  const onCreate = () => {
    //create resource
    const createResource = async () => {
      try {
        setError(null);    
        await axios.post(
          '/v1.0/g1/paas/apigw/resource',
          {
            service_id: serviceId,
            parent_resource_id: resourceId,
            path: resource
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
    createResource();
    window.location.reload(true);
  };

    const clickedToggle = () => {
      console.log(toggle);
      setToggle((prev) => !prev);
    };

    return (
        <React.Fragment>
          <BodyDiv>
            <ItemDiv>
              <Item>
                <ItemName>리소스 경로</ItemName>
                <ItemInput>
                  <InputForm name="resource" placeholder="리소스 경로 입력" onChange={onChange} value={resource}/>
                </ItemInput>
              </Item>
              <Item style={{padding: "0px 10px 10px 0px"}}>
                <ItemName>CORS 활성화</ItemName>
                  <ItemInput style={{padding: "15px 0px 0px 0px"}}>
                    <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
                  </ItemInput>
              </Item>
            </ItemDiv>
            {
              toggle === true ? 
              <CORS/>
              : null
            }
            <ButtonDiv>
              <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                <span style={{padding:"0px 10px 0px 0px"}}><Button size="small" line="noline" onClick={onCancel}>취소</Button></span>
                <Button size="medium" line="line" onClick={onCreate} >생성하기</Button>
              </ThemeProvider>
            </ButtonDiv>
          </BodyDiv>   
        </React.Fragment>
    );
}
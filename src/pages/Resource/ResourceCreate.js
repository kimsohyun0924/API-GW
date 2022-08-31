import React, { useState, useRef, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import ToggleSwitch from 'components/ToggleSwitch';
import CORS from 'pages/API/CORS';
import Button from 'components/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';


const BodyDiv = styled.div`
    width:100%;
    height: 100%;
    padding : 10px 10px 0px 10px;
`;

const ItemDiv = styled.div`
    display: block;
    color: #555555;
    /* padding: 0px 0px 20px 0px; */
`;

const Item = styled.div`
    display: flex;
    /* align-items: center;
    width: 100%;
    height: 45px; */
`;

const ItemName = styled.div`
    width: 17%;
    min-width: 100px;
    height: 30px;
    line-height: 15px;
    font-size: 14px;
    margin-right: 50px;
    padding: 6px 12px 6px 0px;
    /* padding: 10px 0px 5px 10px; */
`;

const ItemInput = styled.div`
    display: flex;
    width: 78%;
    height: 30px;
    font-size: 14px;
    /* padding: 10px 0px 5px 0px; */
`;

const InputForm = styled.input`
    width: 100%;
    height: 30px;
    font-size: 14px;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    color: #333336;
    padding: 5px 5px 5px 5px;
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px 0px 5px 0px;
`;


export default function ResourceCreate(props) {

  const serviceInfo = props.serviceInfo;
  const serviceId = serviceInfo.service_id;
  const resourceId = props.resourceId;
  const label = props.label;
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [content, setContent] = useState(true);
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
    
    const createResource = async () => {
      try {
        setError(null);    
        const response = await axios.post(
          '/v1.0/g1/paas/Memsq07/apigw/resource',
          {
            service_id: serviceId,
            parent_resource_id: resourceId,
            path: resource
          }
        );
      } catch (e) {
          setError(e);
      }
    };
    createResource();
    window.location.reload(true);
  };

    const clickedToggle = () => {
      setToggle((prev) => !prev);
      // if(toggle == true) {
      //   setContent("true");
      // }
      // else {
      //   setContent("false");
      // }
      // console.log(content);
    };

    // const selectComponent = {
    //   false : <CORS/>
    // };


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
            </ItemDiv>
            {/* <ItemDiv>
              <Item>
                <ItemName>CORS 활성화</ItemName>
                  <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
              </Item>
            </ItemDiv>
            {
              toggle === true ? 
              <CORS/>
              : null
            }
            {content && <Content>{selectComponent[content]}</Content>} */}
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
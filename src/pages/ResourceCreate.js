import React, { useState, useRef, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import ToggleSwitch from 'components/ToggleSwitch';
import CORS from 'pages/CORS';
import Button from 'components/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';


const AllDiv = styled.div`
    /* min-height: 100%;
    width: 990px; */
    width:100%;
    height: 100%;
    /* background:pink; */
`;

const ItemDiv = styled.div`
    display: block;
    color: #555555;
    padding: 0px 0px 20px 0px;
    /* background:pink; */
`;

const Item = styled.div`
    display: flex;
`;

const ItemName = styled.div`
    width: 17%;
    height: 30px;
    line-height: 15px;
    font-size: 14px;
    margin-right: 50px;
    padding: 6px 12px 6px 0px;
    /* min-width: 18px; */
    /* margin-right: 50px; */
`;

const ItemInput = styled.div`
    display: flex;
    width: 78%;
    height: 30px;
    /* min-width: 220px; */
    /* align-items: center; */
`;

const InputForm = styled.input`
    width: 100%;
    height: 30px;
    border: solid 1px #b6b6c3;
    background: #ffffff;
    box-sizing: border-box;
    font-size: 14px;
    color: #333333;
`;

const Content = styled.div`
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 60px 0px 60px;
    /* align-items: center; */
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
    console.log('??????');
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
          <AllDiv>
            <ItemDiv>
              <Item>
                <ItemName>????????? ??????</ItemName>
                <ItemInput>
                  <InputForm name="resource" placeholder=" ????????? ?????? ??????" onChange={onChange} value={resource}/>
                </ItemInput>
              </Item>
            </ItemDiv>
            <ItemDiv>
              <Item>
                <ItemName>CORS ?????????</ItemName>
                  <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
              </Item>
            </ItemDiv>
            {
              toggle === true ? 
              <CORS/>
              : null
            }
            {/* {content && <Content>{selectComponent[content]}</Content>} */}
            <ButtonDiv>
              <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                <Button size="small" onClick={onCancel} noline>??????</Button>
                <Button size="medium" onClick={onCreate} >????????????</Button>
              </ThemeProvider>
            </ButtonDiv>
          </AllDiv>   
        </React.Fragment>
    );
}
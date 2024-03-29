import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';

import Button from 'components/Button';

const AllDiv = styled.div`
    /* min-height: 100%;
    width: 990px; */
    width:100%;
    height: 100%;
    padding : 10px 10px 0px 10px;
    /* background:pink; */
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
    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({
        stage_name:'',
        backend_url:''
    });
    const { stage_name, backend_url } = inputs;
    
    const onChange = (e) => {

      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    };
    console.log(inputs);
    console.log(serviceInfo.service_id);


    const onCancel = () => {
      console.log("취소");
      // setIsOpen(false);
      window.location.reload(true);
    };

    const onCreate = (e) => {
      //create stage
      const createStage = async () => {
        try {
          
          setError(null);
         
          await axios.post(
            '/v1.0/g1/paas/apigw/stage',
            {
              service_id: serviceInfo.service_id,
              stage_id: null,
              stage_name: stage_name,
              backend_url: backend_url
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
      createStage();
      window.location.reload(true);
    };

    return (
        <React.Fragment>
          <AllDiv>
            <ItemDiv>
              <Item>
                <ItemName>스테이지 이름</ItemName>
                <ItemInput>
                  <InputForm name="stage_name" placeholder="스테이지 이름" onChange={onChange} />
                </ItemInput>
              </Item>
              <Item>
                <ItemName>Endpoint 도메인</ItemName>
                <ItemInput>
                  <InputForm name="backend_url" placeholder="Endpoint 도메인" onChange={onChange} />
                </ItemInput>
              </Item>
            </ItemDiv>
            <ButtonDiv>
              <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                <Button size="small" line="noline" onClick={onCancel}>취소</Button>
                <Button size="medium" line="line" onClick={onCreate}>생성하기</Button>
              </ThemeProvider>
            </ButtonDiv>
          </AllDiv>   
        </React.Fragment>
    );
}
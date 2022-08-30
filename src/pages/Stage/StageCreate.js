import React, { useState, useRef } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import axios from 'axios';
import ToggleSwitch from 'components/ToggleSwitch';
import Button from 'components/Button';

const AllDiv = styled.div`
    /* min-height: 100%;
    width: 990px; */
    width:100%;
    height: 100%;
    /* background:pink; */
    padding : 10px 10px 0px 10px;
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
    padding: 5px 5px 5px 5px;
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px 0px 5px 0px;
    /* align-items: center; */
`;

const Content = styled.div`
`;

export default function ResourceCreate(props) {

    const serviceInfo = props.serviceInfo;
    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({
        stage_name:'',
        backend_url:''
    });
    const { stage_name, backend_url } = inputs;
    
    const onChange = e => {

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

    const onCreate = e => {
    
      const createStage = async () => {
        try {
          
          setError(null);
         
          await axios.post(
            '/v1.0/g1/paas/Memsq07/apigw/stage',
            {
              service_id: serviceInfo.service_id,
              stage_name: stage_name,
              backend_url: backend_url
            }
          );
        } catch (e) {
          setError(e);
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
            </ItemDiv>
            <ItemDiv>
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
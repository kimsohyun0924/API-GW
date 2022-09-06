import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { PageTitle } from 'style/PageStyle';
import styled, { css, ThemeProvider } from "styled-components";
import MainContainer from 'layouts/MainContainer';

import Button from 'components/Button';
import MainHeader from 'components/MainHeader';

const HeadDiv = styled.div`

`;

const BodyDiv = styled.div`
  display: block;
  margin: 40px 0px 0px 0px;
`;

const ItemDiv = styled.div`
  display: block;
  color: #333336;
  /* padding: 10px 0px 10px 0px; */
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  /* width: 917px;
  height: 45px; */
`;

const ItemName = styled.div`
  width: 143px;
  height: 45px;
  font-size: 14px;
  padding: 10px 0px 5px 0px;
`;

const ItemInput = styled.div`
  display: flex;
  width: 784px;
  height: 45px;
  font-size: 14px;
  padding: 10px 0px 5px 0px;
`;

const InputForm = styled.input`
  width: 400px;
  height: 30px;
  font-size: 14px;
  border: solid 1px #b6b6c3;
  box-sizing: border-box;
  color: #333336;
  padding: 5px 5px 5px 5px;
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

const Item2 = styled.div`
  display: flex;
  /* width: 917px;
  height: 90px; */
  /* padding: 0px 0px 20px 0px; */
`;

const ItemInput2 = styled.div`
  display: flex;
  width: 784px;
  height: 90px;
  font-size: 14px;
  padding: 10px 0px 5px 0px;
`;

const InputForm2 = styled.textarea`
  width: 400px;
  min-height: 70px;
  font-size: 14px;
  border: solid 1px #b6b6c3;
  box-sizing: border-box;
  color: #333336;
  padding: 5px 5px 5px 5px;
  font-family: "Noto Sans KR",sans-serif !important;
`;

const ItemText = styled.span`
  padding-right: 1rem;
  padding-left: 0.3rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  /* align-items: center; */
  margin: 10px 0px 5px 0px;
`;

export default function ApiCreate() {
  
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    ApiName: '',
    ApiExplain: ''
  });
  const { ApiName, ApiExplain } = inputs;

  const onCancel = (e) => {
    console.log("onCancel");    
    navigate(-1);
  };
  
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  console.log(inputs);

  const onCreate = () => {
      
    const createApi = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/Memsq07/apigw/service',
          {
            api_name: ApiName,
            description: ApiExplain
          }
        );
      } catch (e) {
        setError(e);
      }
    
    };
    createApi();
    setTimeout(()=>{
      navigate('/myapis');     
    }, 1000);
  };

  return (
    <React.Fragment>
        <MainContainer>
          <HeadDiv>
            <MainHeader location={"API 생성"}/>
            <PageTitle>API 생성</PageTitle>
          </HeadDiv>
          <BodyDiv>
            {/* <ItemDiv>
              <Item>
                <ItemName>위치</ItemName>
                <ItemInput>
                  <div>
                    <input type='radio'></input>
                    <ItemText>새로운 API</ItemText> 
                    <input type='radio' ></input>
                    <ItemText>API 복사</ItemText>
                    <input type='radio' ></input>
                    <ItemText>Swagger에서 가져오기</ItemText>
                  </div>
                </ItemInput>
              </Item>
            </ItemDiv> */}
            <ItemDiv>
              <Item>
                <ItemName>API 이름</ItemName>
                  <ItemInput>
                    <InputForm name="ApiName" placeholder="API 이름을 입력하세요" onChange={onChange} value={ApiName}/>
                  </ItemInput>
              </Item>
            </ItemDiv>
            <ItemDiv>
              <Item2>
                <ItemName>API 설명</ItemName>
                <ItemInput2>
                  <InputForm2 name="ApiExplain" placeholder="API 설명을 입력하세요" onChange={onChange} value={ApiExplain}/>
                </ItemInput2>
              </Item2>
            </ItemDiv>
            <ButtonDiv>
                <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                  <span style={{padding: "0px 15px 0px 0px"}}><Button size="large" line="noline" onClick={onCancel}>취소</Button></span>
                  <Button size="large" line="line" onClick={onCreate}>생성하기</Button>
                </ThemeProvider>
            </ButtonDiv>
          </BodyDiv>
        </MainContainer>
    </React.Fragment>
  );
}



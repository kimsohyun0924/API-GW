import React, { useState, useRef, useEffect } from 'react';
import MainContainer from '../layouts/MainContainer';
import { useNavigate } from 'react-router';
import { PageTitle, PageSubTitle, Content } from '../style/PageStyle';
import styled, { css, ThemeProvider } from "styled-components";
import { InputRounded } from '@material-ui/icons';
import { Input } from 'postcss';
import Button from '../components/Button';
import axios from 'axios';

const ItemDiv = styled.div`
  display: block;
  color: #555555;
  padding: 10px 60px 10px 60px;

`;

const Item = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
`;

const ItemName = styled.div`
  width: 180px;
  min-width: 180px;
  height: 32px;
  line-height: 32px;
  font-size: 15px;
`;

const ItemInput = styled.div`
    width: 500px;
    min-width: 220px;
    height: 32px;
    display: flex;
    align-items: center;
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

const InputForm = styled.input`
  width: 400px;
  height: 32px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
`;


const Item2 = styled.div`
  display: flex;
  height: 100px;
  padding: 0px 0px 30px 0px;
`;

const ItemInput2 = styled.div`
    width: 500px;
    min-width: 220px;
    height: 70px;
    display: flex;
    align-items: center;
`;

const InputForm2 = styled.input`
  width: 400px;
  height: 70px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
`;

const ItemText = styled.span`
  padding-right: 1rem;
  padding-left: 0.3rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin: 5px 60px 5px 60px;
`;

export default function ApiCreate() {
  
  const navigate = useNavigate();

  const onCancel = (e) => {
    console.log("onCancel");    
    navigate(-1);
  };

  const [inputs, setInputs] = useState({
    ApiName: '',
    ApiExplain: ''
  });

  const { ApiName, ApiExplain } = inputs;
  
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  console.log(inputs);


  const [error, setError] = useState(null);

  const onCreate = () => {
    const Api = {
      ApiName,
      ApiExplain
    };
  
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
      navigate('/dashboard');     
    }, 1000);
  };

  return (
    <React.Fragment>
        <MainContainer>
            <PageTitle>API 생성</PageTitle>
                <ItemDiv>
                    <Item>
                        <ItemName>API 생성</ItemName>
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
                        <ItemNote></ItemNote>
                    </Item>
                    <Item>
                        <ItemName>API 이름</ItemName>
                        <ItemInput>
                            <InputForm name="ApiName" placeholder=" API 이름을 입력하세요" onChange={onChange} value={ApiName}/>
                        </ItemInput>
                        <ItemNote></ItemNote>
                    </Item>
                    <Item2>
                        <ItemName>API 설명</ItemName>
                        <ItemInput2>
                            <InputForm2 name="ApiExplain" placeholder=" API 설명을 입력하세요" onChange={onChange} value={ApiExplain}/>
                        </ItemInput2>
                        <ItemNote></ItemNote>
                    </Item2>
                </ItemDiv>
                <ButtonDiv>
                  <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                    <Button size="small" onClick={onCancel} noline>취소</Button>
                    <Button size="medium" onClick={onCreate}>생성하기</Button>
                  </ThemeProvider>
                </ButtonDiv>
        </MainContainer>
    </React.Fragment>
  );
}


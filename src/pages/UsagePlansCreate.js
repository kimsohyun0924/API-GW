import React, { useState } from 'react';
import MainContainer from '../layouts/MainContainer';
import { useNavigate } from 'react-router';
import { PageTitle } from '../style/PageStyle';
import styled, { css, ThemeProvider } from "styled-components";
import Button from '../components/Button';
import axios from 'axios';
import ToggleSwitch from '../components/ToggleSwitch';

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
    font-size: 14px;
`;

const InputForm = styled.input`
  width: 400px;
  height: 32px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 12px;
  color: #333333;
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
  height: 100px;
  padding: 0px 0px 30px 0px;
`;

const ItemInput2 = styled.div`
    width: 400px;
    min-width: 220px;
    height: 70px;
    display: flex;
    align-items: center;
`;

const InputForm2 = styled.textarea`
  width: 400px;
  height: 70px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 14px;
  color: #333333;
  font-family: none;  
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
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    ApiName: '',
    ApiExplain: ''
  });
  const { ApiName, ApiExplain } = inputs;
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

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


  const clickedToggle = () => {
    setToggle((prev) => !prev);
    console.log(toggle);
  };

  const clickedToggle2 = () => {
    setToggle2((prev) => !prev);
    console.log(toggle2);
  };

  return (
    <React.Fragment>
        <MainContainer>
            <PageTitle>Usage Plan 생성</PageTitle>
                <ItemDiv>
                    <Item>
                        <ItemName>이름</ItemName>
                        <ItemInput>
                          <InputForm name="ApiName" placeholder=" Usage Plan의 이름을 입력하세요" onChange={onChange} value={ApiName}/>
                        </ItemInput>
                        <ItemNote></ItemNote>
                    </Item>
                    <Item2>
                        <ItemName>설명</ItemName>
                        <ItemInput2>
                            <InputForm2 name="ApiExplain" placeholder=" Usage Plan의 설명을 입력하세요" onChange={onChange} value={ApiExplain}/>
                        </ItemInput2>
                        <ItemNote></ItemNote>
                    </Item2>
                    <Item>
                        <ItemName>요청 할당량</ItemName>
                        <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
                        <ItemNote></ItemNote>
                        { toggle === true ? 
                            <React.Fragment>
                              <input/> 건/일
                              <input/> 건/월
                            </React.Fragment>
                          : null
                        }
                    </Item>
                    <Item>
                        <ItemName>요청 처리량</ItemName>
                        <ToggleSwitch clickedToggle={clickedToggle2} toggle={toggle2}/>
                        <ItemNote></ItemNote>
                        { toggle2 === true ? 
                            <React.Fragment>
                              <input/> 건/초
                            </React.Fragment>
                          : null
                        }
                    </Item>
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



import React, { useState } from 'react';
import MainContainer from 'layouts/MainContainer';
import { useNavigate } from 'react-router';
import { PageTitle } from 'style/PageStyle';
import styled, { css, ThemeProvider } from "styled-components";
import Button from 'components/Button';
import axios from 'axios';

const ItemDiv = styled.div`
  display: block;
  color: #555555;
  padding: 10px 60px 10px 60px;

`;

const Item = styled.div`
  display: flex;
`;

const ItemName = styled.div`
  width: 180px;
  height: 32px;
  /* line-height: 32px; */
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
  padding: 0px 0px 20px 0px;
`;

const ItemInput2 = styled.div`
    width: 400px;
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
            <PageTitle>API ??????</PageTitle>
                <ItemDiv>
                    <Item>
                        <ItemName>API ??????</ItemName>
                        <ItemInput>
                        <div>
                            <input type='radio'></input>
                            <ItemText>????????? API</ItemText> 
                            <input type='radio' ></input>
                            <ItemText>API ??????</ItemText>
                            <input type='radio' ></input>
                            <ItemText>Swagger?????? ????????????</ItemText>
                        </div>
                        </ItemInput>
                        <ItemNote></ItemNote>
                    </Item>
                </ItemDiv>
                <ItemDiv>
                    <Item>
                        <ItemName>API ??????</ItemName>
                        <ItemInput>
                            <InputForm name="ApiName" placeholder=" API ????????? ???????????????" onChange={onChange} value={ApiName}/>
                        </ItemInput>
                        <ItemNote></ItemNote>
                    </Item>
                </ItemDiv>
                <ItemDiv>
                    <Item2>
                        <ItemName>API ??????</ItemName>
                        <ItemInput2>
                            <InputForm2 name="ApiExplain" placeholder=" API ????????? ???????????????" onChange={onChange} value={ApiExplain}/>
                        </ItemInput2>
                        <ItemNote></ItemNote>
                    </Item2>
                </ItemDiv>
                <ButtonDiv>
                  <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                    <Button size="small" onClick={onCancel} noline>??????</Button>
                    <Button size="medium" onClick={onCreate}>????????????</Button>
                  </ThemeProvider>
                </ButtonDiv>
        </MainContainer>
    </React.Fragment>
  );
}



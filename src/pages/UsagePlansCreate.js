import React, { useState, useCallback } from 'react';
import MainContainer from 'layouts/MainContainer';
import { useNavigate } from 'react-router';
import { PageTitle } from 'style/PageStyle';
import styled, { css, ThemeProvider } from "styled-components";
import Button from 'components/Button';
import axios from 'axios';
import ToggleSwitch from 'components/ToggleSwitch';
import TableCompUsageStage from 'components/TableCompUsageStage';

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

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  /* align-items: center; */
  margin: 5px 60px 5px 60px;
`;

const VisiablDiv = styled.div`

  padding: 10px 60px 10px 60px;
  /* background: pink; */
`;

const VisiablText = styled.span`
    
    border-bottom: 1px solid black;
    font-size: 20px;
    cursor: pointer;

    /* ${props => props.state &&
    css`
      color: red;
    `
  } */
`;

const RequestDiv = styled.div`
    display: flex;
    padding: 0px 0px 20px 0px;
`;

const RequestForm = styled.input`
  width: 150px;
  height: 32px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 12px;
  color: #333333;
`;

const TableHeader = [
  "API ??????",
  "Stage ??????"
];

const testData = [
  {
    "api_name": "api_test1",
    "stage_name": "stage_test1",
  },
  {
    "api_name": "api_test2",
    "stage_name": "stage_test2",
  },
]

export default function UsagePlansCreate() {
  
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    ApiName: '',
    ApiExplain: ''
  });
  const { ApiName, ApiExplain } = inputs;
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [stageConnect, setStageConnect] = useState(false);

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

  const onClick = () => {
    // console.log(isActive2)
    setStageConnect((prev) => !prev);
  }
    

  return (
    <React.Fragment>
        <MainContainer>
            <PageTitle>Usage Plan ??????</PageTitle>
                <ItemDiv>
                    <Item>
                        <ItemName>??????</ItemName>
                        <ItemInput>
                          <InputForm name="ApiName" placeholder=" Usage Plan??? ????????? ???????????????" onChange={onChange} value={ApiName}/>
                        </ItemInput>
                        <ItemNote></ItemNote>
                    </Item>
                </ItemDiv>
                <ItemDiv>
                    <Item2>
                        <ItemName>??????</ItemName>
                        <ItemInput2>
                            <InputForm2 name="ApiExplain" placeholder=" Usage Plan??? ????????? ???????????????" onChange={onChange} value={ApiExplain}/>
                        </ItemInput2>
                        <ItemNote></ItemNote>
                    </Item2>
                </ItemDiv>
                <ItemDiv>
                    <Item>
                        <ItemName>?????? ?????????</ItemName>
                        <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
                        <ItemNote></ItemNote>
                    </Item>
                </ItemDiv>
                { toggle === true ? 
                    <React.Fragment>
                        <ItemDiv>
                          <RequestDiv><RequestForm/> ???/??? </RequestDiv>
                          <RequestDiv><RequestForm/> ???/??? </RequestDiv>
                        </ItemDiv>
                    </React.Fragment>
                  : null
                }
                <ItemDiv>
                    <Item>
                        <ItemName>?????? ?????????</ItemName>
                        <ToggleSwitch clickedToggle={clickedToggle2} toggle={toggle2}/>
                        <ItemNote></ItemNote>
                    </Item>
                </ItemDiv>
                { toggle2 === true ? 
                    <React.Fragment>
                      <ItemDiv>
                        <Item><RequestForm/> ???/???</Item>
                      </ItemDiv>
                    </React.Fragment>
                  : null
                }
                <VisiablDiv>
                    <VisiablText onClick={onClick}>Stage ??????</VisiablText>
                    { stageConnect === true ?
                    <div>
                      <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                        <Button size="large">Stage ?????? ??????</Button>
                        <TableCompUsageStage columns={TableHeader} data={testData}/>
                      </ThemeProvider>
                    </div>
                    
                  : null}
                </VisiablDiv>
                <VisiablDiv>
                    <VisiablText onClick={onClick}>API Key ??????</VisiablText>
                    { stageConnect === true ?
                    <div>
                      <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                        <Button size="large">Stage ?????? ??????</Button>
                        <TableCompUsageStage columns={TableHeader} data={testData}/>
                      </ThemeProvider>
                    </div>
                    
                  : null}
                </VisiablDiv>
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



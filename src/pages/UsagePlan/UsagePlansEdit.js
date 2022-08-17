import React, { useState, useCallback } from 'react';
import MainContainer from 'layouts/MainContainer';
import { useNavigate } from 'react-router';
import { PageTitle } from 'style/PageStyle';
import styled, { css, ThemeProvider } from "styled-components";
import Button from 'components/Button';
import axios from 'axios';
import ToggleSwitch from 'components/ToggleSwitch';
import TableCompUsageStage from 'components/TableCompUsageStage';
import img1 from "image/Advanced_pre.svg";
import img2 from "image/Advanced.svg";
import MainHeader from 'components/MainHeader';
import { useLocation } from "react-router";

const HeadDiv = styled.div`
`;

const BodyDiv = styled.div`
  display: block;
  margin: 40px 0px 0px 0px;
`;

const ItemDiv = styled.div`
  display: block;
  color: #555555;
  padding: 10px 0px 10px 0px;
`;

const Item = styled.div`
  display: flex;
`;

const ItemName = styled.div`
  width: 180px;
  min-width: 180px;
  height: 32px;
  /* line-height: 32px; */
  font-size: 15px;
  padding: 10px 0px 10px 0px;
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
  font-size: 16px;
  color: black;
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
  /* padding: 0px 0px 20px 0px; */
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

const VisiablDiv = styled.div`
  padding: 10px 0px 0px 0px;
  /* background: pink; */
`;

const VisiablText = styled.span`
    border-bottom: 1px solid black;
    font-size: 20px;
    cursor: pointer;
`;

const RequestDiv = styled.div`
  display: flex;
  padding: 0px 0px 15px 0px;
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

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  /* align-items: center; */
  margin: 10px 0px 5px 0px;
`;

const TableHeader = [
  "API 이름",
  "Stage 이름"
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

export default function UsagePlansEdit() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    UsagePlanName: '',
    UsagePlanExplain: '',
    replenish_rate: '',
    burst_capacity: ''
  });
  const { UsagePlanName, UsagePlanExplain, replenish_rate, burst_capacity } = inputs;
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

  const onUpdate = () => {
  
    const updateUsagePlan = async () => {
      try {
        setError(null);
        await axios.put(
          '/v1.0/g1/paas/Memsq07/apigw/usage-plans/'+state.id,
          {
            name: UsagePlanName,
            description: UsagePlanExplain,
            replenish_rate: replenish_rate,
            burst_capacity: burst_capacity,
            requested_tokens: "1"
          }
        );
      } catch (e) {
        setError(e);
      }
    
    };
    updateUsagePlan();
    setTimeout(()=>{
    navigate('/usageplans');     
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
            <HeadDiv>
              <MainHeader location={"Usage Plans"}/>
              <PageTitle>Usage Plans 변경</PageTitle>
            </HeadDiv>
            <BodyDiv>
                <ItemDiv>
                    <Item>
                        <ItemName>이름</ItemName>
                        <ItemInput>
                          <InputForm name="UsagePlanName" placeholder=" Usage Plan의 이름을 입력하세요" onChange={onChange} value={UsagePlanName}/>
                        </ItemInput>
                        <ItemNote></ItemNote>
                    </Item>
                  </ItemDiv>
                  <ItemDiv>
                    <Item2>
                        <ItemName>설명</ItemName>
                        <ItemInput2>
                            <InputForm2 name="UsagePlanExplain" placeholder=" Usage Plan의 설명을 입력하세요" onChange={onChange} value={UsagePlanExplain}/>
                        </ItemInput2>
                        <ItemNote></ItemNote>
                    </Item2>
                  </ItemDiv>
                  <ItemDiv>  
                    <Item>
                        <ItemName>요율</ItemName>
                        <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
                        <ItemNote></ItemNote>
                      </Item>
                  </ItemDiv>
                    { toggle === true ? 
                      <React.Fragment>
                        <div style={{padding: "0px 0px 0px 180px"}}>
                          <RequestDiv>
                              <RequestForm name="replenish_rate" placeholder="초당 요청 수" onChange={onChange} value={replenish_rate}/>
                              <ItemNote>초당 요청 수</ItemNote>
                          </RequestDiv>
                        </div>
                      </React.Fragment>
                      : null
                    }
                  <ItemDiv>
                    <Item>
                      <ItemName>버스트</ItemName>
                        <ToggleSwitch clickedToggle={clickedToggle2} toggle={toggle2}/>
                        <ItemNote></ItemNote>   
                    </Item>
                </ItemDiv>
                  { toggle2 === true ? 
                    <React.Fragment>
                      <div style={{padding: "0px 0px 0px 180px"}}>
                      <RequestDiv>
                        <RequestForm name="burst_capacity" placeholder="요청 건" onChange={onChange} value={burst_capacity}/> 
                          <ItemNote>요청 건</ItemNote>
                      </RequestDiv>
                      </div>
                    </React.Fragment>
                    : null
                  }
                <VisiablDiv>
                <VisiablText onClick={onClick}>Stage 연결
                    { stageConnect === true ?
                      <img style={{padding:"0px 0px 0px 10px"}} src={img2}/>
                        : <img style={{padding:"0px 0px 0px 10px"}} src={img1}/>
                    }
                </VisiablText>
              </VisiablDiv>
                { stageConnect === true ?
                  <div>
                    <div style={{padding:"10px 0px 10px 0px"}}>
                      <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                        <Button size="small" line="line">Stage 연결 추가</Button>
                      </ThemeProvider>
                    </div>
                    <TableCompUsageStage columns={TableHeader} data={testData}/>
                  </div>    
                  : null
                }
                </BodyDiv>
                <ButtonDiv>
                  <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                    <span style={{padding: "0px 15px 0px 0px"}}><Button size="small" line="noline" onClick={onCancel}>취소</Button></span>
                    <Button size="medium" line="line" onClick={onUpdate}>저장</Button>
                  </ThemeProvider>
                </ButtonDiv>
        </MainContainer>
    </React.Fragment>
  );
}



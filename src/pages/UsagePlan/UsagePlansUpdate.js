import React, { useState } from 'react';
import { useLocation } from "react-router";
import { useNavigate } from 'react-router';
import axios from 'axios';

import MainContainer from 'layouts/MainContainer';
import { PageTitle } from 'style/PageStyle';
import styled, { css, ThemeProvider } from "styled-components";

import Button from 'components/Button';
import MainHeader from 'components/MainHeader';
import ToggleSwitch from 'components/ToggleSwitch';

const HeadDiv = styled.div`
`;

const BodyDiv = styled.div`
    display: block;
    margin: 40px 0px 0px 0px;
`;

const ItemDiv = styled.div`
    display: block;
`;

const Item = styled.div`
    display: flex;
    padding: 10px 10px 20px 10px;  
    /* align-items: center;  */
`;

const ItemName = styled.div`
    width: 143px;
    height: 30px;
    color: #333336;
    font-size: 14px;
    font-family: Lato Regular;
    padding: 5px 0px 0px 0px;
`;

const ItemInput = styled.div`
    width: 400px;
    height: 30px;
    font-size: 14px;
`;

const InputForm = styled.input`
    width: 400px;
    height: 30px;
    color: #333333;
    font-size: 14px;
    font-family: Lato Regular;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    padding: 3px 5px 3px 5px;
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

const ItemInput2 = styled.div`
    width: 400px;
    height: 90px;
    font-size: 14px;
`;

const InputForm2 = styled.textarea`
    width: 400px;
    height: 90px; 
    color: #333333;
    font-size: 14px;
    font-family: Lato Regular;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    padding: 5px 5px 5px 5px; 
`;

const RequestDiv = styled.div`
    margin: 0px 0px 0px 150px;
    padding: 5px 5px 5px 5px;
    background-color: #f4f4f4;
`;

const RequestInput = styled.div`
    width: 200px;
    height: 30px;
    font-size: 14px;
`;

const RequestForm = styled.input`
    width: 200px;
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
    margin: 15px 0px 5px 0px;
    /* align-items: center; */
`;

const TableHeader = [
  "API 이름",
  "Stage 이름"
];

export default function UsagePlansUpdate() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const [throttling_toggle, setThrottling_toggle] = useState(Throttling);
  const [quota_toggle, setQuota_toggle] = useState(false);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    UsagePlanName: state.name,
    UsagePlanExplain: state.description,
    replenish_rate: state.replenish_rate,
    burst_capacity: state.burst_capacity,
    quota: ''
  });
  const { UsagePlanName, UsagePlanExplain, replenish_rate, burst_capacity, quota } = inputs;
  
  function Throttling() {
    if(state.replenish_rate !== null && state.burst_capacity !== null) {
      return true;
    }
    else {
      return false;
    }
  }

  const onCancel = () => {
    console.log("onCancel");    
    navigate(-1);
  };
  
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  console.log(inputs);

  const clickedThrottlingToggle = () => {
    setThrottling_toggle((prev) => !prev);
    // console.log(throttling_toggle);
  };    

  const clickedQuotaToggle = () => {
    setQuota_toggle((prev) => !prev);
    // console.log(quota_toggle);
  };    

  const onUpdate = () => {
    //Update UsagePlan
    const updateUsagePlan = async () => {
      try {
        setError(null);
        await axios.put(
          '/v1.0/g1/paas/apigw/usage-plans/'+state.usage_plan_id,
          {
            name: UsagePlanName,
            description: UsagePlanExplain,
            replenish_rate: replenish_rate,
            burst_capacity: burst_capacity,
            requested_tokens: "1"
          },
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
      }
    };
    updateUsagePlan();
    setTimeout(()=>{
    navigate('/apigw-usageplans');     
    }, 1000);
  };

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
            <Item>
              <ItemName>설명</ItemName>
              <ItemInput2>
                <InputForm2 name="UsagePlanExplain" placeholder=" Usage Plan의 설명을 입력하세요" onChange={onChange} value={UsagePlanExplain}/>
              </ItemInput2>
              <ItemNote></ItemNote>
            </Item>
            <Item style={{padding: "0px 10px 10px 10px"}}>
              <ItemName>Throttling</ItemName>
              <ItemInput style={{padding: "15px 0px 0px 0px"}}>
                <ToggleSwitch clickedToggle={clickedThrottlingToggle} toggle={throttling_toggle}/>
              </ItemInput>
              <ItemNote></ItemNote>
            </Item>
            { throttling_toggle === true ? 
                <React.Fragment>
                  <RequestDiv>
                    <Item>
                      <ItemName>요율</ItemName>
                      <RequestInput>
                        <RequestForm name="replenish_rate" placeholder="초당 요청 수" onChange={onChange} value={replenish_rate}/>
                      </RequestInput>
                      <ItemNote>초당 요청 수</ItemNote>
                    </Item>
                    <Item>
                      {/* <ItemName>버스트</ItemName> */}
                      <RequestInput>
                        <RequestForm name="burst_capacity" placeholder="요청 건" onChange={onChange} value={burst_capacity}/>
                      </RequestInput>
                      {/* <ItemNote>요청 건</ItemNote> */}
                    </Item>
                  </RequestDiv>
                </React.Fragment>
              : null
            }
            <Item style={{padding: "10px 10px 10px 10px"}}>
              <ItemName>Quota</ItemName>
              <ItemInput style={{padding: "15px 0px 0px 0px"}}>
                <ToggleSwitch clickedToggle={clickedQuotaToggle} toggle={quota_toggle}/>
              </ItemInput>
              <ItemNote></ItemNote>
            </Item>
            { quota_toggle === true ? 
                <React.Fragment>
                  <RequestDiv>
                    <Item style={{padding: "5px 10px 5px 10px"}}>
                      <ItemName>요율</ItemName>
                      <RequestInput>
                        <RequestForm name="quota" placeholder="초당 요청 수" onChange={onChange} value={quota}/>
                      </RequestInput>
                      <ItemNote>초당 요청 수</ItemNote>
                    </Item>
                  </RequestDiv>
                </React.Fragment>
              : null
            }
          </ItemDiv>
        </BodyDiv>
        <ButtonDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <span style={{padding: "0px 15px 0px 0px"}}><Button size="large" line="noline" onClick={onCancel}>취소</Button></span>
            <Button size="large" line="line" onClick={onUpdate}>저장</Button>
          </ThemeProvider>
        </ButtonDiv>
      </MainContainer>
    </React.Fragment>
  );
}
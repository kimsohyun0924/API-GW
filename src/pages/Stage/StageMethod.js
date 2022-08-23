import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import ToggleSwitch from 'components/ToggleSwitch';
import Button from 'components/Button';
import axios from 'axios';
import { useLocation } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import img1 from "image/Advanced_pre.svg";
import img2 from "image/Advanced.svg";

const BodyDiv = styled.div`
  display: block;
  /* margin: 0px 0px 0px 0px; */
`;

const ItemDiv = styled.div`
  display: block;
  /* color: #555555; */
  /* padding: 10px 0px 10px 0px; */
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 917px;
  height: 45px;
`;

const ItemName = styled.div`
  width: 143px;
  height: 45px;
  font-size: 16px;
  padding: 10px 0px 5px 10px;
`;

const ItemInput = styled.div`
  display: flex;
  width: 300px;
  height: 45px;
  font-size: 14px;
  padding: 10px 0px 5px 0px;
`;

const InputForm = styled.input`
  width: 200px;
  height: 30px;
  font-size: 14px;
  border: solid 1px #b6b6c3;
  box-sizing: border-box;
  color: #333336;
  padding: 5px 5px 5px 5px;
`;

const ItemNote = styled.div`
  display : flex;
  height: 30px;
  font-size: 13px;
  color: black;
  padding: 0px 10px 0px 10px;
  justify-content : center;
  align-items : center;
`;

const RequestDiv = styled.div`
  margin: 0px 0px 0px 5px;
  padding: 5px 5px 5px 5px;
  border: 1px solid #b6b6c3;
`;

const RequestName = styled.div`
  display: flex;
  width: 143px;
  height: 45px;
  align-items: center;
  font-size: 14px;
  padding: 10px 0px 5px 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  /* align-items: center; */
  margin: 15px 0px 5px 0px;
`;

export default function StageMethod(props) {

  const [error, setError] = useState(null);
  const [stageConnect, setStageConnect] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [inputs, setInputs] = useState({
    replenish_rate: '',
    burst_capacity: ''
  });
  const { replenish_rate, burst_capacity } = inputs;

  const clickedToggle = () => {
    setToggle((prev) => !prev);
    console.log(toggle);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  console.log(inputs);

  console.log(props.stageId);
  console.log(props.resourceId);

  const onCreate = () => {
      
    const createApi = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/Memsq07/apigw/method/custom-usage-plan',
          {
            stage_id: props.stageId,
            method_id: props.resourceId,
            replenish_rate: replenish_rate,
            burst_capacity: burst_capacity,
            requested_tokens: "1"
          }
        );
      } catch (e) {
        setError(e);
      }
    
    };
    createApi();
    window.location.reload(true);
  };


  return (
    <React.Fragment>
      <BodyDiv>
        <ItemDiv>
          <Item>
            <ItemName>Throttling</ItemName>
            <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
          </Item>
        </ItemDiv>
        { toggle === true ? 
          <React.Fragment>
            <RequestDiv>
              <Item>
                <RequestName>요율</RequestName>
                <ItemInput>
                  <InputForm name="replenish_rate" placeholder="초당 요청 수" onChange={onChange} value={replenish_rate}/>
                  <ItemNote>초당 요청 수</ItemNote>
                </ItemInput>
              </Item>
              <Item>
                <RequestName>버스트</RequestName>
                <ItemInput>
                  <InputForm name="burst_capacity" placeholder="요청 건" onChange={onChange} value={burst_capacity}/>
                  <ItemNote>요청 건</ItemNote>
                </ItemInput>
              </Item>
            </RequestDiv>
          </React.Fragment>
          : null
        }
        <ButtonDiv>
            <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
              <Button size="large" line="line" onClick={onCreate}>생성하기</Button>
            </ThemeProvider>
        </ButtonDiv>
      </BodyDiv>
    </React.Fragment>
  );
}

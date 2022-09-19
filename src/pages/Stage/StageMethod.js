import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import ToggleSwitch from 'components/ToggleSwitch';
import Button from 'components/Button';
import axios from 'axios';

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
  /* align-items: center;
  width: 917px;
  height: 45px; */
`;

const ItemName = styled.div`
  width: 250px;
  height: 45px;
  font-size: 13px;
  padding: 10px 0px 5px 10px;
`;

const ItemInput = styled.div`
  display: flex;
  width: 300px;
  height: 40px;
  font-size: 13px;
  padding: 5px 0px 5px 0px;
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

const ItemInput2 = styled.div`
    display: flex;
    width: 77%;
    height: 40px;
    font-size: 13px;
    padding: 5px 0px 5px 0px;
`;

const InputForm2 = styled.input`
    width: 100%;
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
  padding: 10px 5px 10px 5px;
  border: 1px solid #b6b6c3;
`;

const RequestName = styled.div`
  display: flex;
  width: 143px;
  height: 40px;
  align-items: center;
  font-size: 13px;
  padding: 5px 0px 5px 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  /* align-items: center; */
  margin: 15px 0px 5px 0px;
`;

export default function StageMethod_2(props) {

  // console.log(props);

  const [DataTemp, setDataTemp] = useState([]);
  const [error, setError] = useState(null);
  const [backend_toggle, setBackend_toggle] = useState(false);
  const [usage_toggle, setUsage_toggle] = useState(false);
  const [inputs, setInputs] = useState({
    custom_backend_url: '',
    replenish_rate: '',
    burst_capacity: ''
  });
  const { custom_backend_url, replenish_rate, burst_capacity } = inputs;

  const clickedBackendToggle = () => {
      setBackend_toggle((prev) => !prev);
  };

  const clickedUsageToggle = () => {
      setUsage_toggle((prev) => !prev);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  console.log(inputs);

  // console.log(props.stageId);
  // console.log(props.resourceId);

  const GetMethodInfo = async () => {
    //get Method info
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/apigw/method/'+props.resourceId,
        {
          headers: { 'user-id' : 'ksh@gmail.com' }
        }
      );
      setDataTemp(response.data); // 데이터는 response.data)
      if(response.data.usage_plan_using === false) {
        if(response.data.custom_backend_url_using === false) {
          setInputs({
            custom_backend_url: '',
            replenish_rate: '',
            burst_capacity: ''
          });
        }
        else {
          setInputs({
            custom_backend_url: response.data.custom_backend_url,
            replenish_rate: '',
            burst_capacity: ''
          });
        }
      }
      else {
        if(response.data.custom_backend_url_using === false) {
          setInputs({
            custom_backend_url: '',
            replenish_rate: response.data.replenish_rate,
            burst_capacity: response.data.burst_capacity
          });
        }
        else {
          setInputs({
            custom_backend_url: response.data.custom_backend_url,
            replenish_rate: response.data.replenish_rate,
            burst_capacity: response.data.burst_capacity
          });
        }
      }
      setBackend_toggle(response.data.custom_backend_url_using);
      setUsage_toggle(response.data.usage_plan_using);
      // console.log(response.data);
    } catch (e) {
      setError(e);
    }
  };

  const onCreate = () => {
    //create method-Throttling
    const createThrottling = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/apigw/method/custom-usage-plan',
          {
            stage_id: props.stageId,
            method_id: props.resourceId,
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

    //delete method-Throttling
    const deleteThrottling = async () => {
      try {
        setError(null);
        await axios.delete(
          '/v1.0/g1/paas/apigw/method/custom-usage-plan/'+props.resourceId+'/stage/'+props.stageId,
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
      }
    };

    //create method-Endpoint
    const UpdateEndpoint = async () => {
      try {
        setError(null);
        await axios.put(
          '/v1.0/g1/paas/apigw/method/after-deploy/'+props.resourceId,
          {
            stage_id: props.stageId,
            custom_backend_url_using: backend_toggle,
            custom_backend_url: custom_backend_url
          },
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
      }
    };

    if( usage_toggle === false ) {
      UpdateEndpoint();
      deleteThrottling();
    }
    else if( usage_toggle === true ) {
      UpdateEndpoint();
      createThrottling();
    }
    window.location.reload(true);
  };

  useEffect(() => {
    GetMethodInfo();
  }, [props.resourceId]);

  return (
    <React.Fragment>
      <BodyDiv>
        <ItemDiv> 
          <Item>
            <ItemName>커스텀 Endpoint 도메인 설정</ItemName>
            <ItemInput>
              <ToggleSwitch clickedToggle={clickedBackendToggle} toggle={backend_toggle}/>
            </ItemInput>
          </Item>
        </ItemDiv>
        { backend_toggle === true ? 
          <React.Fragment>
            <RequestDiv>
              <Item>
              <RequestName>Endpoint 도메인</RequestName>
                <ItemInput2>
                  <InputForm2 name="custom_backend_url" placeholder="Endpoint 도메인" onChange={onChange} value={custom_backend_url}/>
                </ItemInput2>
              </Item>
            </RequestDiv>
          </React.Fragment>
          : null
        }
        <ItemDiv>
          <Item>
            <ItemName>Throttling 설정</ItemName>
            <ItemInput>
              <ToggleSwitch clickedToggle={clickedUsageToggle} toggle={usage_toggle}/>
            </ItemInput>
          </Item>
        </ItemDiv>
        { usage_toggle === true ? 
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
              <Button size="large" line="line" onClick={onCreate}>변경하기</Button>
            </ThemeProvider>
        </ButtonDiv>
      </BodyDiv>
    </React.Fragment>
  );
}

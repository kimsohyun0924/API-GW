import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import axios from 'axios';

import Button from 'components/Button';
import ModalUsagePlanConnect from 'components/ModalUsagePlanConnect';
import TableCompStageUsage from 'components/TableCompStageUsage';
import TableCompDeploymentHistory from 'components/TableCompDeploymentHistory';

import img1 from "image/Advanced_pre.svg";
import img2 from "image/Advanced.svg";

const InvokeurlDiv = styled.div`
  background: #eff4fb;
  /* #d9edf7 #d7e3f5 */
  font-size : 16px;
  font-weight: bold;
  padding: 15px 20px 15px 20px;
`;

const CopyButtonDiv = styled.button`
  margin: 0px 0px 0px 10px;
  cursor: pointer;
`;

const VisiablDiv = styled.div`
  margin: 0px 0px 10px 0px;
  padding: 0px 0px 8px 0px;
  border-bottom: 1px solid #e2e2e2;
  /* #e2e2e2 */
  /* background: pink; */
`;

const VisiablText = styled.span`
  display: flex;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  /* display: inline-block */
`;

const HiddenDiv = styled.div`
  padding: 5px 0px 15px 0px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
`;

const ItemName = styled.div`
    display: flex;
    min-width: 250px;
    height: 30px;
    font-size: 14px;
    /* padding: 10px 0px 5px 0px; */
    align-items: center; //아이템 세로축 가운데 정렬
`;

const ItemInput = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    font-size: 14px;
    /* padding: 10px 0px 5px 0px; */
`;

const InputForm = styled.input`
    width: 100%;
    height: 30px;
    font-size: 14px;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    color: #333336;
    padding: 5px 5px 5px 5px;
`;

const UsagePlanDiv = styled.div`
  padding: 0px 0px 10px 0px;
`;

const TableDiv = styled.div`
`;

const TableHeaderUsagePlan = [
  "Usage Plan 이름",
  "설명",
  "ID",
  "요율",
  "버스트"
];

const TableHeaderDeployHistory = [
  "배포일시",
  "배포 상태",
  "배포",
  "삭제"
];

export default function StageInfo(props) {
  // console.log(props);

  const initialState = {
    "usage_plan_id": null,
    "name": null,
    "description": null,
    "replenish_rate": null,
    "burst_capacity": null,
    "requested_tokens": null,
    "api_key_list": null,
  }
  const [clickData, setClickData] = useState(initialState);
  const [stageConnect, setStageConnect] = useState(false);
  const [stageConnect2, setStageConnect2] = useState(false);
  const [stageConnect3, setStageConnect3] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [DataTemp, setDataTemp] = useState([]);
  const [DataTemp2, setDataTemp2] = useState([]);
  const [DataTemp3, setDataTemp3] = useState([]);
  const [error, setError] = useState(null);
  const [selectItem, setSelectItem] = useState(null);
  const [inputs, setInputs] = useState({
    backend_url: ''
  });
  const { backend_url } = inputs;

  const onClick = () => {
    setStageConnect((prev) => !prev);
  }

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  console.log(inputs);

  const onUpdate = () => {
    //Update stage EndpointUrl
    const UpdateEndpointUrl = async () => {
      try {
        setError(null);
        await axios.put(
          '/v1.0/g1/paas/apigw/stage/'+props.stageId,
          {
            backend_url:backend_url
          },
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    UpdateEndpointUrl();
    window.location.reload(true);
  }
  
  const onClick2 = e => {
    setStageConnect2((prev) => !prev);
    //Get Stage-UsagePlan Connect List
    const fetchConnectUsgaList = async () => {
      try {
        setError(null);
        const response = await axios.get(
          '/v1.0/g1/paas/apigw/stage/'+props.stageId+'/usage-plan',
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
        setDataTemp(response.data); // 데이터는 response.data)
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    fetchConnectUsgaList();
  }

  const onClick3 = () => {
    setStageConnect3((prev) => !prev);
    //Get Stage Deployment History List
    const fetchStageDeployList = async () => {
      try {
        setError(null);
        const response = await axios.get(
          '/v1.0/g1/paas/apigw/stage/'+props.stageId+'/snapshots',
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
        setDataTemp2(response.data); // 데이터는 response.data)
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    fetchStageDeployList();
  }

  const ModalCreateDialog = () => {
    setCreateDialog(true);

    const fetchUsagePlan = async () => {
      //get UsagePlan
      try {
        setError(null);
        const response = await axios.get(
          '/v1.0/g1/paas/apigw/usage-plans/',
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
        setDataTemp3(response.data.filter((item) => !(DataTemp.some((i) => i.usage_plan_id === item.usage_plan_id))));
      } catch (e) {
        setError(e);
      }
    };
    fetchUsagePlan();
  };

  const onCancel = () => {
    console.log('취소');
    setCreateDialog(false);
  };

  const onDelete = () => {
    //Delete Stage-UsagePlan Connect
     const deleteStageUsagePlanConnect = async () => {
       try {
         setError(null);
         await axios.delete(
           '/v1.0/g1/paas/apigw/stage/'+props.stageId+'/usage-plan/'+clickData.usage_plan_id,
           {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
         );
       } catch (e) {
         setError(e);
         console.log(error);
       }
     };
     deleteStageUsagePlanConnect();
     window.location.reload(true);
   };

   useEffect(() => {
      setInputs({
        backend_url: props.backend_url
      });
    //  console.log("stageId 바뀔 때마다 리랜더링");
    setStageConnect(false);
    setStageConnect2(false);
    setStageConnect3(false);
    setDataTemp2([]);
  }, [props.stageId]);



  return (
    <React.Fragment>
      {/* <InvokeurlDiv>{props.stageId}.ktcloud.io
        <CopyToClipboard text={props.stageId+".ktcloud.io"} onCopy={()=>alert("주소가 복사되었습니다")}>
          <CopyButtonDiv>주소 복사</CopyButtonDiv>
        </CopyToClipboard>
      </InvokeurlDiv> */}
      <VisiablDiv>
        <VisiablText onClick={onClick}>Settings 
          { stageConnect === true ?
            <img style={{padding:"0px 0px 0px 10px"}} src={img2}/>
            : <img style={{padding:"0px 0px 0px 10px"}} src={img1}/>
          }
        </VisiablText>
      </VisiablDiv>
      { stageConnect === true ?
        <React.Fragment>
          <HiddenDiv>
            <Item>
              <ItemName>Endpoint 도메인</ItemName>
              <ItemInput>
                <InputForm name="backend_url" placeholder="Endpoint 도메인" onChange={onChange} value={backend_url}/>
              </ItemInput>
            </Item>
            <div style={{padding: "10px 0px 0px 0px"}}>
              <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                <span style={{ display:"flex", justifyContent: "flex-end" }}><Button size="supersmall" line="line" onClick={onUpdate}>변경</Button></span>
              </ThemeProvider>
            </div>
          </HiddenDiv>
        </React.Fragment>
      : null}
      <VisiablDiv>
        <VisiablText onClick={onClick2}>Usage Plans
          { stageConnect2 === true ?
            <img style={{padding:"0px 0px 0px 10px"}} src={img2}/>
            : <img style={{padding:"0px 0px 0px 10px"}} src={img1}/>
          }
        </VisiablText>
      </VisiablDiv>
      { stageConnect2 === true ?
        <React.Fragment>
          <HiddenDiv>
            <UsagePlanDiv>
              <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                <span style={{padding: "0px 15px 0px 0px"}}><Button size="supersmall" line="line" onClick={ModalCreateDialog}>Usage Plan 연결</Button></span>
                <Button size="supersmall" line="line" onClick={onDelete}>연결 해제 </Button>
              </ThemeProvider>
            </UsagePlanDiv>
            <TableDiv>
              <TableCompStageUsage columns={TableHeaderUsagePlan} data={DataTemp} clickData={clickData} setClickData={setClickData}/>
            </TableDiv>
          </HiddenDiv>
        </React.Fragment>
      : null}
      <VisiablDiv>
        <VisiablText onClick={onClick3}>Deployment History 
          { stageConnect3 === true ?
            <img style={{padding:"0px 0px 0px 10px"}} src={img2}/>
            : <img style={{padding:"0px 0px 0px 10px"}} src={img1}/>
          }
        </VisiablText>
      </VisiablDiv>
      { stageConnect3 === true ?
        <React.Fragment>
          <HiddenDiv>
            <TableDiv>
              <TableCompDeploymentHistory columns={TableHeaderDeployHistory} data={DataTemp2} clickData={clickData} setClickData={setClickData} setStageConnect3={setStageConnect3}/>
            </TableDiv>
          </HiddenDiv>
        </React.Fragment>
      : null}
      <ModalUsagePlanConnect
          title="Usage Plan과 연결합니다."
          confirmText="연결하기"
          cancelText="취소"
          onCancel={onCancel}
          stageId={props.stageId}
          UsageList={DataTemp3}
          setCreateDialog={setCreateDialog}
          visible={createDialog}>
      </ModalUsagePlanConnect>
    </React.Fragment>
  );
}

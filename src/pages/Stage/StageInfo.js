import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import Button from 'components/Button';
import axios from 'axios';
import { useLocation } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import img1 from "image/Advanced_pre.svg";
import img2 from "image/Advanced.svg";
import ModalUsagePlanConnect from 'components/ModalUsagePlanConnect';
import TableCompStageUsage from 'components/TableCompStageUsage';

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
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 5px 0px;
  border-bottom: 0.5px solid black;
  /* #e2e2e2 */
  /* background: pink; */
`;

const VisiablText = styled.span`
  display: flex;
  font-size: 18px;
  cursor: pointer;
  /* display: inline-block */
`;

const UsagePlanDiv = styled.div`
  padding: 10px 0px 10px 0px;
`;

const TableDiv = styled.div`
`;

const TableHeader = [
  "Usage Plan 이름",
  "설명",
  "ID",
  "요율",
  "버스트"
];

export default function StageInfo(props) {

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
  const [createDialog, setCreateDialog] = useState(false);
  const [DataTemp, setDataTemp] = useState([]);
  const [error, setError] = useState(null);
  const [selectItem, setSelectItem] = useState(null);
  
  const onClick = () => {
    // console.log(isActive2)
    setStageConnect((prev) => !prev);

    const fetchConnectUsgaList = async () => {
      try {
        setError(null);
        const response = await axios.get(
          '/v1.0/g1/paas/Memsq07/apigw/stage/'+props.resourceId+'/usage-plan'
        );
        setDataTemp(response.data); // 데이터는 response.data)
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    fetchConnectUsgaList();
  }

  const onClick2 = () => {
    setCreateDialog(true);
  };

  const onCancel = () => {
    console.log('취소');
    setCreateDialog(false);
  };

  const onCreate = () => {
      
    const createStageUsageConnet = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/Memsq07/apigw/stage/usage-plan',
          {
            stage_id: props.resourceId,
            usage_plan_id: selectItem
          }
        );
      } catch (e) {
        setError(e);
      }
    
    };
    createStageUsageConnet();
    window.location.reload(true);
    setCreateDialog(false);
  };

  const onDelete = () => {
    //delete api request
     const deleteStageUsagePlanConnect = async () => {
       try {
         setError(null);
         await axios.delete(
           '/v1.0/g1/paas/Memsq07/apigw/stage/'+props.resourceId+'/usage-plan/'+clickData.usage_plan_id
         );
       } catch (e) {
         setError(e);
         console.log(error);
       }
     };
     deleteStageUsagePlanConnect();
     window.location.reload(true);
   };



  return (
    <React.Fragment>
      {/* <InvokeurlDiv>{props.resourceId}.ktcloud.io
        <CopyToClipboard text={props.resourceId+".ktcloud.io"} onCopy={()=>alert("주소가 복사되었습니다")}>
          <CopyButtonDiv>주소 복사</CopyButtonDiv>
        </CopyToClipboard>
      </InvokeurlDiv> */}
      <VisiablDiv>
        <VisiablText onClick={onClick}>Usage Plans
          { stageConnect === true ?
            <img style={{padding:"0px 0px 0px 10px"}} src={img2}/>
            : <img style={{padding:"0px 0px 0px 10px"}} src={img1}/>
          }
        </VisiablText>
      </VisiablDiv>
      { stageConnect === true ?
        <React.Fragment>
          <UsagePlanDiv>
            <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
              <span style={{padding: "0px 15px 0px 0px"}}><Button size="supersmall" line="line" onClick={onClick2}>Usage Plan 연결</Button></span>
              <Button size="supersmall" line="line" onClick={onDelete}>연결 해제 </Button>
            </ThemeProvider>
          </UsagePlanDiv>
          <TableDiv>
            <TableCompStageUsage columns={TableHeader} data={DataTemp} clickData={clickData} setClickData={setClickData}/>
          </TableDiv>
        </React.Fragment>
      : null}
      <ModalUsagePlanConnect
          title="Usage Plan과 연결합니다."
          confirmText="연결하기"
          cancelText="취소"
          onCreate={onCreate}
          onCancel={onCancel}
          selectItem={selectItem} 
          setSelectItem={setSelectItem}
          ConnectUsage={DataTemp}
          visible={createDialog}>
      </ModalUsagePlanConnect>
    </React.Fragment>
  );
}

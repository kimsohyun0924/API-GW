import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { PageTitle, PageSubTitle } from 'style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import MainContainer from 'layouts/MainContainer';

import Button from 'components/Button';
import MainHeader from 'components/MainHeader';
import TableCompUsagePlans from 'components/TableCompUsagePlans';
import ModalAPIDelete from 'components/ModalAPIDelete';


const HeadDiv = styled.div`
`;

const ButtonDiv = styled.div`
/* flex 아이템들을 왼쪽에서 오른쪽으로 정렬 */
  display: flex;
  padding: 30px 0px 20px 0px;
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

export default function UsagePlans() {

  const initialState = {
    "name": null,
    "description": null,
    "usage_plan_id": null,
    "replenish_rate": null,
    "burst_capacity": null,
    "requested_tokens": null,
    "api_key_list": null,
  }
  const [clickData, setClickData] = useState(initialState);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [dataTemp, setDataTemp] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const testData = [
    {
        "usage_plan_id": "632ac61e438f3f5554e8acf4",
        "name": "plan01",
        "description": "정책 01",
        "user_id": "ksh@gmail.com",
        "replenish_rate": 200,
        "burst_capacity": 200,
        "requested_tokens": 1,
        "quota": null,
        "period_type": null,
        "api_key_list": null
    }
]

  
  const Create = () => {
    navigate('/usageplans/create');
  };

  const Update = () => {
    navigate('/usageplans/update', {state: clickData});
  };

  const Delete = () => {
    setDeleteDialog(true);
  };

  const StageConncet = () => {
    navigate('/usageplans/stage', {state: clickData});
  };

  const onCancel = () => {
    console.log('취소');
    setUpdateDialog(false);
    setDeleteDialog(false);
  };

  const fetchUsagePlans = async () => {
    //Get UsagePlan
    try {
      setError(null);
      const response = await axios.get(
        '/v1.0/g1/paas/apigw/usage-plans',
        {
          headers: { 'user-id' : 'ksh@gmail.com' }
        }
      );
      setDataTemp(response.data); // 데이터는 response.data)
      // console.log(response.data);
    } catch (e) {
      setError(e);
    }
  };

  const onDelete = () => {
   //Delete UsagePlan
    const deleteUsagePlan = async () => {
      try {
        setError(null);
        await axios.delete(
          '/v1.0/g1/paas/apigw/usage-plans/'+clickData.usage_plan_id,
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    deleteUsagePlan();
    // window.location.reload(true);
    setDeleteDialog(false);
  };

  useEffect(() => {
    fetchUsagePlans();
  }, [dataTemp]);

  return (
    <React.Fragment>
      <MainContainer>
        <HeadDiv>
          <MainHeader location={"Usage Plans"}/>
          <PageTitle>Usage Plans</PageTitle>
          <PageSubTitle>API의 사용량을 계획합니다.</PageSubTitle>
        </HeadDiv>
        <ButtonDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <span style={{padding: "0px 20px 0px 0px"}}><Button size="small" line="line" action={Create}>Usage Plan 생성</Button></span>
            <span style={{padding: "0px 10px 0px 0px"}}><Button size="small" line="outline" disabled={clickData.usage_plan_id === null} onClick={Update}>변경</Button></span>
            <span style={{padding: "0px 10px 0px 0px"}}><Button size="small" line="outline" disabled={clickData.usage_plan_id === null} onClick={Delete}>삭제</Button></span>
            <Button size="small" line="outline" disabled={clickData.usage_plan_id === null} onClick={StageConncet}>연결된 Stage</Button>
          </ThemeProvider>
        </ButtonDiv>
        <TableDiv>
          <TableCompUsagePlans columns={TableHeader} data={dataTemp} clickData={clickData} setClickData={setClickData}/>
        </TableDiv>
      </MainContainer>
       <ModalAPIDelete
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제하기"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            checkedItem={clickData.id}
            visible={deleteDialog}
            >
            <span style={{fontWeight:"bold"}}>{clickData.name}</span><span style={{padding:"0px 0px 0px 10px"}}>Usage Plan을 삭제합니다.</span>
      </ModalAPIDelete>
    </React.Fragment>
  );
}
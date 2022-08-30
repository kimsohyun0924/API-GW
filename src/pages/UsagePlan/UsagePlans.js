import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContainer from 'layouts/MainContainer';
import { PageTitle, PageSubTitle } from 'style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import Button from 'components/Button';
import TableCompUsagePlans from 'components/TableCompUsagePlans';
import ModalApiDelete from 'components/ModalApiDelete';
import ModalApiUpdate from 'components/ModalApiUpdate';
import MainHeader from 'components/MainHeader';

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
  const [DataTemp, setDataTemp] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const testData = [
    {
        "usagePlan_id": "62c98e09d7176c1f4f28f464",
        "mem_sq": "Memsq07",
        "usagePlan_name": "usagePlan_01",
        "usagePlan_description": "usagePlan_01",
        "rateRps" : 10, //초당 요청 처리량
        "dayQuotaRequest" : 1000, // 일 요청 처리 한도
        "monthQuotaRequest" : 30000, //월 요청 처리 한도
        "created_at": "2022-07-09T23:17:45.777",
    },
    {
        "usagePlan_id": "62c98e09d7176c1f4f28f463",
        "mem_sq": "Memsq07",
        "usagePlan_name" : "usagePlan_02",
        "usagePlan_description" : "usagePlan_02",
        "rateRps" : 1, //초당 요청 처리량
        "dayQuotaRequest" : 500, // 일 요청 처리 한도
        "monthQuotaRequest" : 15000, //월 요청 처리 한도
        "created_at": "2022-07-09T23:17:45.777",
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
        '/v1.0/g1/paas/Memsq07/apigw/usage-plans'
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
          '/v1.0/g1/paas/Memsq07/apigw/usage-plans/'+clickData.usage_plan_id
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
  }, [DataTemp]);

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
            <span style={{padding: "0px 10px 0px 0px"}}><Button size="small" line="outline" onClick={Update}>변경</Button></span>
            <span style={{padding: "0px 10px 0px 0px"}}><Button size="small" line="outline" onClick={Delete}>삭제</Button></span>
            <Button size="small" line="outline" onClick={StageConncet}>연결된 Stage</Button>
          </ThemeProvider>
        </ButtonDiv>
        <TableDiv>
          <TableCompUsagePlans columns={TableHeader} data={DataTemp} clickData={clickData} setClickData={setClickData}/>
        </TableDiv>
      </MainContainer>
       <ModalApiDelete
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제하기"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            checkedItem={clickData.id}
            visible={deleteDialog}
            >
            <span style={{fontWeight:"bold"}}>{clickData.name}</span><span style={{padding:"0px 0px 0px 10px"}}>Usage Plan을 삭제합니다.</span>
      </ModalApiDelete>
    </React.Fragment>
  );
}
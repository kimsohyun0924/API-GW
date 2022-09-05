import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContainer from 'layouts/MainContainer';
import { PageTitle, PageSubTitle } from 'style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import Button from 'components/Button';
import TableCompAPIKeyUsagePlan from 'components/TableCompAPIKeyUsagePlan';
import ModalApiDelete from 'components/ModalApiDelete';
import ModalAPIKeyUsageConnect from 'components/ModalAPIKeyUsageConnect';
import MainHeader from 'components/MainHeader';
import { useLocation } from "react-router";


const HeadDiv = styled.div`
`;

const MenuDiv = styled.div`
/* flex 아이템들을 왼쪽에서 오른쪽으로 정렬 */
  display: flex;
  padding: 30px 0px 20px 0px;
`;

const TableDiv = styled.div`
`;

const TableHeader = [
 "Usage Plan 이름",
 "Usage Plan ID"
];

export default function APIKeyUsagePlans() {

  const { state } = useLocation();
  const initialState = {
    "usage_plan_id": null,
    "name": null,
    "description": null,
    "replenish_rate": null,
    "burst_capacity": null,
    "requested_tokens": null
  }
  const [clickData, setClickData] = useState(initialState);
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [DataTemp, setDataTemp] = useState([]);
  const [DataTemp2, setDataTemp2] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const testData = [
    {
      "name": "api_test1",
      "api_key_id": "stage_test1",
    },
    {
      "name": "api_test2",
      "api_key_id": "stage_test2",
    },
  ]

  const Create = () => {
    setCreateDialog(true);
  };

  const Delete = () => {
    setDeleteDialog(true);
  };

  const onCancel = () => {
    console.log('취소');
    setCreateDialog(false);
    setDeleteDialog(false);
  };


  const fetchAPIKeyUsagePlan = async () => {
    //get api request
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/api-keys/'+state.api_key_id,
      );
      setDataTemp(response.data.usage_plan_list); // 데이터는 response.data)
    } catch (e) {
      setError(e);
    }
  };

  const fetchUsagePlan = async () => {
    //get UsagePlan
    try {
      setError(null);
      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/usage-plans/'
      );
      setDataTemp2(response.data.filter((item) => !(DataTemp.some((i) => i.usage_plan_id === item.usage_plan_id))));
    } catch (e) {
      setError(e);
    }
  };

  const onDelete = () => {
    //delete api request
    const deleteAPIKeyUsagePlanConnect = async () => {
      try {
        setError(null);
        await axios.delete(
          '/v1.0/g1/paas/Memsq07/apigw/api-keys/'+state.api_key_id+'/'+clickData.usage_plan_id
        );
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    deleteAPIKeyUsagePlanConnect();
    // window.location.reload(true);
    setDeleteDialog(false);
  };

  useEffect(() => {
    fetchAPIKeyUsagePlan();
    fetchUsagePlan();
  }, [DataTemp]);

  return (
    <React.Fragment>
      <MainContainer>
        <HeadDiv>
          <MainHeader location={"API Keys"}/>
          <PageTitle>연결된 Usage Plan 목록</PageTitle>
          <PageSubTitle>{state.name}</PageSubTitle>
        </HeadDiv>
    
        <MenuDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <span style={{padding: "0px 15px 0px 0px"}}><Button size="small" line="line" onClick={Create}>Usage Plan 연결</Button></span>
            <Button size="small" line="outline" onClick={Delete}>삭제</Button>
          </ThemeProvider>
        </MenuDiv>
        <TableDiv>
          <TableCompAPIKeyUsagePlan columns={TableHeader} data={DataTemp} clickData={clickData} setClickData={setClickData}/>
        </TableDiv>
      </MainContainer>
      <ModalAPIKeyUsageConnect
        title="Usage Plan과 연결합니다."
        confirmText="연결하기"
        cancelText="취소"
        state={state}
        onCancel={onCancel}
        setCreateDialog={setCreateDialog}
        UsageList={DataTemp2}
        visible={createDialog}>
      </ModalAPIKeyUsageConnect>
      <ModalApiDelete
        // title="정말로 삭제하시겠습니까?"
        confirmText="삭제하기"
        cancelText="취소"
        onConfirm={onDelete}
        onCancel={onCancel}
        visible={deleteDialog}>
        <span style={{fontWeight:"bold"}}>{clickData.name}</span>  <span style={{padding:"0px 0px 0px 15px"}}>Usgae Plan과 연결을 해제합니다.</span>
      </ModalApiDelete>
    </React.Fragment>
  );
}



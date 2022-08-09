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


const MenuDiv = styled.div`
/* flex 아이템들을 왼쪽에서 오른쪽으로 정렬 */
  display: flex;
  padding: 30px 60px 20px 60px;
`;

const TableDiv = styled.div`
  
`;

const TableHeader = [
  "Usage Plan 이름",
  "설명",
  "ID",
  "요청 처리량",
  "일 요청 처리 한도",
  "월 요청 처리 한도",
  "생성일시"
];

export default function UsagePlans() {

  const [bChecked, setChecked] = useState(false);
  const [clickId, setClickId] = useState(false);

  // const [checkedItem, setCheckedItem] = useState([]); //개별 체크된 아이템을 저장함
  // const [checkedItemsName, setCheckedItemsName] = useState([]); //개별 체크된 아이템을 저장함
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
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
    if(bChecked === true) {
      navigate('/usageplans/edit');
    }
  };

  const Delete = () => {
    if(bChecked === true) {
      setDeleteDialog(true);
    }
  };

  const Stage = () => {
    if(bChecked === true) {
      navigate('/usageplans/stage');
    }
  };

  const onCancel = () => {
    console.log('취소');
    setUpdateDialog(false);
    setDeleteDialog(false);
  };

 
  // const checkHandler = () => {
  //   setChecked(!bChecked);
  //   // const apiid = e.target.getAttribute('apiid');
  //   // const apiname = e.target.getAttribute('apiname');

  //   // if (e.target.checked) {
  //   //     checkedItems.push(apiid);
  //   //     checkedItemsName.push(apiname)
  //   //     setCheckedItems(checkedItems);
  //   //     setCheckedItemsName(checkedItemsName);
  //   // } else if (!e.target.checked) {
  //   //     setCheckedItems(checkedItems.filter(checkedItem => checkedItem !== apiid));
  //   //     setCheckedItemsName(checkedItemsName.filter(checkedItemName => checkedItemName !== apiname));
  //   // }
  // };

  const fetchUsagePlans = async () => {
    //get api request
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/service/memsq'
      );
      setDataTemp(response.data); // 데이터는 response.data)
      // console.log(response.data);
    } catch (e) {
      setError(e);
    }
  };

  const onDelete = () => {
   //delete api request
    const deleteUsagePlan = async () => {
      try {
        setError(null);
        await axios.delete(
          '/v1.0/g1/paas/Memsq07/apigw/service/'+clickId
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
        <PageTitle>Usage Plans</PageTitle>
        <PageSubTitle>API의 사용량을 계획합니다.</PageSubTitle>
        <MenuDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <Button size="large" action={Create}>Usage Plan 생성</Button>
            <Button size="small" outline onClick={Update}>변경</Button>
            <Button size="small" outline onClick={Delete}>삭제</Button>
            <Button size="small" outline onClick={Stage}>연결된 Stage</Button>
          </ThemeProvider>
        </MenuDiv>
        <TableDiv>
          <TableCompUsagePlans columns={TableHeader} data={testData} clickId={clickId} setClickId={setClickId} bChecked={bChecked} setChecked={setChecked}/>
        </TableDiv>
      </MainContainer>
      <ModalApiDelete
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            visible={deleteDialog}
            >
            정말로 삭제하시겠습니까?
      </ModalApiDelete>
      {/* <ModalApiUpdate
            title="API 변경"
            confirmText="변경하기"
            cancelText="취소"
            setUpdateDialog={setUpdateDialog}
            onCancel={onCancel}
            checkedItems={checkedItems}
            visible={updateDialog}>
      </ModalApiUpdate> */}
    </React.Fragment>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContainer from '../layouts/MainContainer';
import { PageTitle, PageSubTitle } from '../style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import Button from '../components/Button';
import ModalApiDelete from '../components/ModalApiDelete';
import ModalApiUpdate from '../components/ModalApiUpdate';
import ModalAPIKeysCreate from '../components/ModalAPIKeysCreate';
import ModalAPIKeysUpdate from '../components/ModalAPIKeysUpdate';
import TableCompAPIKeys from '../components/TableCompAPIKeys';


const MenuDiv = styled.div`
/* flex 아이템들을 왼쪽에서 오른쪽으로 정렬 */
  display: flex;
  padding: 30px 60px 20px 60px;
`;

const TableDiv = styled.div`
  
`;

const TableHeader = [
  "API Key 이름",
  "API Key 설명",
  "ID",
  "상태",
  "API Keys",
  "생성일시"
];

export default function APIKeys() {

  const [bChecked, setChecked] = useState(false);
  const [clickId, setClickId] = useState(false);

  // const [checkedItem, setCheckedItem] = useState([]); //개별 체크된 아이템을 저장함
  // const [checkedItemsName, setCheckedItemsName] = useState([]); //개별 체크된 아이템을 저장함
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [DataTemp, setDataTemp] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const testData = [
    {
        "apiKey_id" : "apiKeyId_01",
        "mem_sq": "Memsq07",
        "apiKey_name" : "apiKey_01",
        "apiKey_description" : "apiKey_01", 
        "primaryKey" : "IG8BNS1fMLcDMUPQ015Nl8fRPgta06QmPRvXejAq",
        "isEnabled" : true,
        "created_at" : "2022-07-20T04:56:07.000"
    },
    {
        "apiKey_id" : "apiKeyId_02",
        "mem_sq": "Memsq07",
        "apiKey_name" : "apiKey_02",
        "apiKey_description" : "apiKey_02", 
        "primaryKey" : "pdeSirg4VFJUAacg2uUbSz3IfrN1gPpyjamHhLW6",
        "isEnabled" : false,
        "created_at" : "2022-07-20T04:56:07.000"
    }
]

  
  const Create = () => {
    // navigate('/usageplans/create');
    setCreateDialog(true);
  };

  const Update = () => {

    if(bChecked === true) {
      setUpdateDialog(true);
    }
  };

  const Delete = () => {
    if(bChecked === true) {
      setDeleteDialog(true);
    }
  };

  const Stage = () => {
    if(bChecked === true) {
      navigate('/apikeys/stage');
    }
  };

  const onCancel = () => {
    console.log('취소');
    setCreateDialog(false);
    setUpdateDialog(false);
    setDeleteDialog(false);
  };

 
  const checkHandler = () => {
    setChecked(!bChecked);

    // const checkboxes = document.getElementsByName('test');
    // setCheckedItem(checkThis.id);

    // for (let i = 0; i < checkboxes.length; i++) { 
    //   if (checkboxes[i] !== checkThis) {
    //     checkboxes[i].checked = false
    //   }
    // }
  };

  const fetchAPIKey = async () => {
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
    const deleteAPIKey = async () => {
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
    deleteAPIKey();
    // window.location.reload(true);
    setDeleteDialog(false);
  };


  useEffect(() => {
    fetchAPIKey();
  }, [DataTemp]);


  return (
    <React.Fragment>
      <MainContainer>
        <PageTitle>API Keys</PageTitle>
        <PageSubTitle>API Key를 관리합니다.</PageSubTitle>
        <MenuDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <Button size="large_medium" onClick={Create}>API Key 생성</Button>
            <Button size="small" outline onClick={Update}>변경</Button>
            <Button size="small" outline onClick={Delete}>삭제</Button>
            <Button size="large_medium" outline onClick={Stage}>연결된 Stage</Button>
          </ThemeProvider>
        </MenuDiv>
        <TableDiv>
          <TableCompAPIKeys columns={TableHeader} data={testData} checkHandler={checkHandler} clickId={clickId} setClickId={setClickId} bChecked={bChecked} setChecked={setChecked}/>
        </TableDiv>
      </MainContainer>
      <ModalAPIKeysCreate
            title="API Key를 생성합니다."
            confirmText="생성하기"
            cancelText="취소"
            // onConfirm={onDelete}
            onCancel={onCancel}
            visible={createDialog}
            >
      </ModalAPIKeysCreate>
      <ModalAPIKeysUpdate
            title="API Key를 변경합니다."
            confirmText="변경하기"
            cancelText="취소"
            // onConfirm={setUpdateDialog}
            onCancel={onCancel}
            checkedItem={clickId}
            visible={updateDialog}>
      </ModalAPIKeysUpdate>
      <ModalApiDelete
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제하기"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            visible={deleteDialog}
            >
            API Key를 삭제합니다.
      </ModalApiDelete>
    </React.Fragment>
  );
}
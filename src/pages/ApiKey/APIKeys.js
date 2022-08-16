import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContainer from 'layouts/MainContainer';
import { PageTitle, PageSubTitle } from 'style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import Button from 'components/Button';
import ModalApiDelete from 'components/ModalApiDelete';
import ModalAPIKeysCreate from 'components/ModalAPIKeysCreate';
import ModalAPIKeysUpdate from 'components/ModalAPIKeysUpdate';
import TableCompAPIKeys from 'components/TableCompAPIKeys';
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
  "API Key 이름",
  "API Key 설명",
  "ID",
  "상태",
  "API Keys",
  "생성일시"
];

export default function APIKeys() {

  const [bChecked, setChecked] = useState(false);
  const initialState = {
    "name": null,
    "description": null,
    "id": null,
    "enabled": null,
    "api_key": null,
    "created_at": null
  }
  const [clickData, setClickData] = useState(initialState);

  // const [checkedItem, setCheckedItem] = useState([]); //개별 체크된 아이템을 저장함
  // const [checkedItemsName, setCheckedItemsName] = useState([]); //개별 체크된 아이템을 저장함
  const [createDialog, setCreateDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
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
    
    setCreateDialog(true);
  };

  const Update = () => {
    setUpdateDialog(true);
  
  };

  const Delete = () => {
   
    setDeleteDialog(true);
    
  };

  const Stage = () => {

    navigate('/apikey/usageplans');
  
  };

  const onCancel = () => {
    console.log('취소');
    setCreateDialog(false);
    setUpdateDialog(false);
    setDeleteDialog(false);
  };

  const fetchAPIKeys = async () => {
    //get api key request
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/api-keys/'
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
          '/v1.0/g1/paas/Memsq07/apigw/api-keys/'+clickData.id
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
    fetchAPIKeys();
  }, []);


  return (
    <React.Fragment>
      <MainContainer>
        <HeadDiv>
          <MainHeader location={"API Keys"}/>
          <PageTitle>API Keys</PageTitle>
          <PageSubTitle>API Key를 관리합니다.</PageSubTitle>
        </HeadDiv>
        <ButtonDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <span style={{padding: "0px 20px 0px 0px"}}><Button size="small" line="line" onClick={Create}>API Key 생성</Button></span>
            <span style={{padding: "0px 10px 0px 0px"}}><Button size="small" line="outline" onClick={Update}>변경</Button></span>
            <span style={{padding: "0px 10px 0px 0px"}}><Button size="small" line="outline" onClick={Delete}>삭제</Button></span>
            <Button size="small" line="outline" onClick={Stage}>연결된 Usage Plan</Button>
          </ThemeProvider>
        </ButtonDiv>
        <TableDiv>
          <TableCompAPIKeys columns={TableHeader} data={DataTemp} clickData={clickData} setClickData={setClickData}/>
        </TableDiv>
      </MainContainer>
      <ModalAPIKeysCreate
            title="API Key를 생성합니다."
            confirmText="생성하기"
            cancelText="취소"
            setCreateDialog={setCreateDialog}
            onCancel={onCancel}
            visible={createDialog}
            >
      </ModalAPIKeysCreate>
      <ModalAPIKeysUpdate
            title="API Key를 변경합니다."
            confirmText="변경하기"
            cancelText="취소"
            setUpdateDialog={setUpdateDialog}
            onCancel={onCancel}
            checkedItem={clickData}
            visible={updateDialog}>
      </ModalAPIKeysUpdate>
      <ModalApiDelete
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제하기"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            checkedItem={clickData.id}
            visible={deleteDialog}
            >
            API Key를 삭제합니다.
      </ModalApiDelete>
    </React.Fragment>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContainer from '../layouts/MainContainer';
import { PageTitle, PageSubTitle } from '../style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import Button from '../components/Button';
import TableCompUsagePlans from '../components/TableCompUsagePlans';
import ModalApiDelete from '../components/ModalApiDelete';
import ModalApiUpdate from '../components/ModalApiUpdate';


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
  const [checkedItems, setCheckedItems] = useState([]); //개별 체크된 아이템을 저장함
  const [checkedItemsName, setCheckedItemsName] = useState([]); //개별 체크된 아이템을 저장함
  const [deleteDialog, setDeleteDialog] = useState(false);
  // const [updateDialog, setUpdateDialog] = useState(false);
  const [DataTemp, setDataTemp] = useState([]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  const testData = [
    {
        "apiKey_id" : "apiKeyId",
        "mem_sq": "Memsq07",
        "apiKey_name" : "apiKey_01",
        "apiKey_description" : "apiKey_01", 
        "primaryKey" : "IG8BNS1fMLcDMUPQ015Nl8fRPgta06QmPRvXejAq",
        "secondaryKey" : "QSsbo0BPBRIx7KP4hB3jVCEom7B8AS624mPuIqRY",
        "isEnabled" : true,
        "created_at" : "2022-07-20T04:56:07.000"
    },
    {
        "apiKey_id" : "apiKeyId",
        "mem_sq": "Memsq07",
        "apiKey_name" : "apiKey_02",
        "apiKey_description" : "apiKey_02", 
        "primaryKey" : "pdeSirg4VFJUAacg2uUbSz3IfrN1gPpyjamHhLW6",
        "secondaryKey" : "9RxeeetzPh11UIFTCwjFWnlwpRwpiQGfdUuv1VDT",
        "isEnabled" : true,
        "created_at" : "2022-07-20T04:56:07.000"
    }
]

  
  const Create = () => {
    navigate('/usageplans/create');
  };

  const Update = () => {
    if(!(checkedItems.length === 0)) {
      navigate('/usageplans/edit');
    }
  };

  const Delete = () => {
    if(!(checkedItems.length === 0)) {
      setDeleteDialog(true);
    }
  };

  const Stage = () => {
    if(!(checkedItems.length === 0)) {
      navigate('/usageplans/stage');
    }
  };

  const onCancel = () => {
    console.log('취소');
    setDeleteDialog(false);
    // setUpdateDialog(false);
  };

 
  const checkHandler = (e) => {
    setChecked(!bChecked);
    const apiid = e.target.getAttribute('apiid');
    const apiname = e.target.getAttribute('apiname');

    if (e.target.checked) {
        checkedItems.push(apiid);
        checkedItemsName.push(apiname)
        setCheckedItems(checkedItems);
        setCheckedItemsName(checkedItemsName);
    } else if (!e.target.checked) {
        setCheckedItems(checkedItems.filter(checkedItem => checkedItem !== apiid));
        setCheckedItemsName(checkedItemsName.filter(checkedItemName => checkedItemName !== apiname));
    }
  };

  const fetchApis = async () => {
    //get api request
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/service/memsq'
      );
      setDataTemp(response.data); // 데이터는 response.data)
      setValue(response.data.length);
      // console.log(response.data);
    } catch (e) {
      setError(e);
    }
  };

  const onDelete = () => {
   //delete api request
    const deleteApi = async () => {
      try {
        setError(null);
        await axios.delete(
          '/v1.0/g1/paas/Memsq07/apigw/service/'+checkedItems
        );
        setValue(value-1);
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    deleteApi();
    window.location.reload(true);
    setDeleteDialog(false);
  };


  useEffect(() => {
    fetchApis();
  }, []);


  return (
    <React.Fragment>
      <MainContainer>
        <PageTitle>API Keys</PageTitle>
        <PageSubTitle>API Key를 관리합니다.</PageSubTitle>
        <MenuDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <Button size="large" action={Create}>Usage Plan 생성</Button>
            <Button size="small" outline onClick={Update}>수정</Button>
            <Button size="small" outline onClick={Delete}>삭제</Button>
            <Button size="small" outline onClick={Stage}>Stage</Button>
          </ThemeProvider>
        </MenuDiv>
        <TableDiv>
          <TableCompUsagePlans columns={TableHeader} data={testData} checkHandler={checkHandler}/>
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
            {checkedItemsName}  정말로 삭제하시겠습니까?
      </ModalApiDelete>
      {/* <ModalApiUpdate
            title="API 수정"
            confirmText="수정"
            cancelText="취소"
            setUpdateDialog={setUpdateDialog}
            onCancel={onCancel}
            checkedItems={checkedItems}
            visible={updateDialog}>
      </ModalApiUpdate> */}
    </React.Fragment>
  );
}
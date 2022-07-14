import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContainer from '../layouts/MainContainer';
import { PageTitle, PageSubTitle } from '../style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import Button from '../components/Button';
import TableComp from '../components/TableComp';
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
  const [checkedItems, setCheckedItems] = useState([]); //개별 체크된 아이템을 저장함
  const [checkedItemsName, setCheckedItemsName] = useState([]); //개별 체크된 아이템을 저장함
  const [dialog, setDialog] = useState(false);
  const [updatedialog, setUpdateDialog] = useState(false);
  const [DataTemp, setDataTemp] = useState([]);
  const testData = [
    {
        "service_id": "62c98e09d7176c1f4f28f463",
        "mem_sq": "Memsq07",
        "name": "Sso",
        "description": "Sso",
        "root_resource_id": "62c98e09d7176c1f4f28f462",
        "created_at": "2022-07-09T23:17:45.777",
        "updated_at": "2022-07-09T23:17:45.777"
    }
]

  const [error, setError] = useState(null);
  const [value, setValue] = useState(null);
  const navigate = useNavigate();


  // const ApiOperation = (e) => {
  //   const evalue = e.target.getAttribute('value');
  //   console.log(e);
  //   // getElementById( 'xyz' ).getAttribute( 'title' );
  //   navigate('/api/operation', { state: e.target.value });
  // };

  // console.log(checkedItems);

  const Create = () => {
    navigate('/usageplans/create');
  };

  const Delete = () => {
    if(!(checkedItems.length === 0)) {
      setDialog(true);
    }
  };

  const Update = () => {
    if(!(checkedItems.length === 0)) {
      setUpdateDialog(true);
    }
  };

  const onCancel = () => {
    console.log('취소');
    setDialog(false);
    setUpdateDialog(false);
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
    setDialog(false);
  };


  useEffect(() => {
    fetchApis();
  }, []);


  return (
    <React.Fragment>
      <MainContainer>
        <PageTitle>Usage Plans</PageTitle>
        <PageSubTitle>API의 사용량을 계획합니다.</PageSubTitle>
        <MenuDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <Button size="large" action={Create}>Usage Plan 생성</Button>
            <Button size="small" outline onClick={Update}>수정</Button>
            <Button size="small" outline onClick={Delete}>삭제</Button>
          </ThemeProvider>
        </MenuDiv>
        <TableDiv>
          <TableComp columns={TableHeader} data={testData} checkHandler={checkHandler}/>
        </TableDiv>
      </MainContainer>
      <ModalApiDelete
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            visible={dialog}
            >
            {checkedItemsName}  정말로 삭제하시겠습니까?
      </ModalApiDelete>
      <ModalApiUpdate
            title="API 수정"
            confirmText="수정"
            cancelText="취소"
            setUpdateDialog={setUpdateDialog}
            onCancel={onCancel}
            checkedItems={checkedItems}
            visible={updatedialog}>
      </ModalApiUpdate>
    </React.Fragment>
  );
}
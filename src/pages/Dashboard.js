import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContainer from '../layouts/MainContainer';
import { PageTitle, PageSubTitle } from '../style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import Button from '../components/Button';
import TableComp from '../components/TableComp';
import ModalPopup from '../components/ModalApiDelete';
import ModalApiUpdate from '../components/ModalApiUpdate';
import { RepeatOn } from '@mui/icons-material';


const MenuDiv = styled.div`
/* flex 아이템들을 왼쪽에서 오른쪽으로 정렬 */
  display: flex;
  padding: 30px 60px 20px 60px;
`;

const TableDiv = styled.div`
  
`;

const TableHeader = [
  "API 이름",
  "API 설명",
  "API ID",
  "생성일시"
];

export default function Dashboard() {

  const [bChecked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]); //개별 체크된 아이템을 저장함
  const [checkedItemsName, setCheckedItemsName] = useState([]); //개별 체크된 아이템을 저장함
  const [dialog, setDialog] = useState(false);
  const [updatedialog, setUpdateDialog] = useState(false);
  const [DataTemp, setDataTemp] = useState([]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  

  const ApiCreate = () => {
    navigate('/api/create');
  };

  // const ApiOperation = (e) => {
  //   const evalue = e.target.getAttribute('value');
  //   console.log(e);
  //   // getElementById( 'xyz' ).getAttribute( 'title' );
  //   navigate('/api/operation', { state: e.target.value });
  // };

  // console.log(checkedItems);

  const onClick = () => {
    if(!(checkedItems.length === 0)) {
      setDialog(true);
    }
  };

  const update = () => {
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
        <PageTitle>My APIs</PageTitle>
        <PageSubTitle>API Gateway를 관리합니다.</PageSubTitle>
        <MenuDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <Button size="medium" action={ApiCreate}>API 생성</Button>
            <Button size="small" outline onClick={update}>수정</Button>
            <Button size="small" outline onClick={onClick}>삭제</Button>
          </ThemeProvider>
        </MenuDiv>
        <TableDiv>
          <TableComp columns={TableHeader} data={DataTemp} checkHandler={checkHandler} checkedItems={checkedItems}/>
        </TableDiv>
      </MainContainer>
      <ModalPopup
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            visible={dialog}
            >
            {checkedItemsName}  정말로 삭제하시겠습니까?
         </ModalPopup>
         <ModalApiUpdate
            title="API 수정"
            confirmText="수정"
            cancelText="취소"
            setUpdateDialog={setUpdateDialog}
            onCancel={onCancel}
            checkedItems={checkedItems}
            visible={updatedialog}></ModalApiUpdate>
    </React.Fragment>
  );
}
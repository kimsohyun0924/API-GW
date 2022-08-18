import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContainer from 'layouts/MainContainer';
import { PageTitle, PageSubTitle } from 'style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import Button from 'components/Button';
import TableComp from 'components/TableComp';
import ModalApiDelete from 'components/ModalApiDelete';
import ModalApiUpdate from 'components/ModalApiUpdate';
import MainHeader from 'components/MainHeader';

const HeadDiv = styled.div`
`;

const ButtonDiv = styled.div`
/* flex 아이템들을 왼쪽에서 오른쪽으로 정렬 */
  /* display: flex; */
  position: relative;
  padding: 30px 0px 20px 0px;
`;

const TableDiv = styled.div`
`;

const TableHeader = [
  "API 이름",
  "API 설명",
  "API ID",
  "생성일시"
];

export default function MyApis() {

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
    },
    {
      "service_id": "62c98e09d7176c1f4f28f463",
      "mem_sq": "Memsq07",
      "name": "test",
      "description": "test",
      "root_resource_id": "62c98e09d7176c1f4f28f462",
      "created_at": "2022-07-09T23:17:45.777",
      "updated_at": "2022-07-09T23:17:45.777"
  }
]

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  console.log(DataTemp);

  // const ApiOperation = (e) => {
  //   const evalue = e.target.getAttribute('value');
  //   console.log(e);
  //   // getElementById( 'xyz' ).getAttribute( 'title' );
  //   navigate('/api/operation', { state: e.target.value });
  // };

  // console.log(checkedItems);

  const Create = () => {
    navigate('/api/create');
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
        <HeadDiv>
          <MainHeader location={"APIs"}/>
          <PageTitle>My APIs</PageTitle>
          <PageSubTitle>API Gateway를 관리합니다.</PageSubTitle>
        </HeadDiv>

        <ButtonDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49'}}}>
            <span style={{padding:"0px 20px 0px 0px"}}><Button size="small" line="line" onClick={Create}>API 생성</Button></span>
            <span  style={{padding:"0px 10px 0px 0px"}}><Button size="small" line="outline" onClick={Update}>변경</Button></span>
            <Button size="small" line="outline" onClick={Delete}>삭제</Button>
          </ThemeProvider>
        </ButtonDiv>
        <TableDiv>
          <TableComp columns={TableHeader} data={DataTemp} checkHandler={checkHandler}/>
        </TableDiv>
      </MainContainer>
      <ModalApiDelete
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제하기"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            visible={dialog}
            >
            <span style={{fontWeight:"bold"}}>{checkedItemsName}</span><span style={{padding:"0px 0px 0px 10px"}}>API를 삭제합니다.</span>
      </ModalApiDelete>
      <ModalApiUpdate
            title="API를 변경합니다."
            confirmText="변경하기"
            cancelText="취소"
            setUpdateDialog={setUpdateDialog}
            onCancel={onCancel}
            checkedItems={checkedItems}
            visible={updatedialog}>
      </ModalApiUpdate>
    </React.Fragment>
  );
}
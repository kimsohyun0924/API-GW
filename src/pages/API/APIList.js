import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { PageTitle, PageSubTitle } from 'style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import MainContainer from 'layouts/MainContainer';

import Button from 'components/Button';
import MainHeader from 'components/MainHeader';
import TableComp from 'components/TableComp';
import ModalAPIUpdate from 'components/ModalAPIUpdate';
import ModalAPIDelete from 'components/ModalAPIDelete';

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

  const initialState = {
    "service_id": null,
    "mem_sq": null,
    "name": null,
    "description": null,
    "root_resource_id": null,
    "created_at": null,
    "updated_at": null,
  }
  const [DataTemp, setDataTemp] = useState([]);
  const [clickData, setClickData] = useState(initialState);
  const [deletedialog, setDeleteDialog] = useState(false);
  const [updatedialog, setUpdateDialog] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
  
  // console.log(DataTemp);

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

  const Update = () => {
    setUpdateDialog(true);
  };

  const Delete = () => {  
    setDeleteDialog(true);
  };

  const onCancel = () => {
    console.log('취소');
    setDeleteDialog(false);
    setUpdateDialog(false);
  };

  const fetchApis = async () => {
    //get API List 
    try {
      setError(null);
      const response = await axios.get(
        '/v1.0/g1/paas/apigw/service/user',
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
   //delete API
    const deleteApi = async () => {
      try {
        setError(null);
        await axios.delete(
          '/v1.0/g1/paas/apigw/service/'+clickData.service_id,
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
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
        <HeadDiv>
          <MainHeader location={"APIs"}/>
          <PageTitle>APIs</PageTitle>
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
          <TableComp columns={TableHeader} data={DataTemp} clickData={clickData} setClickData={setClickData}/>
        </TableDiv>
      </MainContainer>
      <ModalAPIUpdate
            title="API를 변경합니다."
            confirmText="변경하기"
            cancelText="취소"
            onCancel={onCancel}
            clickData={clickData}
            setClickData={setClickData}
            setUpdateDialog={setUpdateDialog}
            visible={updatedialog}>
      </ModalAPIUpdate>
      <ModalAPIDelete
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제하기"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            visible={deletedialog}
            >
            <span style={{fontWeight:"bold"}}>{clickData.name}</span><span style={{padding:"0px 0px 0px 10px"}}>API를 삭제합니다.</span>
      </ModalAPIDelete>
    </React.Fragment>
  );
}
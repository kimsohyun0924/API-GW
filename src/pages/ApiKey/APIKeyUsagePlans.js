import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContainer from 'layouts/MainContainer';
import { PageTitle, PageSubTitle } from 'style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import Button from 'components/Button';
import TableCompAPIKeyUsagePlan from 'components/TableCompAPIKeyUsagePlan';
import ModalApiDelete from 'components/ModalApiDelete';
import ModalStageConnect from 'components/ModalStageConnect';
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
 "API Key 이름",
 "API Key ID"
];

export default function APIKeyUsagePlans() {

  const { state } = useLocation();
  const initialState = {
    "api_key_id": null,
    "api_key": null,
    "name": null,
    "description": null,
    "enabled": null,
    "usage_plan_list": null
  }
  const [clickData, setClickData] = useState(initialState);
  const [DataTemp, setDataTemp] = useState([]);
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

  console.log(DataTemp);

  useEffect(() => {
    fetchAPIKeyUsagePlan();
  }, []);

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
            <span style={{padding: "0px 15px 0px 0px"}}><Button size="medium" line="line">Stage 연결</Button></span>
            <Button size="small" line="outline">삭제</Button>
          </ThemeProvider>
        </MenuDiv>
        <TableDiv>
          <TableCompAPIKeyUsagePlan columns={TableHeader} data={DataTemp} clickData={clickData} setClickData={setClickData}/>
        </TableDiv>
      </MainContainer>
      {/* <ModalStageConnect
            title="Stage 연결"
            confirmText="연결"
            cancelText="취소"
            setUpdateDialog={setUpdateDialog}
            onCancel={onCancel}
            visible={updatedialog}>
      </ModalStageConnect>
      <ModalApiDelete
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            visible={dialog}
            >
            정말로 삭제하시겠습니까?
      </ModalApiDelete> */}
    </React.Fragment>
  );
}



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContainer from '../layouts/MainContainer';
import { PageTitle, PageSubTitle } from '../style/PageStyle';
import styled, { ThemeProvider } from "styled-components";
import Button from '../components/Button';
import TableCompUsageStage from '../components/TableCompUsageStage';
import ModalApiDelete from '../components/ModalApiDelete';
import ModalApiUpdate from '../components/ModalApiUpdate';
import ModalStageConnect from '../components/ModalStageConnect';

const MenuDiv = styled.div`
/* flex 아이템들을 왼쪽에서 오른쪽으로 정렬 */
  display: flex;
  padding: 30px 60px 20px 60px;
`;

const TableDiv = styled.div`
  
`;

const TableHeader = [
  "API 이름",
  "Stage 이름"
];

export default function UsagePlanStage() {
  
  const [bChecked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]); //개별 체크된 아이템을 저장함
  const [checkedItemsName, setCheckedItemsName] = useState([]); //개별 체크된 아이템을 저장함
  const [dialog, setDialog] = useState(false);
  const [updatedialog, setUpdateDialog] = useState(false);
  const [DataTemp, setDataTemp] = useState([]);
  const testData = [
    {
      "api_name": "api_test1",
      "stage_name": "stage_test1",
    },
    {
      "api_name": "api_test2",
      "stage_name": "stage_test2",
    },
]

  const [error, setError] = useState(null);
  const [value, setValue] = useState(null);
  const navigate = useNavigate();

  const Create = () => {
    // navigate('/usageplans/create');
    setUpdateDialog(true);
  };

  const Delete = () => {
    if(!(checkedItems.length === 0)) {
      setDialog(true);
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
        <PageTitle>Usage Plans - Stage 연결 목록</PageTitle>
        <PageSubTitle>Usage Plans에 연결된 Stage를 관리합니다</PageSubTitle>
        <MenuDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <Button size="medium" action={Create}>Stage 연결</Button>
            <Button size="small" outline onClick={Delete}>삭제</Button>
          </ThemeProvider>
        </MenuDiv>
        <TableDiv>
          <TableCompUsageStage columns={TableHeader} data={testData} checkHandler={checkHandler}/>
        </TableDiv>
      </MainContainer>
      <ModalStageConnect
            title="Stage 연결를 연결합니다."
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
            {checkedItemsName}  정말로 삭제하시겠습니까?
      </ModalApiDelete>
    </React.Fragment>
  );
}



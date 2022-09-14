import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";

import styled, { css, ThemeProvider } from 'styled-components';

import img2 from "image/Table_Copy.svg";
import TableLine from '../image/tableline.svg';

import Button from './Button';
import ModalAPIKey from '../components/ModalAPIKey';

const TableWrapper = styled.div`
  padding: 0px 0px 0px 0px;
  overflow-x:auto;
  font-size: 15px;
  color: #333333;
  /* height: calc(100vh - 362px); */
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  line-height: 0.8rem;
  border: 1px solid #ccc;
`;

const THead = styled.thead`

`;

const TH = styled.th`
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  padding: 10px 10px;
  border-right: 0 solid #ccc;
  border-left: 0 solid #ccc;
  font-weight: 400;
  font-size: 13px;
  text-align: left;

  &:not(:last-child) {
    background: url(${TableLine}) right 50% no-repeat;
  }
`;

const TBody = styled.tbody`
  border: 1px solid #ccc;
`;

const TR = styled.tr`
  border-bottom: 1px solid #ccc;

  ${props => props.clickId === props.Id &&
    css`
      background: #c7dff4;;
      /* font-weight: 500; */
    `
  }
`;

const TD = styled.td`
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  padding: 8px 10px;
  text-align: left;
`;

const CopyButtonDiv = styled.div`
  margin: 3px 0px 0px 10px;
  cursor: pointer;
`;

export default function TableCompAPIKeys({ columns, data, clickData, setClickData }) {

  const initialState = {
    "name": null,
    "description": null,
    "api_key_id": null,
    "enabled": null,
    "api_key": null,
    "created_at": null
  }

  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const [key, setKey] = useState(null);
 

  const onClick = e => {
    setKey(e.target.value);
    setDialog(true);
  }

  const onClick2 = (item) => {
    // setClickId(item.id);
    if(item.api_key_id === clickData.api_key_id) {
      // setChecked(true);
      setClickData(initialState);
    }
    else {
      setClickData({
        "name": item.name,
        "description": item.description,
        "api_key_id": item.api_key_id,
        "enabled": item.enabled,
        "api_key": item.api_key,
        "created_at": item.created_at
      });
    }
  }

  const onCancel = () => {
    setDialog(false);
  };

  const checkHandler = (e) => {
    // setChecked(!bChecked);
  };

  return (
    <React.Fragment>
      <TableWrapper>
        <Table>
          <THead>  
            <tr>
              <TH width='1%'/>
              { columns && columns.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <TH>{item}</TH>
                  </React.Fragment>
                );
              })}    
            </tr>            
          </THead>
          <TBody>
            { data && data.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <TR key={index} onClick={() => { onClick2(item) }} clickId={clickData.api_key_id} Id={item.api_key_id}>
                    <TD width='1%'>
                      <input type="checkbox" checked={clickData.api_key_id === item.api_key_id ? true : false} onChange={checkHandler}/>
                    </TD>
                    <TD width='8%'>{item.name}</TD>
                    <TD width='10%'>{item.description}</TD>
                    <TD width='10%'>{item.api_key_id}</TD>
                    <TD width='7%'>{item.enabled === true ? "활성":"비활성"}</TD>
                    <TD width='7%'>
                      <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                        <Button size="supersupersmall" line="small" onClick={onClick} value={item.api_key}>
                          {/* { dialog === true ? item.primaryKey : <div>보기</div>} */}
                          보기
                        </Button>
                      </ThemeProvider>
                    </TD>
                    <TD width='10%'>{item.created_at}</TD>
                  </TR> 
                </React.Fragment>
              );
            })}
          </TBody>
        </Table>
      </TableWrapper>
      <ModalAPIKey
            title="API Key 보기"
            cancelText="확인"
            onCancel={onCancel}
            visible={dialog}
            >
            <div style={{display: "flex", justifyContent: "center"}}>
              {key}
              <CopyToClipboard text={key} onCopy={()=>alert("API Key가 복사되었습니다")}>
                <CopyButtonDiv><img src={img2}/></CopyButtonDiv>
              </CopyToClipboard>
            </div>
      </ModalAPIKey>
    </React.Fragment>
  );
}
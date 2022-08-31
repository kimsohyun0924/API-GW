import React, { useState, useEffect} from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import TableLine from '../image/tableline.svg';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import ModalApiDelete from './ModalApiDelete';
import ModalAPIKey from './ModalAPIKey';
import { click } from '@testing-library/user-event/dist/click';

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

const Hov = styled.td`
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  padding: 8px 10px;
  text-align: left;

  /* &:hover {
    cursor: pointer;;
  } */
`;

export default function TableCompDeploymentHistory({ columns, data, clickData, setClickData }) {

  console.log(data.stage_snapshot_list);

  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const [key, setKey] = useState(null);
  const initialState = {
    // "name": null,
    // "description": null,
    "stage_snapshot_id": null,
    // "enabled": null,
    // "api_key": null,
    "created_at": null
  }

  const onClick = e => {
    setKey(e.target.value);
    setDialog(true);
  }

  const onClick2 = (item) => {
    // setClickId(item.id);
    if(item.stage_snapshot_id === clickData.stage_snapshot_id) {
      // setChecked(true);
      setClickData(initialState);
    }
    else {
      setClickData({
        // "name": item.name,
        // "description": item.description,
        "stage_snapshot_id": item.stage_snapshot_id,
        // "enabled": item.enabled,
        // "api_key": item.api_key,
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
              { columns.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <TH>{item}</TH>
                  </React.Fragment>
                );
              })}    
            </tr>            
          </THead>
          <TBody>
            { data.stage_snapshot_list && data.stage_snapshot_list.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <TR key={index} onClick={() => { onClick2(item) }} clickId={clickData.stage_snapshot_id} Id={item.stage_snapshot_id}>
                    <TD width='1%'>
                      <input type="checkbox" checked={clickData.stage_snapshot_id === item.stage_snapshot_id ? true : false} onChange={checkHandler}/>
                    </TD>
                    <TD width='20%'>{item.created_at}</TD>
                    {/* <TD width='10%'>{item.api_key_id}</TD>
                    <TD width='8%'>{item.name}</TD>
                    <TD width='10%'>{item.description}</TD>
                    <TD width='7%'>{item.enabled === true ? "활성":"비활성"}</TD> */}
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
            {key}
      </ModalAPIKey>
    </React.Fragment>
  );
}
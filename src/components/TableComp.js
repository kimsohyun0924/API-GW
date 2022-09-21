import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled, { css } from 'styled-components';

import TableLine from 'image/tableline.svg';

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

  &:hover {
    cursor: pointer;
  }
`;

export default function TableComp({ columns, data, clickData, setClickData }) {

  const initialState = {
    "service_id": null,
    "mem_sq": null,
    "name": null,
    "description": null,
    "root_resource_id": null,
    "created_at": null,
    "updated_at": null,
  }

  const navigate = useNavigate();

  const onClick = (item) => {
    navigate('/api/operation', {state: item});
  }

  const onClick2 = (item) => {
    // setClickId(item.id);
    if(item.service_id === clickData.service_id) {
      // setChecked(true);
      setClickData(initialState);
    }
    else {
      setClickData({
        "service_id": item.service_id,
        "mem_sq": item.mem_sq,
        "name": item.name,
        "description": item.description,
        "root_resource_id": item.root_resource_id,
        "created_at": item.created_at,
        "updated_at": item.updated_at,
      });
    }
  }

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
                  <TR key={index} onClick={() => { onClick2(item) }} clickId={clickData.service_id} Id={item.service_id}>
                    <TD width='1%'>
                      <input type="checkbox" checked={clickData.service_id === item.service_id ? true : false} onChange={checkHandler}/>
                    </TD>
                    <Hov onClick={() => onClick(item)} align='left' width='10%' >{item.name}</Hov>
                    <TD width='10%'>{item.description}</TD>
                    <TD width='20%'>{item.service_id}</TD>
                    <TD width='15%'>{item.created_at}</TD>
                  </TR> 
                </React.Fragment>
              );
            })}
          </TBody>
        </Table>
      </TableWrapper>
    </React.Fragment>
  );
}

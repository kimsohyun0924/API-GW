import React, { useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import TableLine from '../image/tableline.svg';
import { useNavigate } from 'react-router-dom';

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

export default function TableCompAPIKeyUsagePlan({ columns, data, clickData, setClickData, bChecked, setChecked }) {

  const navigate = useNavigate();

  const initialState = {
    "usage_plan_id": null,
    "name": null,
    "description": null,
    "replenish_rate": null,
    "burst_capacity": null,
    "requested_tokens": null
  }

  const onClick = (item) => {
    // setClickId(item.id);
    if(item.usage_plan_id === clickData.usage_plan_id) {
      // setChecked(true);
      setClickData(initialState);
    }
    else {
      setClickData({
        "usage_plan_id": item.usage_plan_id,
        "name": item.name,
        "description": item.description,
        "replenish_rate": item.replenish_rate,
        "burst_capacity": item.burst_capacity,
        "requested_tokens": item.requested_tokens,
      });
    }
  }

  const checkHandler = (e) => {
    // setChecked(e.tartget.checked);
    // console.log(e);
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
            { data && data.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <TR key={index} onClick={() => { onClick(item) }} clickId={clickData.usage_plan_id} Id={item.usage_plan_id}>
                    <TD width='1%'>
                      <input type="checkbox" checked={clickData.usage_plan_id === item.usage_plan_id ? true : false} onChange={checkHandler}/>
                    </TD>
                    <TD width='15%'>{item.name}</TD>
                    <TD width='15%'>{item.usage_plan_id}</TD>
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
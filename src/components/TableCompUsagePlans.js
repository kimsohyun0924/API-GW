import React, { useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import TableLine from '../image/tableline.svg';
import { useNavigate } from 'react-router-dom';

const TableWrapper = styled.div`
  padding: 0px 60px 0px 60px;
  overflow-x:auto;
  font-size: 15px;
  color: #333333;
  height: calc(100vh - 362px);
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  line-height: 0.8rem;
  border: 1px solid #ddd;
`;

const THead = styled.thead`

`;

const TH = styled.th`
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  padding: 10px 10px;
  border-right: 0 solid #b6b6c3;
  border-left: 0 solid #b6b6c3;
  font-weight: 400;
  font-size: 13px;
  text-align: left;

  &:not(:last-child) {
    background: url(${TableLine}) right 50% no-repeat;
  }
`;

const TBody = styled.tbody`
  border: 1px solid #ddd;
`;

const TR = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TD = styled.td`
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  padding: 8px 10px;
  text-align: left;

  ${props => props.sh === true &&
    css`
      background: #c7dff4;
    `
  }
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

export default function TableCompUsagePlans({ columns, data, checkHandler }) {

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableWrapper>
        <Table>
          <THead>  
            <tr>
              <TH width='1%'>
                <input type="checkbox"/>
              </TH>
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
                  <TR key={index}>
                  <TD width='1%'>
                      <input type="checkbox" onChange={checkHandler} apiid={item.usagePlan_id} apiname={item.usagePlan_name}/>
                    </TD>
                    <Hov align='left' width='10%' >{item.usagePlan_name}</Hov>
                    <TD width='10%'>{item.usagePlan_description}</TD>
                    <TD width='15%'>{item.usagePlan_id}</TD>
                    <TD width='10%'>{item.rateRps}</TD>
                    <TD width='10%'>{item.dayQuotaRequest}</TD>
                    <TD width='10%'>{item.monthQuotaRequest}</TD>
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

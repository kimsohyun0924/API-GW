import React, { useState } from 'react';
import axios from 'axios';

import styled, {css} from 'styled-components';

import SpinnerSmall from 'components/SpinnerSmall';

import trash from 'image/trash.svg';
import Circle_Gray from "image/Circle_Gray.svg";
import deployment from 'image/deployment.svg';
import Circle_Green from "image/Circle_Green.svg";
import Circle_Red from "image/Circle_Red.png";
import TableLine from '../image/tableline.svg';

import ModalAPIDelete from './ModalAPIDelete';

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
  line-height: 13px;
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
  
    &:hover {
    background: #c7dff4;
  }
`;

const TD = styled.td`
  line-height: 10px;
  text-align: center;
  vertical-align: middle;
  padding: 8px 10px;
  text-align: left;
  font-size: 13px;
`;

const ImgDiv = styled.div`
    /* display: flex;
    margin-left: 530px;
    justify-content: flex-end; */
    cursor: pointer;
`;


const ItemSpinner = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.1rem;

  ${props => props.align === 'center' &&
    css`
      justify-content: center;
    `
  }
`;

export default function TableCompDeploymentHistory({ columns, data, setStageConnect3 }) {

  // console.log(data.stage_id);

  const [snapshotId, setSnapshotId] = useState(null);
  const [deploydialog, setDeployDialog] = useState(false);
  const [deletedialog, setDeleteDialog] = useState(false);
  const [error, setError] = useState(null);

  const onClick2 = (e) => {
    setSnapshotId(e.target.getAttribute('value'));
    setDeployDialog(true);
  }

  const onClick3 = (e) => {
    setSnapshotId(e.target.getAttribute('value'));
    setDeleteDialog(true);
  }

  const onCreate = e => {

    console.log(data.stage_id);
    console.log(snapshotId);
    //Delete Stage Snapshot
    const deployStageSnapshot = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/apigw/stage-snapshot/deploy',
          {
            stage_id: data.stage_id,
            stage_snapshot_id: snapshotId
          },
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
      }
    };
    deployStageSnapshot();
    setDeployDialog(false);
    setStageConnect3(false);
  }

  const onDelete = e => {
    //Delete Stage Snapshot
    const deleteStageSnapshot = async () => {
      try {
        setError(null);
        await axios.delete(
          '/v1.0/g1/paas/apigw/stage-snapshot/'+snapshotId,
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    deleteStageSnapshot();
    setDeleteDialog(false);
    setStageConnect3(false);
  }

  const onCancel = () => {
    setDeployDialog(false);
    setDeleteDialog(false);
  };

  return (
    <React.Fragment>
      <TableWrapper>
        <Table>
          <THead>  
            <tr>
              {/* <TH width='1%'/> */}
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
                  <TR key={index}>
                    <TD style={{ lineHeight: '0.8rem' }} width='20%'>{item.created_at}</TD>
                    <TD style={{ lineHeight: '0.8rem' }} width='20%'>{item.description}</TD>
                    <TD width='20%'>
                      { item.status === "STAGE_DEPLOYED" ?  <div style={{display:"flex"}}><img style={{padding:"0px 0px 0px 5px"}} src={Circle_Green} alt="Circle_Green"/><div style={{padding: "0px 0px 0px 10px"}}>배포 완료</div></div>
                        : item.status === "STAGE_UNDEPLOYED" ? <div style={{display:"flex"}}><img style={{padding:"0px 0px 0px 5px"}} src={Circle_Gray} alt="Circle_Gray"/><div style={{padding: "0px 0px 0px 10px"}}>미배포</div></div>
                        : item.status === "STAGE_DEPLOYING" ?  <ItemSpinner><SpinnerSmall/> <div style={{padding: "0px 0px 0px 10px"}}>배포 중</div></ItemSpinner> 
                        : item.status === "STAGE_UNDEPLOYING" ?  <div style={{display:"flex"}}><img style={{padding:"0px 0px 0px 5px"}} src={Circle_Red} alt="Circle_Red"/><div style={{padding: "0px 0px 0px 10px"}}>배포 오류</div></div>
                        : null } </TD>
                    <TD width='10%'>
                      <ImgDiv onClick={onClick2}>
                        { item.status === "STAGE_DEPLOYED" || item.status === "STAGE_DEPLOYING" ?
                          null
                          : <img value={item.stage_snapshot_id} src={deployment} alt="deployment"/>
                        }
                      </ImgDiv>
                    </TD>
                    <TD width='10%'>
                      <ImgDiv onClick={onClick3}>
                      { item.status === "STAGE_DEPLOYED" ?
                          null
                          : <img value={item.stage_snapshot_id} src={trash} alt="trash"/>
                        }
                      </ImgDiv>
                    </TD>
                  </TR> 
                </React.Fragment>
              );
            })}
          </TBody>
        </Table>
      </TableWrapper>
      <ModalAPIDelete
            // title="Stage Snapshot 배포"
            confirmText="배포하기"
            cancelText="취소"
            onConfirm={onCreate}
            onCancel={onCancel}
            visible={deploydialog}>
            <span style={{padding:"0px 0px 0px 10px"}}>선택한 Stage를 배포합니다.</span>
      </ModalAPIDelete>
      <ModalAPIDelete
            // title="Stage Snapshot 삭제"
            confirmText="삭제하기"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            visible={deletedialog}>
            <span style={{padding:"0px 0px 0px 10px"}}>선택한 Stage를 삭제합니다.</span>
      </ModalAPIDelete>
    </React.Fragment>
  );
}
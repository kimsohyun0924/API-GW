import React, { useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import TableLine from '../image/tableline.svg';
import Logo from '../image/trash.svg';
import Logo2 from '../image/deployment.svg';

import ModalAPIDelete from './ModalAPIDelete';

import img1 from "image/Circle_Green.svg";
import img2 from "image/ico_state_stop.png";

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

export default function TableCompDeploymentHistory({ columns, data, clickData, setClickData, setStageConnect3 }) {

  // console.log(data.stage_id);

  const [error, setError] = useState(null);
  const [deploydialog, setDeployDialog] = useState(false);
  const [deletedialog, setDeleteDialog] = useState(false);
  const [snapshotId, setSnapshotId] = useState(null);
  const initialState = {
    // "name": null,
    // "description": null,
    "stage_snapshot_id": null,
    // "enabled": null,
    // "api_key": null,
    "updated_at": null
  }

  const onClick = (item) => {
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
        "updated_at": item.created_at
      });
    }
  }

  const onClick2 = e => {
    setSnapshotId(e.target.getAttribute('value'));
    setDeployDialog(true);
  }

  const onClick3 = e => {
    setSnapshotId(e.target.getAttribute('value'));
    setDeleteDialog(true);
  }

  const onCreate = e => {
    //Delete Stage Snapshot
    const deployStageSnapshot = async () => {
      try {
        setError(null);
        await axios.post(
          '/v1.0/g1/paas/Memsq07/apigw/stage-snapshot/deploy',
          {
            stage_id: data.stage_id,
            stage_snapshot_id: snapshotId
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
          '/v1.0/g1/paas/Memsq07/apigw/stage-snapshot/'+snapshotId,
        );
      } catch (e) {
        setError(e);
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
                    {/* <TD width='1%'>
                      <input type="checkbox" checked={clickData.stage_snapshot_id === item.stage_snapshot_id ? true : false} onChange={checkHandler}/>
                    </TD> */}
                    <TD style={{ lineHeight: '0.8rem' }} width='20%'>{item.updated_at}</TD>
                    <TD width='20%'>{item.status === "STAGE_DEPLOYED" ?  <img style={{padding:"0px 0px 0px 5px"}} src={img1}/> : <img style={{padding:"0px 0px 0px 5px"}} src={img2}/>}</TD>
                    <TD width='10%'>
                      <ImgDiv onClick={onClick2}>
                        { item.status === "STAGE_DEPLOYED" ?
                          null
                          : <img value={item.stage_snapshot_id} src={Logo2}/>
                        }
                      </ImgDiv>
                    </TD>
                    <TD width='10%'>
                      <ImgDiv onClick={onClick3}>
                      { item.status === "STAGE_DEPLOYED" ?
                          null
                          : <img value={item.stage_snapshot_id} src={Logo}/>
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
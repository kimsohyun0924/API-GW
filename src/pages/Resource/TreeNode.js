import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled, { css, ThemeProvider } from 'styled-components';

import Method from 'pages/Method/Method';
import MethodUpdate from 'pages/Method/MethodUpdate';

import ResourceCreate from './ResourceCreate';
import Button from 'components/Button';
import ModalAPIDelete from 'components/ModalAPIDelete';
import ModalRootResourceDelete from 'components/ModalRootResourceDelete';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { useTreeItem, treeItemClasses} from '@mui/lab/TreeItem';


const AllDiv = styled.div`
  width: 100%;
  height: 73vh; 
`;


const ButtonDiv = styled.div`
  display : flex;
  padding: 10px 0px 20px 0px;
`;

const ExampleDiv = styled.div`  
  width: 100%;
  height: 90%; 
  display: flex; 
`;

const MenuDiv = styled.div`
  min-width: 200px;
  min-height: 100%;

  padding: 15px 15px 0px 15px;
  border: 1px solid #e2e2e2;
`;

const ResourceInfoDiv = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
`;

const PathDiv = styled.div`
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e2e2e2;
    padding : 10px 10px 0px 15px;
    font-weight: 500 !important;
    font-family: 'Noto Sans KR', sans-serif !important;
    font-size: 15px !important;
`;

const Content = styled.div`
  width: 100%;
  padding: 15px 15px 0px 15px;
`;

const TestDiv = styled.div`
  height: 35px;
`;

const TestDiv2 = styled.div`
  display: flex;
  font-weight: 500 !important;
  font-family: 'Noto Sans KR', sans-serif !important;
  font-size: 15px !important;
  border-bottom: 1px solid #e2e2e2;
  align-items: center;

   ${props => props.label === 'GET' &&
      css`
      color: royalblue;
      `
    }
    ${props => props.label === 'POST' &&
      css`
      color: green;
      `
    }
    ${props => props.label === 'PUT' &&
      css`
      color: brown;
      `
    }
    ${props => props.label === 'DELETE' &&
      css`
      color: red;
      `
    }
    ${props => props.label === 'ANY' &&
      css`
      color: orange;
      `
    }
    ${props => props.label === 'PATCH' &&
      css`
      color: gray;
      `
    }
`;

const optionsinitial = [
  {
    "name": "ANY",
    "value": "ANY"
  },
  {
    "name": "DELETE",
    "value": "DELETE"
  },
  {
    "name": "GET",
    "value": "GET"
  },
  {
    "name": "HEAD",
    "value": "HEAD"
  },
  {
    "name": "OPTIONS",
    "value": "OPTIONS"
  },
  {
    "name": "PATCH",
    "value": "PATCH"
  },
  {
    "name": "POST",
    "value": "POST"
  },
  {
    "name": "PUT",
    "value": "PUT"
  }
];

export default function RecursiveTreeView(props) {
  // console.log(props);

  const serviceInfo = props.serviceInfo;
  const resourceInfo = props.data;
  const [content, setContent] = useState(null);
  const [resourceId, setResourceId] = useState(null);
  const [label, setLabel] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [faildialog, setFailDialog] = useState(false);
  const [error, setError] = useState(null);
  const [optionsCommand, setOptionsCommand] = useState(optionsinitial);
  const nodeId_array = [];
  const [length, setLength] = useState(null);

  const CustomContent = React.forwardRef(function CustomContent(props, ref) {
    const {
      classes,
      className,
      label,
      nodeId,
      doc_type,
      icon: iconProp,
      expansionIcon,
      displayIcon,
    } = props;
  
    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);
  
    const icon = iconProp || expansionIcon || displayIcon;
  
    const handleMouseDown = (event) => {
      preventSelection(event);
    };
  
    const handleExpansionClick = (event) => {
      handleExpansion(event);
      
    };
  
    const handleSelectionClick = (event) => {
      handleSelection(event);
      if(doc_type === "METHOD") {
        setContent('third');
      }
      else {
        setContent('second');
      }
      setLabel(label);
      setResourceId(nodeId);
    };
  
    return (
      <TestDiv
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref}
      >
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <TestDiv2
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
          label={label}
        >
          {label}
        </TestDiv2>
      </TestDiv>
    );
  });
  
  CustomContent.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
    /**
     * className applied to the root element.
     */
    className: PropTypes.string,
    /**
     * The icon to display next to the tree node's label. Either a parent or end icon.
     */
    displayIcon: PropTypes.node,
    /**
     * The icon to display next to the tree node's label. Either an expansion or collapse icon.
     */
    expansionIcon: PropTypes.node,
    /**
     * The icon to display next to the tree node's label.
     */
    icon: PropTypes.node,
    /**
     * The tree node label.
     */
    label: PropTypes.node,


    doc_type: PropTypes.node,
    /**
     * The id of the node.
     */
    nodeId: PropTypes.string.isRequired,
  };

  const CustomTreeItem = (props) => {
    return (
    <TreeItem ContentComponent={CustomContent} {...props} />
    );
  };


    // setNodeId_array({
    //   ...nodeId_array,
    //   resource_id

  const renderTree = (nodes) => {
    return(
    <CustomTreeItem key={nodes.resource_id || nodes.method_id} nodeId={nodes.resource_id || nodes.method_id} label={nodes.path || nodes.method_type} ContentProps={{doc_type : nodes.doc_type}}>
      {Array.isArray(nodes.method_list) ? nodes.method_list.map((node) => renderTree2(node)) : null}
      {Array.isArray(nodes.child_resource_list) ? nodes.child_resource_list.map((node) => renderTree(node)) : null}
    </CustomTreeItem>
    );
  };  

  const renderTree2 = (nodes) => {
    return(
    <CustomTreeItem key={nodes.method_id} nodeId={nodes.method_id} label={nodes.method_type} ContentProps={{doc_type : nodes.doc_type}}>
      {Array.isArray(nodes.method_list) ? nodes.method_list.map((node) => renderTree(node)) : null}
    </CustomTreeItem>
    );
  };

  const renderTree3 = (nodes) => {

    nodeId_array.push(nodes.resource_id);
    // console.log(nodeId_array); 
    return(
      <div key={nodes.resource_id+"3"}>
        { Array.isArray(nodes.child_resource_list) ? nodes.child_resource_list.map((node) => renderTree3(node)) : null }
      </div>
    );
  };

  const Create = () => {
    setContent('first');
  };

  const Delete = () => {
    if(label !== null) {
      if (label !== '/') {
        setDialog(true);
      }
      else {
        setFailDialog(true);
      }
    }
  };

  const onCancel = () => {
    console.log('취소');
    setDialog(false);
    setFailDialog(false);
  };

  const onDelete = () => {
    //delete resource request
     const deleteResource = async () => {
       try {
         setError(null);
         await axios.delete(
          '/v1.0/g1/paas/apigw/resource/'+resourceId,
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
         );
       } catch (e) {
         setError(e);
         console.log(error);
       }
     };
     deleteResource();
     window.location.reload(true);
     setDialog(false);
   };

  const selectComponent = {
    first: <ResourceCreate serviceInfo={serviceInfo} resourceId={resourceId} label={label}/>,
    second: <Method serviceId={serviceInfo.service_id} resourceId={resourceId} setResourceId={setResourceId} setLabel={setLabel} setContent={setContent} optionsCommand={optionsCommand} setOptionsCommand={setOptionsCommand}/>, //method list 나태내줌
    third: <MethodUpdate resourceId={resourceId} dropdownItems={optionsCommand}/>
  };

  useEffect(() => {
    // console.log(nodeId_array);
    setLength(nodeId_array.length)
  }, [nodeId_array]);

  return (
    <React.Fragment>
      <AllDiv>
        <ButtonDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <span style={{padding: "0px 15px 0px 0px"}}><Button size="small" line="line" onClick={Create}>리소스 생성</Button></span>
            <Button size="small" line="line" onClick={Delete}>리소스 삭제</Button>
          </ThemeProvider>
        </ButtonDiv>
        <ExampleDiv>
          <MenuDiv>
            { renderTree3(resourceInfo) }
            { props.data.resource_id && nodeId_array.length === length ?
            <TreeView
              aria-label="icon expansion"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={nodeId_array} //처음 화면이 렌더링 됐을 떄 펼쳐져있을 Tree
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 440, flexGrow: 1, maxWidth: 400, overflowY: 'auto', backgroud: "pink"}}
              >
                {renderTree(resourceInfo)}
            </TreeView>
            : null }
          </MenuDiv> 
          <ResourceInfoDiv>
            <PathDiv>{label}</PathDiv>
             {content && <Content>{selectComponent[content]}</Content>}
          </ResourceInfoDiv> 
        </ExampleDiv>
        <ModalAPIDelete
              confirmText="삭제하기"
              cancelText="취소"
              onConfirm={onDelete}
              onCancel={onCancel}
              visible={dialog}
              >
              <span style={{fontWeight:"bold"}}>{label}</span><span style={{padding:"0px 0px 0px 10px"}}>리소스를 삭제합니다.</span>
        </ModalAPIDelete> 
        <ModalRootResourceDelete
              ConfirmText="확인"
              onConfirm={onCancel}
              visible={faildialog}
              >
              최상위 리소스는 삭제할 수 없습니다.
        </ModalRootResourceDelete> 
      </AllDiv>     
    </React.Fragment>
  );
}
import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { useTreeItem, treeItemClasses} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ResourceCreate from './ResourceCreate';
import Button from '../components/Button';
import Method from './Method';
import ModalApiDelete from '../components/ModalApiDelete';
import MethodUpdate from './MethodUpdate';


const AllDiv = styled.div`
  width: 100%;
  height: 73vh; 
  /* background: pink;  */
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
  /* background:pink;
  width: 200px;
  height: 100%; */
  padding: 15px 15px 0px 15px;
  border: 1px solid #e2e2e2;
`;

const ResourceInfoDiv = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  /* padding : 15px 15px 15px 15px; */
  /* background:pink; */
`;

const PathDiv = styled.div`
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e2e2e2;
    padding : 15px 15px 0px 15px;
    /* background:orange; */
`;

const Content = styled.div`
  width: 100%;
  padding: 20px 20px 0px 20px;
  /* background:pink; */
`;

export default function RecursiveTreeView(props) {
  // console.log(props);

  const serviceInfo = props.serviceInfo;
  const [content, setContent] = useState(null);
  const [resourceId, setResourceId] = useState(null);
  const [label, setLabel] = useState(null);
  const [resource, setResource] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [faildialog, setFailDialog] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const CustomContent = React.forwardRef(function CustomContent(props, ref) {
    const {
      classes,
      className,
      label,
      doc_type,
      nodeId,
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
      if(label === "GET" || label === "POST" || label === "DELETE" || label === "PUT" || label === "ANY" || label === "PATCH" || label === "OPTIONS" || label === "HEAD") {
        setContent('third');
        // navigate('/api/operation/methodCreate');
      }
      else {
        setContent('second');
        // navigate('/api/operation/method');
      }
      setLabel(label);
      setResourceId(nodeId);
      // console.log();
    };
  
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <div
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
          value={doc_type}
        >
          {label}
        </div>
      </div>
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

 
  
  const CustomTreeItem = (props) => (
    <TreeItem ContentComponent={CustomContent} {...props} />
  );

  const StyledTreeItem = styled((props) => {
    // console.log(props);
    return (
    <TreeItem ContentComponent={CustomContent} {...props}/>
    );
  })(() => ({
    [`& .${treeItemClasses.content}`]: {
      height: '35px', 
    },
    [`& .${treeItemClasses.label}`]: {

      fontSize: '16px !important',
      borderBottom: '1px solid #e2e2e2'
    },
  }));

  const renderTree = (nodes) => {
    return(
    <StyledTreeItem key={nodes.resource_id || nodes.method_id} nodeId={nodes.resource_id || nodes.method_id} label={nodes.path || nodes.method_type} ContentProps={{doc_type : nodes.doc_type}}>
      {Array.isArray(nodes.method_list) ? nodes.method_list.map((node) => renderTree3(node)) : null}
      {Array.isArray(nodes.child_resource_list) ? nodes.child_resource_list.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
    );
  };  

  const renderTree3 = (nodes) => {
    return(
    <StyledTreeItem key={nodes.method_id} nodeId={nodes.method_id} label={nodes.method_type} doc_type={nodes.doc_type}>
      {Array.isArray(nodes.method_list) ? nodes.method_list.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
    );
  };
  

  
  const Create = e => {
    setContent('first');
    // navigate('/api/operation/resourceCreate');
  };

  const Delete = e => {
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
    //delete api request
     const deleteResource = async () => {
       try {
         setError(null);
         await axios.delete(
           '/v1.0/g1/paas/Memsq07/apigw/resource/'+resourceId
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
    second: <Method serviceId={serviceInfo.service_id} resourceId={resourceId} lable={label}/>, //method list 나태내줌
    third: <MethodUpdate resourceId={resourceId} methodCommandValue={label}/>
  };

  return (
    <React.Fragment>
      <AllDiv>
        <ButtonDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <Button size="medium" onClick={Create}>리소스 생성</Button>
            <Button size="medium" onClick={Delete}>리소스 삭제</Button>
          </ThemeProvider>
        </ButtonDiv>
        <ExampleDiv>
          <MenuDiv>
            <TreeView
              aria-label="icon expansion"
              defaultCollapseIcon={<ExpandMoreIcon />}
              // defaultExpanded={['root', '1']} //처음 화면이 렌더링 됐을 떄 펼쳐져있을 Tree
              defaultExpandIcon={<ChevronRightIcon />}
              defaultSelected={'root'}
              sx={{ height: 440, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              >
                {renderTree(props.data)}
            </TreeView>
          </MenuDiv> 
          <ResourceInfoDiv>
            <PathDiv>{label}</PathDiv>
             {content && <Content>{selectComponent[content]}</Content>}
              {/* <Routes>
                <Route path="/" element={<ResourceCreate serviceInfo={serviceInfo} resourceId={resourceId} label={label}/>}></Route>
                <Route path="/resourceCreate" element={<ResourceCreate serviceInfo={serviceInfo} resourceId={resourceId} label={label}/>}></Route>
                <Route path="/resource/:nodeId" element={<Method resourceId={resourceId}/>}></Route>
                <Route path="/method" element={<MethodUpdate resourceId={resourceId} methodCommandValue={label}/>}></Route>
              </Routes> */}
          </ResourceInfoDiv> 
        </ExampleDiv>
        <ModalApiDelete
              // title="정말로 삭제하시겠습니까?"
              confirmText="삭제"
              cancelText="취소"
              onConfirm={onDelete}
              onCancel={onCancel}
              visible={dialog}
              >
              {label}를 정말로 삭제하시겠습니까?
        </ModalApiDelete> 
        <ModalApiDelete
              // title="정말로 삭제하시겠습니까?"
              ConfirmText="확인"
              onConfirm={onCancel}
              visible={faildialog}
              >
              최상위 리소스는 삭제할 수 없습니다.
        </ModalApiDelete> 
      </AllDiv>     
    </React.Fragment>
  );
}
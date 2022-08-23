import React, { useState, useEffect, useRef } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { useTreeItem, treeItemClasses} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import ModalApiDelete from 'components/ModalApiDelete';
import StageCreate from './StageCreate';
import { CopyToClipboard } from "react-copy-to-clipboard";
import StageInfo from "./StageInfo";
import StageMethod from "./StageMethod";
import StageResourceInfo from "./StageResourceInfo";


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
  /* background: #d9edf7; */
`;

const InvokeurlDiv = styled.div`
  background: #eff4fb;
  /* #d9edf7 #d7e3f5 */
  font-size : 15px;
  font-weight: bold;
  padding: 15px 20px 15px 20px;
`;

const CopyButtonDiv = styled.button`
  margin: 0px 0px 0px 10px;
  cursor: pointer;

`;

export default function RecursiveTreeView(props) {
  // console.log(props);

  const serviceInfo = props.serviceInfo;
  const [content, setContent] = useState(null);
  const [resourceId, setResourceId] = useState(null);
  const [stageId, setStageId] = useState(null);
  const [label, setLabel] = useState();
  const [resource, setResource] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [error, setError] = useState(null);
  
  // const serviceInfo = props.serviceInfo;
  // const navigate = useNavigate(); 

  const CustomContent = React.forwardRef(function CustomContent(props, ref) {
    // console.log(props.label);
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

      if(event.target.getAttribute('value') === "RESOURCE") {
        setContent("third");
      }
      else if(event.target.getAttribute('value') === "METHOD") {
        setContent("fourth");
      } 
      else {
        setStageId(nodeId);
        setContent("second");
      }

      setLabel(label);
      setResourceId(nodeId);
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
      fontSize: '18px !important',
      borderBottom: '1px solid #e2e2e2'
    },
  }));

  const renderTree = (nodes) => {
    return (
          <StyledTreeItem key={nodes.stage_id} nodeId={nodes.stage_id} label={nodes.name} ContentProps={{doc_type : nodes.doc_type}}>
            { renderTree2(nodes.root_resource) }   
          </StyledTreeItem> 
    );
  };

  const renderTree2 = (nodes) => {
    return (
          <StyledTreeItem key={nodes.resource_id || nodes.method_id} nodeId={nodes.resource_id || nodes.method_id} label={nodes.path || nodes.method_typ} ContentProps={{doc_type : nodes.doc_type}}>
            { Array.isArray(nodes.child_resource_list) ? nodes.child_resource_list.map((node) => renderTree2(node)) : null }
            { Array.isArray(nodes.method_list) ? nodes.method_list.map((node) => renderTree3(node)) : null }
          </StyledTreeItem>  
    );
  };


  const renderTree3 = (nodes) => {
    return (
          <StyledTreeItem key={nodes.method_id} nodeId={nodes.method_id} label={nodes.method_type} ContentProps={{doc_type : nodes.doc_type}}>
            {Array.isArray(nodes.method_list) ? nodes.method_list.map((node) => renderTree2(node)) : null}
          </StyledTreeItem> 
    );
  };

  // console.log(serviceInfo.service_id);
  // console.log(resourceId);


  const Create = e => {
    setContent('first');
  };

  const onDelete = () => {
    //delete stage request
     const deleteStage = async () => {
       try {
         setError(null);
         await axios.delete(
           '/v1.0/g1/paas/Memsq07/apigw/stage/'+resourceId
         );
       } catch (e) {
         setError(e);
         console.log(error);
       }
     };
     deleteStage();
     setDialog(false);
    window.location.reload(true);
   };

   const Delete = e => {
    if (label != null) {
      setDialog(true);
    }
  };

  const onCancel = () => {
    console.log('취소');
    setDialog(false);
  };

  const copy = () => {
    const el = textInput.current
    el.select()
    document.execCommand("copy")
  }   

  const textInput = useRef();

  const selectComponent = {
    first: <StageCreate serviceInfo={serviceInfo}/>,
    second: <StageInfo resourceId={resourceId}/>,
    third: <StageResourceInfo resourceId={resourceId}/>,
    fourth: <StageMethod stageId={stageId} resourceId={resourceId}/>
   
      // <InvokeurlDiv>{resourceId}.ktcloud.io
      //   <CopyToClipboard text={resourceId+".ktcloud.io"} onCopy={()=>alert("주소가 복사되었습니다")}>
      //     <CopyButtonDiv>주소 복사</CopyButtonDiv>
      //   </CopyToClipboard>
      // </InvokeurlDiv>
    
  };

  return (
    <React.Fragment>
      <AllDiv>
        <ButtonDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
          <span style={{padding: "0px 15px 0px 0px"}}><Button size="small" line="line" onClick={Create}>스테이지 생성</Button></span>
            <Button size="small" line="line" onClick={Delete}>스테이지 삭제</Button>
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
                {props.data.map((node) => renderTree(node)) }
            </TreeView>
          </MenuDiv> 
          <ResourceInfoDiv>
            <PathDiv>{label}</PathDiv>
            <InvokeurlDiv>{resourceId}.ktcloud.io
              <CopyToClipboard text={resourceId+".ktcloud.io"} onCopy={()=>alert("주소가 복사되었습니다")}>
                <CopyButtonDiv>주소 복사</CopyButtonDiv>
              </CopyToClipboard>
            </InvokeurlDiv>
             {content && <Content>{selectComponent[content]}</Content>}
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
              {label} 정말로 삭제하시겠습니까?
        </ModalApiDelete> 
      </AllDiv>     
    </React.Fragment>
  );
}
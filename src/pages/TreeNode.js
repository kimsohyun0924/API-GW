import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ResourceCreate from './ResourceCreate';
import Button from '../components/Button';
import MethodCreate from './Method';
import ModalApiDelete from '../components/ModalApiDelete';


const ButtonDiv = styled.div`
  display : flex;
  padding: 10px 0px 20px 0px;
`;

const ExampleDiv = styled.div`
  display: flex;  
  /* background: orange;  */
`;

const MenuDiv = styled.div`
  min-width: 200px;
  min-height: 610px;
  /* background:pink; */
  /* width: 200px;
  height: 610px; */
  padding: 15px 15px 0px 15px;
  border: 1px solid #e2e2e2;
`;

const ResourceInfo = styled.div`
  height: 610px;
  width: 100%;
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  
  padding : 15px 15px 15px 15px;
`;

const Content = styled.div`
 
  width: 100%;
  height: 100%;
  padding: 10px 0px 0px 0px;
`;

const PathDiv = styled.div`
    border-bottom: 1px solid #e2e2e2;
    padding : 0px 0px 5px 0px;
    height: 25px;
`;

export default function RecursiveTreeView(props) {

  const [content, setContent] = useState(null);
  const [nodeId, setNodeId] = useState(null);
  const [label, setLabel] = useState(null);
  const [resource, setResource] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const serviceInfo = props.serviceInfo;
  const data = props.data;

  const CustomContent = React.forwardRef(function CustomContent(props, ref) {
    const {
      classes,
      className,
      label,
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
      // console.log(nodeId);
      setContent('second');
      setLabel(label);
      setNodeId(nodeId);
      // console.log(content);
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
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
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
    /**
     * The id of the node.
     */
    nodeId: PropTypes.string.isRequired,
  };
  
  const CustomTreeItem = (props) => (
    <TreeItem ContentComponent={CustomContent} {...props} />
  );

  const renderTree = (nodes) => (
    <CustomTreeItem key={nodes.resourceId || nodes.methodId} nodeId={nodes.resourceId || nodes.methodId} label={nodes.path || nodes.type}>
      {Array.isArray(nodes.resourceList) ? nodes.resourceList.map((node) => renderTree(node)) : null}
      {Array.isArray(nodes.methodList) ? nodes.methodList.map((node) => renderTree(node)) : null}
    </CustomTreeItem>
  );

  
  const Create = e => {
    setContent('first');
  };

  const Delete = e => {
    setDialog(true);
  };

  const onCancel = () => {
    console.log('취소');
    setDialog(false);
  };

  const onDelete = () => {
    //delete api request
     const deleteResource = async () => {
       try {
         setError(null);
         await axios.delete(
           '/v1.0/g1/paas/Memsq07/apigw/resource/'+nodeId
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
    first: <ResourceCreate serviceInfo={serviceInfo} nodeId={nodeId} label={label}/>,
    second: <MethodCreate/>
    // third: 
  };

  return (
    <React.Fragment>
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
              {renderTree(data)}
          </TreeView>
        </MenuDiv> 
        <ResourceInfo>
          <PathDiv>{label}</PathDiv>
          {content && <Content>{selectComponent[content]}</Content>}
        </ResourceInfo> 
      </ExampleDiv>
      <ModalApiDelete
            // title="정말로 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={onDelete}
            onCancel={onCancel}
            visible={dialog}
            >
            {label}  정말로 삭제하시겠습니까?
      </ModalApiDelete>      
    </React.Fragment>
  );
}
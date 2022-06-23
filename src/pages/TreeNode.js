import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
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

const data = {
  'resourceId': 'root',
  'path': '/',
  'resourceList': [
    {
      'resourceId': '1',
      'path': '/test1',
      'resourceList' : [
        {
          'resourceId': '2',
          'path': '/test2'
        }
      ]
    }
  ],
  "methodList": [
    {
      "methodId": "string",
      "resourceId": "string",
      "type": "GET",
      "routeDefinitionList": [
        {
          "routeId": "string",
          "uri": "string",
          "methodId": "string",
          "predicateDefinitionList": [
            {
              "createdAt": "2022-06-23T08:28:38.288Z",
              "updatedAt": "2022-06-23T08:28:38.288Z",
              "id": "string",
              "name": "string",
              "args": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
              }
            }
          ],
          "filterDefinitionList": [
            {
              "id": "string",
              "name": "string",
              "args": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
              }
            }
          ]
        }
      ]
    }
  ]
};

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



      

export default function RecursiveTreeView(state) {

  const [content, setContent] = useState();
  const [nodeId, setNodeId] = useState();
  const [label, setLabel] = useState();

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
  
    
    const navigate = useNavigate();
    const handleSelectionClick = (event) => {
      handleSelection(event);
      console.log(nodeId);
      setContent('second');
      setLabel(label);
      console.log(content);
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

  
  const onClick = e => {
    setContent('first');
  };

  const onClick2 = e => {
    setContent('third');
  };

  const onClick3 = e => {
    setContent('third');
  };

  const selectComponent = {
    first: <ResourceCreate state={state} nodeId={nodeId}/>,
    second: <MethodCreate/>,
    // third: <MethodCreate />
  };

  return (
    <React.Fragment>
      <ButtonDiv>
        <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
          <Button size="medium" onClick={onClick}>리소스 생성</Button>
          <Button size="medium" onClick={onClick2}>리소스 삭제</Button>
        </ThemeProvider>
      </ButtonDiv>
      <ExampleDiv>
        <MenuDiv>
          <TreeView
            aria-label="icon expansion"
            defaultCollapseIcon={<ExpandMoreIcon />}
            // defaultExpanded={['root']} //처음 화면이 렌더링 됐을 떄 펼쳐져있을 Tree
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 440, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
              {renderTree(data)}
          </TreeView>
        </MenuDiv> 
        <ResourceInfo>
          <div style={{borderBottom:"1px solid #e2e2e2", padding:"0px 0px 5px 0px"}}>{label}</div>
          {content && <Content>{selectComponent[content]}</Content>}
        </ResourceInfo> 
      </ExampleDiv>      
    </React.Fragment>
  );
}
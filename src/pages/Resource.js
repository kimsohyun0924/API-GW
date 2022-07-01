import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import Button from '../components/Button';
import ResourceCreate from './ResourceCreate';
import MethodCreate from './Method';
import Method from './MethodCreate';
import TreeNode from './TreeNode';
import axios from 'axios';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { useLocation } from "react-router";



const ResourceContainer = styled.div`
    
`;  

export default function Resource(props) {
  const serviceInfo = props.serviceInfo;
  const serviceId = serviceInfo.id;
  const resourceId = serviceInfo.root_resource_id;
  const [AllResource, SetAllResource] = useState(null);
  const [error, setError] = useState(null);

  // const [RootId, SetRootId] = useState(null);
  // const [data, setData] = useState(); 
  // const { state } = useLocation();
  // const allresource = {
                      
  //                       "root_resource_doc": {
  //                           "created_at": "2022-07-01T10:35:02.701081",
  //                           "updated_at": "2022-07-01T10:35:02.733515",
  //                           "id": "62be4f4657692a44c3494a46",
  //                           "path": "/",
  //                           "doc_type": "RESOURCE",
  //                           "method_doc_list": null,
  //                           "child_resource_doc_list": [
  //                               {
  //                                   "created_at": "2022-07-01T10:35:02.722386",
  //                                   "updated_at": "2022-07-01T10:35:02.722386",
  //                                   "id": "62be4f4657692a44c3494a4a",
  //                                   "path": "/test",
  //                                   "doc_type": "RESOURCE",
  //                                   "method_doc_list": [
  //                                       {
  //                                           "created_at": "2022-07-01T10:34:57.006",
  //                                           "updated_at": "2022-07-01T10:34:57.006",
  //                                           "id": "62be4f4157692a44c3494a43",
  //                                           "method_type": "GET",
  //                                           "doc_type": "METHOD",
  //                                           "integration_type": "HTTP",
  //                                       }
  //                                   ],
  //                                   "child_resource_doc_list": null
  //                               }
  //                           ]
  //                       },
  //                       "status": "STAGE_DEPLOYED"
  //                     }
    
  

  //전체 리소스 조회
  const getAllResource = async () => {
    //get api request
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/resource/'+resourceId
      );
      SetAllResource(response.data); // 데이터는 response.data
    } catch (e) {
      setError(e);
    }
  };


  useEffect(() => {
    getAllResource();
  }, []);

  console.log(AllResource);


  return (
    <React.Fragment>
      <ResourceContainer>        
        <TreeNode serviceInfo={serviceInfo} data={AllResource}/>
      </ResourceContainer>
    </React.Fragment>
  );
}

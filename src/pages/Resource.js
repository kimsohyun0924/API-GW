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
  const [AllResource, SetAllResource] = useState({"resource_id": "62becb8438c2e53962ab955c"});
  const [error, setError] = useState(null);
  // const [RootId, SetRootId] = useState(null);
  // const [data, setData] = useState(); 
  // const { state } = useLocation();
  const allresource = {
                          "resource_id": "62c62f1c0ae918662e916491",
                          "doc_type": "RESOURCE",
                          "path": "/",
                          "method_list": null,
                          "child_resource_list": [
                              {
                                  "resource_id": "62c62f3b0ae918662e916493",
                                  "doc_type": "RESOURCE",
                                  "path": "/test1",
                                  "method_list": null,
                                  "child_resource_list": null,
                                  "created_at": "2022-07-07T09:56:27.744",
                                  "updated_at": "2022-07-07T09:56:27.744"
                              }
                          ],
                          "created_at": "2022-07-07T09:55:56.856",
                          "updated_at": "2022-07-07T09:56:27.755"
                      }
    
  

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

  // console.log(AllResource);


  return (
    <React.Fragment>
      <ResourceContainer>        
        <TreeNode serviceInfo={serviceInfo} data={AllResource}/>
      </ResourceContainer>
    </React.Fragment>
  );
}

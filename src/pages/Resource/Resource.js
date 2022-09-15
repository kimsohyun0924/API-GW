import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TreeNode from './TreeNode';
import axios from 'axios';
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
  const testData = {
                      "resource_id": "62e7767ca5756863db928d40",
                      "doc_type": "RESOURCE",
                      "path": "/",
                      "method_list": null,
                      "child_resource_list": [
                          {
                              "resource_id": "62e776a0a5756863db928d42",
                              "doc_type": "RESOURCE",
                              "path": "/test",
                              "method_list": null,
                              "child_resource_list": [
                                  {
                                      "resource_id": "62e776aba5756863db928d43",
                                      "doc_type": "RESOURCE",
                                      "path": "/test2",
                                      "method_list": [
                                          {
                                              "method_id": "62e776d2a5756863db928d47",
                                              "url_path": "/MethodTest",
                                              "doc_type": "METHOD",
                                              "method_type": "POST",
                                              "integration_type": "HTTP",
                                              "created_at": "2022-08-01T15:46:42.829",
                                              "updated_at": "2022-08-01T15:46:42.829"
                                          }
                                      ],
                                      "child_resource_list": null,
                                      "created_at": "2022-08-01T15:46:03.433",
                                      "updated_at": "2022-08-01T15:46:42.835"
                                  }
                              ],
                              "created_at": "2022-08-01T15:45:52.418",
                              "updated_at": "2022-08-01T15:46:03.444"
                          }
                      ],
                      "created_at": "2022-08-01T15:45:16.537",
                      "updated_at": "2022-08-01T15:45:52.426"
                  }
    
  //전체 리소스 조회
  const getAllResource = async () => {
    //get api request
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/apigw/resource/'+resourceId,
        {
          headers: { 'user-id' : 'ksh@gmail.com' }
        }
      );
      SetAllResource(response.data); // 데이터는 response.data
    } catch (e) {
      setError(e);
    }
  };


  useEffect(() => {
    getAllResource();
  }, []);

  // console.log(resourceId);
  // console.log(AllResource);


  return (
    <React.Fragment>
      <ResourceContainer>        
        <TreeNode serviceInfo={serviceInfo} data={AllResource}/>
      </ResourceContainer>
    </React.Fragment>
  );
}

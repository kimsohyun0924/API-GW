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
  const testData = {
                          "created_at": "2022-07-09T23:17:45.777",
                          "updated_at": "2022-07-09T23:19:31.565",
                          "resource_id": "62c98e09d7176c1f4f28f462",
                          "resource_path": "/",
                          "method_list": null,
                          "child_resource_list": [
                              {
                                  "created_at": "2022-07-09T23:18:17.373",
                                  "updated_at": "2022-07-09T23:18:58.301",
                                  "resource_id": "62c98e29d7176c1f4f28f464",
                                  "resource_path": "/test1",
                                  "method_list": [
                                    {
                                      "method_id": "62c9966bd7176c1f4f28f47f",
                                      "method_type": "GET",
                                      "integration_type": "HTTP",
                                      "url_path": "/test1",
                                      "doc_type": "METHOD",
                                      "created_at": "2022-07-09T23:53:31.316",
                                      "updated_at": "2022-07-09T23:53:31.389"
                                    },
                                    {
                                      "method_id": "62c99661d7176c1f4f28f47b",
                                      "method_type": "POST",
                                      "integration_type": "HTTP",
                                      "url_path": "/test1",
                                      "doc_type": "METHOD",
                                      "created_at": "2022-07-09T23:53:21.368",
                                      "updated_at": "2022-07-09T23:53:21.422"
                                    }
                                  ],
                                  "child_resource_list": [
                                      {
                                          "created_at": "2022-07-09T23:18:29.277",
                                          "updated_at": "2022-07-09T23:18:29.3",
                                          "resource_id": "62c98e35d7176c1f4f28f465",
                                          "resource_path": "/test2",
                                          "method_list": null,
                                          "child_resource_list": null
                                      },
                                      {
                                          "created_at": "2022-07-09T23:18:58.258",
                                          "updated_at": "2022-07-09T23:18:58.283",
                                          "resource_id": "62c98e52d7176c1f4f28f466",
                                          "resource_path": "/test3",
                                          "method_list": null,
                                          "child_resource_list": null
                                      }
                                  ]
                              },
                              {
                                  "created_at": "2022-07-09T23:19:31.531",
                                  "updated_at": "2022-07-09T23:19:31.547",
                                  "resource_id": "62c98e73d7176c1f4f28f467",
                                  "resource_path": "/test4",
                                  "method_list": null,
                                  "child_resource_list": null
                              }
                          ]
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

import React, { useState, useRef, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import DropdownDBServer from '../components/DropdownDBServer';
import MethodComp from '../components/MethodComp';

const TreeNode = styled.div`
  position: relative;
  /* background: pink; */
  width: 100%;
  height: 33px;
  margin-bottom:10px;
  font-size: 20px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
`;

export default function Method() {

    const [inputs, setInputs] = useState({
        ApiName: ''
    });
    
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
          ...inputs,
          [name]: value
        });
    };

    const [serverCommand, setServerCommand] = useState(null);
    const [serverCommandValue, setServerCommandValue] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [focusServer, setFocusServer] = useState(null);

    const optionsCommand = [
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

    useEffect(() => {

      setIsOpen(true);
      setServerCommand("");
  
     
  
    }, [serverCommand]);

    return (
        <React.Fragment>
          <DropdownDBServer dropdownItems={optionsCommand} setItem={setServerCommand} serverCommand={serverCommand} setServerCommandValue={setServerCommandValue} />     

          { isOpen === true && serverCommandValue &&
              <MethodComp isOpen={isOpen} setIsOpen={setIsOpen} serverCommandValue={serverCommandValue} setServerCommandValue={setServerCommandValue} />        
            }

        </React.Fragment>
    );
}
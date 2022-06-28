import React, { useState, useRef, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import DropdownMethod from '../components/DropdownMethod';
import MethodCreate from './MethodCreate';

export default function Method(props) {

    const [methodCommand, setMethodCommand] = useState(null);
    const [methodCommandValue, setMethodCommandValue] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

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
      setMethodCommand("");

    }, [methodCommand]);


    console.log(methodCommandValue);


    return (
        <React.Fragment>
          <DropdownMethod dropdownItems={optionsCommand} setItem={setMethodCommand} methodCommand={methodCommand} setMethodCommandValue={setMethodCommandValue} />    

          { isOpen === true && methodCommandValue &&
              <MethodCreate isOpen={isOpen} setIsOpen={setIsOpen} methodCommandValue={methodCommandValue} setMethodCommandValue={setMethodCommandValue} />        
            }

        </React.Fragment>
    );
}
import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Method from '../pages/MethodCreate';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'block' : 'none'}
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 4px;
  width: 500px;
  height: 400px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 1rem;
  z-index: 100;
  animation: modal-show 0.5s;
  overflow: hidden;
  line-height: 24px;

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  padding: 1rem;
  font-weight: 700;
  border-bottom: 1px solid #dee2e6;
`;

const Main = styled.div`
  padding: 1rem;
  white-space: pre-wrap;
`;

const Footer = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 1rem;
  display: flex;
  padding: 1rem;
  font-weight: 700;
`;

const TextDiv = styled.div`
  padding : 1rem;
`;

const Text = styled.span`
  color: red;
  font-weight: 500;
  font-size: 18px;
`;

const InputForm = styled.input`
  width: 220px;
  border: solid 1px #333333;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 2px;
  height: 32px;
  padding: 0 10px;
  font-size: 16px;
  color: #333333;
  background: #efefef;

  ${props => props.type === 'readonly' && 
    css`
      background: #f0f0f0;
    `
  }
`

const ItemName = styled.div`
  padding: 1rem 0;
`;

const ItemInput = styled.div`
  width: 220px;
  min-width: 220px;
  height: 32px;
`;

export default function MethodComp(props) {

  const { isOpen, setIsOpen, serverCommandValue, setServerCommandValue } = props;

  const [inputDelete, setInputDelete] = useState(null);

  const deleteRef = useRef(null);

  const onCreate = () => {

    if(inputDelete === "delete") {
      setIsOpen(false);
      setServerCommandValue("");

    } else {
      deleteRef.current.focus();
    }
  };

  const onCancel = () => {

    setIsOpen(false);
    setServerCommandValue("");

  };

  const onChange = (e) => {
    e.preventDefault();

    const { value, name } = e.target;

    if(name === 'dbDeleteConfirm') {
      setInputDelete(value);
      console.log(value);
    }
  };

  return (
    <React.Fragment>
      <Method/>
    </React.Fragment>  
  )
}

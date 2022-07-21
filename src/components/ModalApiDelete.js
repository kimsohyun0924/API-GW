import React, { useState, useRef } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import Button from './Button';
import Logo from '../image/Cancel.svg';


const DarkBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(153,153,153,0.5);
`;

const DialogBlock = styled.div`
  width: 500px;
  height: 248px;
  padding: 20px 30px 20px 30px;
  background: white;
  border-radius: 2px;
  border : 1px solid black;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  margin-left: 280px;
  justify-content: flex-end;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

ModalApiDelete.defaultProps = {
  confirmText: '확인'
};

//제목, 내용, 확인 텍스트, 취소 텍스트
export default function ModalApiDelete( { title, children, confirmText, cancelText, onConfirm, onCancel, visible } ) {
  if (!visible) return null;
  return (
      <DarkBackground>
           <DialogBlock>
              <ImgDiv onClick={onCancel}>
                <img src={Logo}/>
              </ImgDiv>
              <h3>{title}</h3>
              <p>{children}</p>
              <ButtonGroup>
                  <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                    <Button size="small" onClick={onCancel} noline>{cancelText}</Button>
                    <Button size="medium" onClick={onConfirm}>{confirmText}</Button>
                  </ThemeProvider>
              </ButtonGroup>
          </DialogBlock>
      </DarkBackground>
  );
}
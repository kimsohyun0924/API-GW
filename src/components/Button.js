import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      /* background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      } */

      ${props =>
          props.line === "line"&&
        css`
          background: ${selected};
          border-radius: 3px;
          padding: 9px 21px 9px 21px;
          border: none;
          font-family: Spoqa Han Sans Regular;
          vertical-align: middle;
          text-align: center;
          height: auto; 
          &:hover {
            background: ${lighten(0.1, selected)};
          }
          &:active {
            background: ${darken(0.1, selected)};
          }            
        `}

      ${props =>
        props.line === "outline" &&
        css`
          color: #333336;
          background: none;
          border-radius: 2px;
          padding: 8px 10px 8px 10px;
          border: 1px solid #333336;
          font-family: Spoqa Han Sans Regular;

          &:hover {
            background: white;
            border: 1px solid #03428e;
            color: #03428e;
          }    
        `}

        ${props =>
        props.line === "noline" &&
        css`
          color: black;
          background: none;
          border: none;
          padding: 12px 28px 12px 28px;
          font-family: Spoqa Han Sans Regular;
          &:hover {
            color: black;
            background: #f4f4f4;
            border: none;
          }
        `}

        ${props =>
        props.resource&&
        css`
          color: black;
          background: none;
          border: none;
          &:hover {
            background: none;
            border: none;
            color: black;
          }
        `}

    `;
  }}
`;

const sizes = {
  large: {
    fontSize: '16px'
  },
  medium: {
    fontSize: '15px'
  },
  small: {
    fontSize: '14px'
  },
  supersmall: {
    fontSize: '13px'
  }
};

const sizeStyles = css`
  ${({ size }) => css`
    font-size: ${sizes[size].fontSize};
  `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  /* display: inline-flex; */
  /* align-items: center; */
  outline: none;
  border: none;
  color: white;
  /* font-weight: bold; */
  cursor: pointer;
  /* font-weight: 350; */
  /* text-align: center;
  vertical-align: middle; */
  /* min-width: 200px; */
  box-shadow: none;

  /* 크기 */
  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  /* 기타 */
`;

function Button({ children, color, size, line, action, ...rest }) {
  return (
    <StyledButton
      color={color}
      size={size}
      line={line}
      onClick={action}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: 'blue',
  size: 'medium',
};

export default Button;
import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${props =>
        props.outline &&
        css`
          color: #333336;
          background: none;
          border-radius: 2px;
          padding: 7px 10px 7px 10px;
          border: 0.01rem solid #333336;
          font-family: Spoqa Han Sans Regular;
          margin-right: 10px;
          &:hover {
            background: white;
            border: 0.01rem solid #03428e;
            color: #03428e;
          }    
        `}

        ${props =>
          props.noline&&
        css`
          background: ${selected};
          border-radius: 3px;
          padding: 7px 20px 7px 20px;
          border: none;
          font-family: Spoqa Han Sans Regular;
          margin-right: 20px;
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

function Button({ children, color, size, outline, noline, action, ...rest }) {
  return (
    <StyledButton
      color={color}
      size={size}
      outline={outline}
      noline={noline}
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
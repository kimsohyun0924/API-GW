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
          border: 0.01rem solid #333336;
          &:hover {
            background: white;
            border: 0.01rem solid #03428e;;
            color: #03428e;;
          }
        `}
        ${props =>
        props.noline&&
        css`
          color: black;
          background: none;
          border: none;
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
    minWidth: '200px',
    height: '3rem',
    fontSize: '14px'
  },
  medium: {
    minWidth: '100px',
    height: '2.25rem',
    fontSize: '14px'
  },
  small: {
    minWidth: '60px',
    height: '2.25rem',
    fontSize: '14px'
  }
};

const sizeStyles = css`
  ${({ size }) => css`
    min-width: ${sizes[size].minWidth};
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  /* display: inline-flex; */
  /* align-items: center; */
  outline: none;
  border: none;
  border-radius: 2px;
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
  & + & {
    margin-left: 15px;
  }
`;

function Button({ children, color, size, outline, action, ...rest }) {
  return (
    <StyledButton
      color={color}
      size={size}
      outline={outline}
      onClick={action}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: 'blue',
  size: 'medium'
};

export default Button;
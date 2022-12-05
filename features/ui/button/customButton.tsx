import React from "react";
import styled, { css } from "styled-components";
import { color, textFont, space } from "@styles/theme";
import { Button } from "./button";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
}

type ButtonProps = {
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  onClick: () => void;
};

export const ButtonContainer = styled(Button)<{
  size: ButtonSize;
  color: ButtonColor;
  disabled: boolean;
}>`
  // remove default button styles
  border: none;
  margin: 0;
  padding: 0;
  background: transparent;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  // default style
  border-radius: 8px;
  border: 1px solid;

  display: flex;
  align-items: center;
  gap: 8px;

  & img {
    width: 1em;
    height: 1em;
  }

  ${(props) => {
    return css`
      cursor: ${props.disabled ? "not-allowed" : "pointer"};
    `;
  }}

  ${(props) => {
    switch (props.size) {
      case ButtonSize.sm:
        return css`
          padding: ${space(2)} 0.875rem;
          ${textFont("md", "medium")}
        `;
      case ButtonSize.md:
        return css`
          padding: 0.71rem 1.14rem;
          ${textFont("md", "medium")}
        `;
      case ButtonSize.lg:
        return css`
          padding: 0.71rem 1.29rem;
          font-size: 1.14rem;
          line-height: 1.5;
        `;
      case ButtonSize.xl:
        return css`
          padding: 0.861rem 1.43rem;
          font-size: 1.14rem;
          line-height: 1.5;
        `;
    }
  }}
  ${(props) => {
    switch (props.color) {
      case ButtonColor.secondary:
        return css`
          background: ${props.disabled
            ? color("primary", 25)
            : color("primary", 50)};
          color: ${props.disabled
            ? color("primary", 300)
            : color("primary", 700)};
          border-color: ${props.disabled
            ? color("primary", 25)
            : color("primary", 50)};
          &:hover {
            background: ${color("primary", 100)};
            border-color: ${color("primary", 100)};
          }
          &:focus {
            outline: 4px solid ${color("primary", 100)};
          }
        `;
      case ButtonColor.gray:
        return css`
          background: #ffffff;
          color: ${props.disabled ? color("gray", 300) : color("gray", 700)};
          border-color: ${color("gray", 300)};
          &:hover {
            background: ${color("gray", 50)};
          }
          &:focus {
            outline: 4px solid ${color("gray", 100)};
          }
        `;
      case ButtonColor.emptyGray:
        return css`
          background: transparent;
          border-color: transparent;
          color: ${props.disabled ? color("gray", 300) : color("gray", 500)};
          &:hover {
            color: ${color("gray", 600)};
            background: ${color("gray", 50)};
          }
        `;
      case ButtonColor.empty:
        return css`
          background: transparent;
          border-color: transparent;
          color: ${props.disabled ? color("gray", 300) : color("primary", 700)};
          &:hover {
            background: ${color("primary", 50)};
          }
        `;
      default:
        return css`
          background: ${props.disabled
            ? color(props.color, 300)
            : color(props.color, 600)};
          border-color: ${props.disabled
            ? color(props.color, 300)
            : color(props.color, 600)};
          color: #ffffff;

          &:hover {
            background: ${color(props.color, 700)};
            border-color: ${color(props.color, 700)};
          }
          &:focus {
            outline: 4px solid ${color("primary", 100)};
          }
        `;
    }
  }}
`;

export const ButtonIcon = styled.img`
  vertical-align: middle;
  stroke: black;
`;

export function CustomButton({
  children,
  size = ButtonSize.xl,
  color = ButtonColor.empty,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <ButtonContainer
      size={size}
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
}

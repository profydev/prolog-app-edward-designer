import styled, { keyframes } from "styled-components";
import { color, breakpoint } from "@styles/theme";

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  @media (min-width: ${breakpoint("desktop")}) {
    height: 248px;
  }
`;

const spin = keyframes`
    0% { transform: rotate(-45deg) }
    100% { transform: rotate(315deg) }
`;

const Spinner = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 8px solid ${color("primary", 50)};
  border-right: 8px solid ${color("primary", 600)};
  :after,
  :before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: ${color("primary", 600)};
    border-radius: 50%;
    right: 0px;
    top: 40px;
  }
  :before {
    top: 0px;
  }
  transform: rotate(-45deg);
  animation: ${spin} 2000ms infinite linear;
`;

export const Loading = () => {
  return (
    <SpinnerContainer>
      <Spinner data-cy="spinner" />
    </SpinnerContainer>
  );
};

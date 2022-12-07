import styled, { css } from "styled-components";
import { color, textFont, space } from "@styles/theme";
import { useState } from "react";

interface InputType {
  id: string;
  name: string;
  placeholder: string;
  label?: string;
  disabled?: boolean;
  icon?: string;
  hint?: string;
  error?: boolean;
  errorMsg?: string;
  inputValue?: string;
}

const InputContainer = styled.div`
  width: 320px;
`;
const InputLabel = styled.label`
  display: block;
  color: ${color("gray", 700)};
  ${textFont("sm", "medium")};
  margin-bottom: 6px;
`;

const InputTag = styled.input<{
  icon: string;
  error: boolean;
  errorMsg: string;
}>`
  width: 100%;
  ${textFont("md", "medium")};
  border-radius: 8px;
  padding: 10px 14px;
  color: ${color("gray", 900)};
  background-color: #fff;
  ${(props) =>
    css`
      padding-left: ${props.icon ? "42px" : "14px"};
      padding-right: ${props.error ? "38px" : "14px"};
      background: ${props.icon
          ? `url(${props.icon}) left 15.7px center no-repeat, `
          : "#fff"}
        ${props.error
          ? "url(/icons/input-error.svg) right 15.3px center no-repeat"
          : "#fff"};
      border: 1px solid
        ${props.error ? color("error", 300) : color("gray", 300)};
      :focus {
        outline: 4px solid
          ${props.error ? color("error", 100) : color("primary", 100)};
      }
    `};
  :disabled {
    background-color: ${color("gray", 50)};
    color: ${color("gray", 500)};
  }
`;

const InputHint = styled.div`
  ${textFont("sm", "regular")};
  color: ${color("gray", 500)};
  margin-top: 6px;
`;

const InputError = styled.div`
  ${textFont("sm", "regular")};
  color: ${color("error", 500)};
  margin-top: 6px;
`;

export const Input = ({
  id,
  name,
  placeholder = "olivia@untitledui.com",
  label = "",
  disabled = false,
  icon = "",
  hint = "",
  error = false,
  errorMsg = "",
  inputValue = "",
}: InputType) => {
  const [value, setValue] = useState(inputValue);
  return (
    <InputContainer>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <InputTag
        type="text"
        id={id}
        name={name}
        disabled={disabled}
        icon={icon}
        placeholder={placeholder}
        error={error}
        errorMsg={errorMsg}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error ? (
        errorMsg ? (
          <InputError>{errorMsg}</InputError>
        ) : (
          ""
        )
      ) : hint ? (
        <InputHint>{hint}</InputHint>
      ) : (
        ""
      )}
    </InputContainer>
  );
};

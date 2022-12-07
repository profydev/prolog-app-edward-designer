import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

interface CheckboxType {
  id: string;
  label: string;
  value: string;
  size?: CheckboxSize;
  disabled?: boolean;
  indeterminate?: boolean;
  checked?: boolean;
}

const CheckboxLabel = styled.label<{
  size: CheckboxSize;
  disabled: boolean;
}>`
  display: grid;
  grid-template-columns: 1em auto;
  ${(props) => {
    switch (props.size) {
      case CheckboxSize.sm:
        return css`
          ${textFont("sm", "medium")}
          gap: 8px;
        `;
      case CheckboxSize.md:
        return css`
          ${textFont("md", "medium")}
          gap: 12px;
        `;
    }
  }}
  ${(props) => {
    return css`
      color: ${props.disabled ? color("gray", 300) : color("gray", 700)};
    `;
  }}
`;

const CheckboxInput = styled.input<{
  disabled: boolean;
}>`
  appearance: none;
  background-color: #ffffff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1em;
  height: 1em;
  transform: translateY(0.2em);
  border: 1px solid ${color("gray", 300)};
  border-radius: 0.25em;
  display: grid;
  place-content: center;

  ::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    box-shadow: inset 1em 1em ${color("primary", 600)};
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
  }
  :focus,
  :focus-visible {
    outline: 4px solid ${color("primary", 100)};
    border: 1px solid ${color("primary", 300)};
  }
  :hover,
  :checked {
    border: 1px solid ${color("primary", 600)};
    background-color: ${color("primary", 50)};
  }
  :checked::before {
    transform: scale(1);
    mask-image: url("/icons/checkbox-tick.svg");
  }
  :indeterminate::before {
    transform: scale(1);
    mask-image: url("/icons/checkbox-indeterminate.svg");
  }
  :disabled::before {
    box-shadow: inset 1em 1em ${color("gray", 200)};
  }
  :disabled,
  :hover:disabled {
    border: 1px solid ${color("gray", 200)};
    background-color: ${color("gray", 100)};
  }
`;

export const Checkbox = ({
  id,
  label,
  value,
  size = CheckboxSize.sm,
  disabled = false,
  indeterminate = false,
  checked = false,
}: CheckboxType) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (indeterminate && checkboxRef.current) {
      checkboxRef.current.indeterminate = true;
      checkboxRef.current.setAttribute("aria-checked", "mixed");
    }
  }, [indeterminate, checkboxRef]);
  return (
    <CheckboxLabel size={size} disabled={disabled}>
      <CheckboxInput
        ref={checkboxRef}
        type="checkbox"
        id={id}
        name={id}
        value={value}
        disabled={disabled}
        defaultChecked={checked}
      />
      {label}
    </CheckboxLabel>
  );
};

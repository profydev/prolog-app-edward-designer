import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";

// ref: https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/

interface SelectType {
  id: string;
  name: string;
  value?: string;
  label?: string;
  placeholder: string;
  options: string[];
  disabled?: boolean;
  hint?: string;
  error?: string;
  icon?: string;
}

const SelectContainer = styled.div`
  position: relative;
  width: 320px;
  &:after {
    position: absolute;
    content: "";
    width: 12px;
    height: 8px;
    background-color: ${color("gray", 500)};
    top: 16px;
    right: 19.5px;
    mask: url("/icons/chevron.svg") no-repeat top right;
    transition: all 200ms;
    transform: rotate(var(--chevronDirection, 0deg));
  }
  @media (hover: hover) {
    & > select:focus + div {
      display: none;
    }
  }
  & * {
    box-sizing: border-box;
  }
`;

const SelectLabel = styled.label`
  ${textFont("sm", "medium")}
  color: ${color("gray", 700)};
  display: block;
  margin-bottom: 6px;
`;

const NativeSelect = styled.select<{
  error: string;
}>`
  // remove default styles
  appearance: none;
  display: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;

  width: 100%;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  display: grid;

  :disabled {
    color: ${color("gray", 500)};
    background-color: ${color("gray", 50)};
  }

  :invalid {
    color: ${color("gray", 500)};
  }

  ${(props) =>
    css`
      border: 1px solid
        ${props.error ? color("error", 300) : color("gray", 300)};
    `};

  :focus {
    ${(props) =>
      css`
        border-color: 1px solid
          ${props.error ? color("error", 300) : color("gray", 300)};
        outline: 4px solid
          ${props.error ? color("error", 100) : color("primary", 100)};
      `};
  }
`;

const SelectOption = styled.option``;

const SelectHint = styled.span`
  ${textFont("sm", "regular")}
  color: ${color("gray", 500)};
  display: block;
  margin-top: 6px;
`;

const SelectError = styled.span`
  ${textFont("sm", "regular")}
  color: ${color("error", 500)};
  display: block;
  margin-top: 6px;
`;

const CustomSelect = styled.div<{
  error: string;
  disabled: boolean;
  icon: string;
}>`
  position: absolute;
  top: 0;
  left: 0;
  display: none;

  width: 100%;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  display: grid;
  ${(props) => {
    if (props.icon)
      return css`
        padding-left: 42px;
        background: url(${props.icon}) no-repeat left 17.3px center #fff;
      `;
  }}
  ${(props) =>
    css`
      color: ${props.disabled ? color("gray", 500) : color("gray", 900)};
      background-color: ${props.disabled ? color("gray", 50) : "white"};
    `};

  ${(props) =>
    css`
      border: 1px solid
        ${props.error ? color("error", 300) : color("gray", 300)};
    `};

  @media (hover: hover) {
    display: block;
  }
`;
const CustomSelectOptionContainer = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  margin-top: 8px;
  ${textFont("sm", "medium")}
  color: ${color("gray", 900)};
  padding: 4px 0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 6px -2px rgba(16, 24, 40, 0.05);
`;
const CustomSelectOption = styled.div`
  padding: 10px 14px;
  :hover {
    background-color: ${color("primary", 25)};
  }
`;

const CustomSelectedOption = styled.div`
  padding: 10px 14px;
  background: url("/icons/select-tick.svg") ${color("primary", 25)} no-repeat
    right 17px center;
`;

const Placeholder = styled.div`
  color: ${color("gray", 500)};
`;

const titleCase = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const Select = ({
  id,
  name,
  value = "",
  label = "",
  placeholder = "",
  disabled = false,
  options,
  hint,
  error = "",
  icon = "",
}: SelectType) => {
  const [selected, setSelected] = useState(value);
  const customSelectRef = useRef<HTMLDivElement>(null);
  const customOptionsRef = useRef<HTMLDivElement>(null);

  const clickHandler = useCallback(() => {
    const root = document.querySelector(":root") as HTMLElement;
    if (customOptionsRef.current && customSelectRef.current && !disabled) {
      if (customOptionsRef.current.style.display === "block") {
        customOptionsRef.current.style.display = "none";
        customSelectRef.current.style.outline = "none";
        customSelectRef.current.style.setProperty("--chevronDirection", "0deg");
        root.style.setProperty("--chevronDirection", "0deg");
      } else {
        customOptionsRef.current.style.display = "block";
        customSelectRef.current.style.outline = error
          ? "4px solid #FEE4E2"
          : "4px solid #F4EBFF";
        root.style.setProperty("--chevronDirection", "180deg");
      }
    }
  }, [customOptionsRef, customSelectRef, disabled, error]);

  useEffect(() => {
    customSelectRef.current?.addEventListener("click", clickHandler);
    return () => {
      customSelectRef.current?.removeEventListener("click", clickHandler);
    };
  }, [customSelectRef, customOptionsRef, clickHandler]);

  useEffect(() => {
    const closeOpenMenus = (e: MouseEvent) => {
      if (!customOptionsRef.current || !customSelectRef.current || disabled)
        return;
      if (!(e.target instanceof Node)) return;
      if (
        customOptionsRef.current.contains(e.target) ||
        customSelectRef.current.contains(e.target)
      )
        return;
      if (customOptionsRef.current.style.display === "block") {
        const root = document.querySelector(":root") as HTMLElement;
        customOptionsRef.current.style.display = "none";
        customSelectRef.current.style.outline = "none";
        root.style.setProperty("--chevronDirection", "0deg");
      }
    };

    document.addEventListener("mousedown", closeOpenMenus);
    return () => document.removeEventListener("mousedown", closeOpenMenus);
  }, [disabled]);

  return (
    <div>
      {label && <SelectLabel htmlFor={id}>{label}</SelectLabel>}
      <SelectContainer>
        <NativeSelect
          required
          id={id}
          name={name}
          disabled={disabled}
          error={error}
          onChange={(e) => setSelected(e.target.value)}
        >
          {placeholder && !selected && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            const lowerCasedOption = option.toLowerCase();
            return (
              <SelectOption
                value={lowerCasedOption}
                key={lowerCasedOption}
                selected={option === selected}
              >
                {titleCase(lowerCasedOption)}
              </SelectOption>
            );
          })}
        </NativeSelect>
        <CustomSelect
          ref={customSelectRef}
          error={error}
          disabled={disabled}
          aria-hidden={true}
          icon={icon}
        >
          {selected ? (
            titleCase(selected)
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}
        </CustomSelect>
        <CustomSelectOptionContainer ref={customOptionsRef}>
          {options.map((option) => {
            const lowerCasedOption = option.toLowerCase();
            if (option === selected) {
              return (
                <CustomSelectedOption key={lowerCasedOption}>
                  {titleCase(lowerCasedOption)}
                </CustomSelectedOption>
              );
            }
            return (
              <CustomSelectOption
                key={lowerCasedOption}
                onClick={() => {
                  setSelected(option);
                  clickHandler();
                }}
              >
                {titleCase(lowerCasedOption)}
              </CustomSelectOption>
            );
          })}
        </CustomSelectOptionContainer>
      </SelectContainer>
      {error ? (
        <SelectError>{error}</SelectError>
      ) : hint ? (
        <SelectHint>{hint}</SelectHint>
      ) : (
        ""
      )}
    </div>
  );
};

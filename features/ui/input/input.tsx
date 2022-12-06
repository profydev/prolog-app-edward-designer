import styled, { css } from "styled-components";
import { color, textFont, space } from "@styles/theme";

interface SelectType {
  id: string;
  name: string;
  label?: string;
  options: string[];
  disabled?: boolean;
}

const SelectLabel = styled.label``;

const SelectTag = styled.select``;

const SelectOption = styled.option``;

const titleCase = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const Input = ({
  id,
  name,
  label = "",
  disabled = false,
  options,
}: SelectType) => {
  return (
    <>
      {label && <SelectLabel htmlFor={id}>{label}</SelectLabel>}
      <SelectTag id={id} name={name} disabled={disabled}>
        {options.map((option) => {
          const lowerCasedOption = option.toLowerCase();
          return (
            <SelectOption value={lowerCasedOption} key={lowerCasedOption}>
              {titleCase(lowerCasedOption)}
            </SelectOption>
          );
        })}
      </SelectTag>
    </>
  );
};

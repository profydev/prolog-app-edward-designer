import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CustomButton, ButtonSize, ButtonColor } from "./customButton";

export default {
  title: "UI/CustomButton",
  component: CustomButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof CustomButton>;

const Template: ComponentStory<typeof CustomButton> = (args) => (
  <div style={{ padding: 50 }}>
    <CustomButton {...args}>{args.children}</CustomButton>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: "Button Template",
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  disabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
};
Default.parameters = {
  viewMode: "docs",
};

export const IconOnly = Template.bind({});
const childIconOnly = () => <img src="/icons/close2.svg" alt="close menu" />;
IconOnly.args = {
  children: childIconOnly(),
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  disabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
};
IconOnly.parameters = {
  viewMode: "docs",
};

export const leadingIcon = Template.bind({});
const childLeading = () => (
  <>
    <img src="/icons/close2.svg" alt="close menu" /> Close Menu
  </>
);
leadingIcon.args = {
  children: childLeading(),
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  disabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
};
leadingIcon.parameters = {
  viewMode: "docs",
};

export const trailingIcon = Template.bind({});
const childTrailing = () => (
  <>
    Close Menu <img src="/icons/close2.svg" alt="close menu" />
  </>
);
trailingIcon.args = {
  children: childTrailing(),
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  disabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
};
trailingIcon.parameters = {
  viewMode: "docs",
};

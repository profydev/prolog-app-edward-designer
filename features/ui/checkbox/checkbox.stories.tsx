import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Checkbox, CheckboxSize } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  size: CheckboxSize.sm,
  id: "id",
  value: "value",
  label: "label",
  indeterminate: false,
  disabled: false,
  checked: false,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <div style={{ padding: 50 }}>
    <Checkbox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: CheckboxSize.sm,
  id: "id",
  value: "value",
  label: "label",
  disabled: false,
  indeterminate: false,
  checked: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
};
Default.parameters = {
  viewMode: "docs",
};

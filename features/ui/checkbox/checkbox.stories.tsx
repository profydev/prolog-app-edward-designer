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
};
Default.parameters = {
  viewMode: "docs",
};

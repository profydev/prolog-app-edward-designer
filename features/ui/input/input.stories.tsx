import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <div style={{ padding: 50 }}>
    <Input {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  id: "id",
  name: "name",
  label: "label",
  placeholder: "olivia@untitledui.com",
  disabled: false,
  icon: "",
  hint: "",
  error: false,
  errorMsg: "",
  inputValue: "",
};
Default.parameters = {
  viewMode: "docs",
};

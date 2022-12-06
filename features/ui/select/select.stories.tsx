import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from "./select";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <div style={{ padding: 50 }}>
    <Select {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  id: "id",
  name: "name",
  label: "label",
  placeholder: "Select team member",
  options: ["option1", "option2", "option3"],
  disabled: false,
  hint: "This is a hint text to help user.",
  error: "",
  value: "option1",
  icon: "/icons/member.svg",
};
Default.parameters = {
  viewMode: "docs",
};

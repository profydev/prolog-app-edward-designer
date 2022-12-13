import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Header } from "./header";

export default {
  title: "UI/Header",
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => (
  <div style={{ padding: 50, position: "relative" }}>
    <Header />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  viewMode: "docs",
};

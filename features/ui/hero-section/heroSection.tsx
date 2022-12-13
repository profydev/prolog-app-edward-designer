import Image from "next/image";

import styled from "styled-components";
import { color, breakpoint } from "@styles/theme";
import { SectionHero, BackgroundTheme } from "@typings/landingpage.types";

const Hero = styled.section<{ bgTheme: BackgroundTheme }>`
  background: ${({ bgTheme }) => {
    switch (bgTheme) {
      case "light-gray":
        return color("gray", 50);
      default:
        return "#fff";
    }
  }};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 96px 0;
  & h1 {
    color: ${color("gray", 900)};
    font-size: clamp(36px, 29px + 2.15vw, 60px);
    letter-spacing: -0.02em;
    margin: 0;
    text-align: center;
  }
  & p {
    color: ${color("gray", 500)};
    font-size: clamp(18px, 19px, 20px);
    line-height: 1.5em;
    margin: 24px 0 64px 0;
    text-align: center;
  }
  & img {
    max-width: 100%;
    height: auto;
  }
  @media (min-width: ${breakpoint("desktop")}) {
    & p {
      white-space: pre;
    }
  }
`;

export const HeroSection = ({ data }: { data: SectionHero }) => {
  const { title, subtitle, image, theme } = data;
  return (
    <Hero bgTheme={theme}>
      <h1>{title}</h1>
      <p>{subtitle.replace(".", ".\n")}</p>
      <Image
        src={`https://prolog-api.profy.dev${image.src}`}
        width={image.width}
        height={image.height}
        alt="hero image"
      />
    </Hero>
  );
};

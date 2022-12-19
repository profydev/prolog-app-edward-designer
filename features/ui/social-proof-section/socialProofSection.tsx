import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { color, breakpoint } from "@styles/theme";
import {
  BackgroundTheme,
  SectionSocialProof,
} from "@typings/landingpage.types";

const SocialProof = styled.section<{ bgTheme: BackgroundTheme }>`
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
  & p {
    color: ${color("gray", 500)};
    font-size: 1rem;
    line-height: 1.5em;
    margin: 0;
    margin-bottom: 34px;
    text-align: center;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Logos = styled.div`
  display: flex;
  flex-direction: row;
  gap: 92px;
  box-sizing: border-box;
  transform: translateX(0);
  & img {
    height: 48px;
  }
  @media (max-width: ${breakpoint("desktop")}) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 46px;
    padding: 0 15px;
    & img {
      height: 34px;
      width: auto;
    }
  @media (max-width: ${breakpoint("mobile")}){
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        & img {
      height: 30px;
      width: auto;
    }
  }
`;

export const SocialProofSection = ({ data }: { data: SectionSocialProof }) => {
  const [elementWidth, setElementWidth] = useState(0);
  const { title, theme, companies } = data;
  const logoRef = useRef<HTMLDivElement>(null);
  const moveX = useRef(0);
  const scrollAnimationFrameRef = useRef(0);

  useEffect(() => setElementWidth(window.innerWidth), []);

  useEffect(() => {
    const socialProofResizeObserver = new ResizeObserver((entries) => {
      setElementWidth(entries[0].target.clientWidth);
    });
    if (logoRef.current) socialProofResizeObserver.observe(logoRef.current);
  }, []);

  useEffect(() => {
    const scrollLogos = () => {
      if (logoRef.current) {
        if (moveX.current + (logoRef.current.scrollWidth + 92) / 2 < 0) {
          moveX.current = 0;
        } else {
          moveX.current -= 2;
        }
        logoRef.current.style.transform = `translateX(${moveX.current}px)`;
      }
      scrollAnimationFrameRef.current = requestAnimationFrame(scrollLogos);
    };
    if (elementWidth >= 64 * 16) scrollLogos();
    return () => {
      if (logoRef.current) logoRef.current.style.transform = `translateX(0px)`;
      cancelAnimationFrame(scrollAnimationFrameRef.current);
    };
  }, [elementWidth]);

  const logoArray =
    elementWidth >= 64 * 16 ? companies.concat(companies) : companies;
  return (
    <SocialProof bgTheme={theme}>
      <p>{title}</p>
      <LogoContainer>
        <Logos ref={logoRef}>
          {logoArray.map((company, ind) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://prolog-api.profy.dev${company.logo}`}
              alt={company.name}
              key={ind}
            />
          ))}
        </Logos>
      </LogoContainer>
    </SocialProof>
  );
};

import React from "react";
import styled from "styled-components";
import { color, breakpoint } from "@styles/theme";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  padding-block: 12px;
  > span {
    padding-block: 13px;
  }
  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: row;
    flex-warp: none;
    padding: 0;
    > span {
      padding: 18px 32px;
    }
  }
`;

const Version = styled.span`
  order: 1;
  color: ${color("gray", 400)};
  text-align: center;
  @media (min-width: ${breakpoint("desktop")}) {
    text-align: left;
    order: 0;
  }
`;
const LinkContainer = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const Link = styled.a`
  color: ${color("gray", 500)};
  text-decoration: none;
  padding-inline: 12px;
`;
const Logo = styled.span`
  background: url("/icons/logo-small.svg") no-repeat center center;
  background-size: 23px 33px;
  flex-basis: 33px;
  @media (min-width: ${breakpoint("desktop")}) {
    flex-basis: 82px;
    margin-right: 32px;
    background-position: center right;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Version>Version: {process.env.NEXT_PUBLIC_APP_VERSION}</Version>
      <LinkContainer>
        <Link href="/docs">Docs</Link>
        <Link href="/api">API</Link>
        <Link href="/help">Help</Link>
        <Link href="/community">Community</Link>
      </LinkContainer>
      <Logo />
    </FooterContainer>
  );
};

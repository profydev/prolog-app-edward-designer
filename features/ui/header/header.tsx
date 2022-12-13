import Link from "next/link";
import styled from "styled-components";

import { Routes } from "@config/routes";
import { color, textFont, breakpoint } from "@styles/theme";

import { CustomButton, ButtonSize } from "@features/ui/button/customButton";
import { useState } from "react";

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  @media (max-width: ${breakpoint("desktop")}) {
    padding: 0 0 0 1rem;
  }
`;

const MenuWrapper = styled.div<{ isMobileMenuOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: ${breakpoint("desktop")}) {
    height: 100%;
    background: #fff;
    position: fixed;
    display: flex;
    flex-direction: column;
    right: 0;
    top: 0;
    justify-content: flex-start;
    box-shadow: 0px 2px 4px rgba(16, 24, 40, 0.2);
    transform: ${({ isMobileMenuOpen }) =>
      isMobileMenuOpen ? "translateX(0%)" : "translateX(101%)"};
    transition: all 1000ms ease-in-out;
`;

const MenuIconWrapper = styled.div`
  display: none;
  @media (max-width: ${breakpoint("desktop")}) {
    display: block;
    z-index: 1;
  }
`;

const Navigation = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${textFont("md", "medium")}

  & a {
    color: ${color("gray", 500)};
    padding: 28px 16px;
    text-decoration: none;
  }
  & a:hover {
    color: ${color("primary", 700)};
  }
  @media (max-width: ${breakpoint("desktop")}) {
    margin-top: 80px;
    flex: 0;
    flex-direction: column;
    & a {
      padding: 16px 16px;
      border-bottom: 1px solid ${color("gray", 100)};
    }
  }
`;

const OpenDashboardLink = styled.a`
  ${textFont("md", "medium")}
  background: ${color("primary", 600)};
  padding: 10px 18px;
  border-radius: 8px;
  border: 1px solid ${color("primary", 600)};
  color: #fff;
  text-decoration: none;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  flex-shrink: 0;
  :hover {
    background-color: ${color("primary", 700)};
  }
  @media (max-width: ${breakpoint("desktop")}) {
    margin: 1rem;
  }
`;

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <HeaderContainer>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/logo-large.svg" alt="Prolog logo" />
      <MenuWrapper isMobileMenuOpen={isMobileMenuOpen}>
        <Navigation>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/documentation">Documentation</Link>
          <Link href="/pricing">Pricing</Link>
        </Navigation>
        <OpenDashboardLink href={Routes.projects}>
          Open Dashboard
        </OpenDashboardLink>
      </MenuWrapper>
      <MenuIconWrapper>
        <CustomButton size={ButtonSize.sm} onClick={toggleMobileMenu}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/hamburger.svg" alt="open navigation menu" />
        </CustomButton>
      </MenuIconWrapper>
    </HeaderContainer>
  );
};

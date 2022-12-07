import styled from "styled-components";
import { Routes } from "@config/routes";
import { color, textFont, space } from "@styles/theme";

import Link from "next/link";

const Header = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
`;

const ContactButton = styled.button`
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  padding: 1rem;
  background: #7f56d9;
  border-radius: 50%;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border: none;
  cursor: pointer;

  &:hover {
    background: #6941c6;
  }
`;

const Navigation = styled.nav`
  ${textFont("md", "medium")}

  & a {
    color: ${color("gray", 500)};
    padding: 28px 16px;
    text-decoration: none;
  }
  & a:hover {
    color: ${color("primary", 700)};
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
`;

const IssuesPage = () => {
  return (
    <div>
      <Header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <Navigation>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/documentation">Documentation</Link>
          <Link href="/pricing">Pricing</Link>
        </Navigation>
        <OpenDashboardLink href={Routes.projects}>
          Open Dashboard
        </OpenDashboardLink>
      </Header>
      <ContactButton
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal"
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
    </div>
  );
};

export default IssuesPage;

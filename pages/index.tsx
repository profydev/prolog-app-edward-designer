import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Routes } from "@config/routes";
import { color, textFont, breakpoint } from "@styles/theme";
import {
  CustomButton,
  ButtonColor,
  ButtonSize,
} from "@features/ui/button/customButton";
import Link from "next/link";

const PageWrapper = styled.div``;

const Header = styled.header`
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

const Main = styled.main``;

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

const ModalWrapper = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(52, 64, 84, 0.6);
  backdrop-filter: blur(8px);
  text-align: center;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  background: #fff;
  padding: 24px;
  gap: 32px;
  border-radius: 12px;
  margin: 16px;
`;

const MessageWrapper = styled.div`
  color: ${color("gray", 500)};
`;

const ImgWrapper = styled.img`
  width: 40px;
  margin: 8px auto 28px;
`;

const ModalHeading = styled.h1`
  color: ${color("gray", 900)};
  font-size: 18px;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  & button {
    flex: 1;
    justify-content: center;
  }
`;

const IssuesPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalWrapperRef.current &&
      !modalWrapperRef.current.childNodes[0].contains(event.target as Node)
    ) {
      modalWrapperRef.current.style.display = "none";
    }
  };
  useEffect(() => {
    if (modalWrapperRef.current) {
      modalWrapperRef.current.addEventListener("click", handleClickOutside);
      return () => {
        modalWrapperRef.current?.removeEventListener(
          "click",
          handleClickOutside,
          true
        );
      };
    }
  }, [modalWrapperRef]);

  const onClickHandler = () => {
    if (modalWrapperRef.current) modalWrapperRef.current.style.display = "flex";
  };

  const cancelHandler = () => {
    if (modalWrapperRef.current) modalWrapperRef.current.style.display = "none";
  };

  const emailHandler = () => {
    window.location.href = "mailto:prolog@profy.dev?subject=Enqury:";
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <PageWrapper>
      <ModalWrapper ref={modalWrapperRef}>
        <Modal>
          <MessageWrapper>
            <ImgWrapper src="/icons/contact-email.svg" alt="" />
            <ModalHeading>Contact Us Via Email</ModalHeading>
            <p>
              Any questions? Send us an email at prolog@profy.dev. We usually
              answer within 24 hours.
            </p>
          </MessageWrapper>
          <ButtonWrapper>
            <CustomButton
              size={ButtonSize.sm}
              color={ButtonColor.gray}
              onClick={cancelHandler}
            >
              Cancel
            </CustomButton>
            <CustomButton
              size={ButtonSize.sm}
              color={ButtonColor.primary}
              onClick={emailHandler}
            >
              Open Email App
            </CustomButton>
          </ButtonWrapper>
        </Modal>
      </ModalWrapper>
      <Header>
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
      </Header>
      <Main>Hero Image</Main>
      <ContactButton onClick={onClickHandler}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
    </PageWrapper>
  );
};

export default IssuesPage;

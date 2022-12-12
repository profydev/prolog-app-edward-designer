import { useRef, useEffect } from "react";
import styled from "styled-components";
import { Routes } from "@config/routes";
import { color, textFont, space } from "@styles/theme";
import {
  CustomButton,
  ButtonColor,
  ButtonSize,
} from "@features/ui/button/customButton";
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

  return (
    <>
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
      <Main>Hero Image</Main>
      <ContactButton onClick={onClickHandler}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
    </>
  );
};

export default IssuesPage;

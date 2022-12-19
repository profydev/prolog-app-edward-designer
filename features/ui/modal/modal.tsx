import { useRef, useEffect } from "react";

import styled from "styled-components";

import { color } from "@styles/theme";
import {
  CustomButton,
  ButtonColor,
  ButtonSize,
} from "@features/ui/button/customButton";

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(52, 64, 84, 0.6);
  backdrop-filter: blur(8px);
  text-align: center;
`;

const ModalBox = styled.div`
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

type TModal = {
  setIsModalVisible: (isModalVisible: boolean) => void;
};

export const Modal = ({ setIsModalVisible }: TModal) => {
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalWrapperRef.current &&
        !modalWrapperRef.current.childNodes[0].contains(event.target as Node)
      ) {
        setIsModalVisible(false);
      }
    };
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
  }, [modalWrapperRef, setIsModalVisible]);

  const cancelHandler = () => {
    setIsModalVisible(false);
  };

  const emailHandler = () => {
    window.location.href = "mailto:prolog@profy.dev?subject=Enqury:";
  };

  return (
    <ModalWrapper ref={modalWrapperRef}>
      <ModalBox>
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
      </ModalBox>
    </ModalWrapper>
  );
};

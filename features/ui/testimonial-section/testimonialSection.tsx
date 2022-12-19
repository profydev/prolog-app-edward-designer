import styled from "styled-components";
import { color, breakpoint } from "@styles/theme";
import {
  BackgroundTheme,
  SectionTestimonial,
} from "@typings/landingpage.types";
import Image from "next/image";

const TestimonialContainer = styled.section<{ bgTheme: BackgroundTheme }>`
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
`;

const TestimonialsWrapper = styled.div`
  display: flex;
  gap: 64px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Testimonial = styled.div`
  max-width: 327px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 16px;
  padding: 40px 24px;
  gap: 12px;
  background-color: ${color("primary", 50)};
  & p {
    flex: 1;
    margin: 0;
    font-size: 24px;
    color: ${color("primary", 900)};
  }
  &:nth-child(2n) {
    background-color: ${color("gray", 50)};
  }
  &:nth-child(2n) p {
    color: ${color("gray", 900)};
  }
  & h2 {
    margin: 0;
    font-size: 14px;
    color: ${color("primary", 700)};
  }
`;

const User = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  & img {
    border-radius: 50%;
    margin-bottom: 16px;
  }
  & p {
    font-size: 14px;
  }
  & p em {
    font-size: 16px;
  }
`;

export const TestimonialSection = ({ data }: { data: SectionTestimonial }) => {
  const { title, theme, subtitle, testimonials } = data;
  return (
    <TestimonialContainer bgTheme={theme}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <TestimonialsWrapper>
        {testimonials.map(
          ({ title, text, userName, userRole, userCompany, userImage }) => (
            <Testimonial key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
              <User>
                <Image
                  alt={`photo of reviewer ${userName}`}
                  src={`https://prolog-api.profy.dev${userImage.src}`}
                  width={userImage.width}
                  height={userImage.height}
                />
                <p>
                  <strong>{userName}</strong>
                </p>
                <p>{`${userRole}, ${userCompany}`}</p>
              </User>
            </Testimonial>
          )
        )}
      </TestimonialsWrapper>
    </TestimonialContainer>
  );
};

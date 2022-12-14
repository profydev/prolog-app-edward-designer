import { useState } from "react";
import Head from "next/head";
import styled from "styled-components";

import { Header } from "@features/ui/header";
import { HeroSection } from "@features/ui/hero-section";
import { SocialProofSection } from "@features/ui/social-proof-section";
import { TestimonialSection } from "@features/ui/testimonial-section";

import { Modal } from "@features/ui/modal";

import {
  SectionHero,
  SectionSocialProof,
  SectionType,
  SectionTestimonial,
  TLandingPage,
} from "@typings/landingpage.types";

const PageWrapper = styled.div``;

const Main = styled.main``;

const ContactButton = styled.button`
  position: fixed;
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

const IndexPage = ({ data }: { data: TLandingPage }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const hero = data.sections.find(
    (section) => section.sectionType === SectionType.hero
  ) as SectionHero;

  const socialProof = data.sections.find(
    (section) => section.sectionType === SectionType.socialProof
  ) as SectionSocialProof;

  const testimonial = data.sections.find(
    (section) => section.sectionType === SectionType.testimonials
  ) as SectionTestimonial;

  const onClickHandler = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <PageWrapper>
      <Head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
        <meta property="og:title" content={data.meta.title} />
        <meta property="og:description" content={data.meta.description} />
        <meta
          property="og:image"
          content={`https://prolog-api.profy.dev/${data.meta.image}`}
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>

      {isModalVisible && <Modal setIsModalVisible={setIsModalVisible} />}

      <Header />
      <Main>
        {hero && <HeroSection data={hero} />}
        {socialProof && <SocialProofSection data={socialProof} />}
        {testimonial && <TestimonialSection data={testimonial} />}
      </Main>
      <ContactButton onClick={onClickHandler}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
    </PageWrapper>
  );
};

export default IndexPage;

export async function getServerSideProps() {
  const res = await fetch(`https://prolog-api.profy.dev/content-page/home`);
  const data = await res.json();
  return { props: { data } };
}

import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { SidebarNavigation } from "@features/ui";
import { color, displayFont, textFont, space, breakpoint } from "@styles/theme";
import { Footer } from "../footer";

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
  info: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${color("gray", 900)};

  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: row;
  }
`;

const Main = styled.main`
  min-height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  margin-top: ${({ theme }) => theme.size.headerHeight};
  padding: ${space(8, 3)};
  background: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoint("desktop")}) {
    margin-top: ${space(3)};
    padding: ${space(8)};
    border-top-left-radius: ${space(10)};
  }
`;

const Title = styled.h1`
  margin: ${space(0, 0, 1)};
  color: ${color("gray", 900)};
  ${displayFont("sm", "medium")}
`;

const Info = styled.div`
  margin-bottom: ${space(8)};
  color: ${color("gray", 500)};
  ${textFont("md", "regular")}
`;

const Content = styled.div`
  flex: 1;
`;

export function PageContainer({ children, title, info }: PageContainerProps) {
  // combine title in a single string to prevent below warning
  // "Warning: A title element received an array with more than 1 element as children."
  const documentTitle = `ProLog - ${title}`;
  return (
    <Container>
      <Head>
        <title>{documentTitle}</title>
        <meta name="description" content="Error monitoring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SidebarNavigation />
      <Main>
        <Footer />
        <ContentContainer>
          <Title>{title}</Title>
          <Info>{info}</Info>
          <Content>{children}</Content>
        </ContentContainer>
      </Main>
    </Container>
  );
}

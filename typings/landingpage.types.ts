export type TLandingPage = {
  meta: {
    title: string;
    description: string;
    image: string;
  };
  sections: Section[];
};

export enum SectionType {
  hero = "hero",
  socialProof = "social-proof",
  testimonials = "testimonials",
}

export type BackgroundTheme = "light-gray" | "light";

type Section = SectionHero | SectionSocialProof | SectionTestimonial;

export type SectionHero = {
  sectionType: SectionType.hero;
  theme: BackgroundTheme;
  title: string;
  subtitle: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
};

export type SectionSocialProof = {
  sectionType: SectionType.socialProof;
  theme: BackgroundTheme;
  title: string;
  companies: Company[];
};

export type SectionTestimonial = {
  sectionType: SectionType.testimonials;
  theme: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
};

type Company = {
  name: string;
  logo: string;
};

type Testimonial = {
  title: string;
  text: string;
  userName: string;
  userRole: string;
  userCompany: string;
  userImage: {
    src: string;
    width: number;
    height: number;
  };
};

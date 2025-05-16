export interface TestimonialProps {
    image: string;
    name: string;
    userName: string;
    comment: string;
    title?: string;
  }

export interface TestimonialSectionProps {
    testimonials: TestimonialProps[];
    heading: string;
    description: string;
    version?: string;
}
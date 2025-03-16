export interface TestimonialProps {
    image: string;
    name: string;
    userName: string;
    comment: string;
  }

export interface TestimonialSectionProps {
    testimonials: TestimonialProps[];
    heading: string;
    description: string;
}
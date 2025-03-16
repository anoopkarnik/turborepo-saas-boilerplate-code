import { TestimonialProps, TestimonialSectionProps } from "@repo/ts-types/landing-page/testimonials";

export const testimonials: TestimonialProps[] = [
    {
      image: "./anoop.jpg",
      name: "Anoop Karnik Dasika",
      userName: "@anooplegend1992",
      comment: "This is the best boilerplate for micro SaaS monerepo code out there!",
    },
    {
      image: "./batman.jpg",
      name: "Batman",
      userName: "@batman",
      comment:
        "If I had used this boilerplate code earlier, I would have created a software to save gotham by creating a surveillance AI.",
    },
    {
      image: "./einstein.jpg",
      name: "Albert Einstein",
      userName: "@alberteinstein",
      comment:
        "If I had used this boilerplate code earlier, I would have created a software to help me solve the equation of the universe.",
    },
    {
      image: "./newton.jpg",
      name: "Issac Newton",
      userName: "@issacnewton",
      comment:
        "If I had used this boilerplate code earlier, I would have created a software to help me understand the thousands of laws of motion insteadf of just 3.",
    },
    {
      image: "./buddha.jpeg",
      name: "Gautum Buddha",
      userName: "@gautumbuddha",
      comment:
        "If I had used this boilerplate code earlier, I would have created a software to help me understand the meaning of life.",
    },
    {
      image: "./ironman.jpeg",
      name: "Iron Man",
      userName: "@ironman",
      comment:
        "If I had used this boilerplate code earlier, I would have created a software to help me save the world from Thanos.",
    },
  ];

export const testimonialSection: TestimonialSectionProps = {
    heading: "Discover Why People Love This SaaS Boilerplate Code",
    description: `These are some of the testimonials that we have received from our clients. `,
    testimonials
}
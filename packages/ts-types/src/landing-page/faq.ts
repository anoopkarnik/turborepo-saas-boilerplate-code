
export interface faqProps {
    question: string;
    answer: string;
    value: string;
  }

export interface faqSectionProps {
    faqList: faqProps[];
    heading: string;
    description: string;
    supportEmailAddress: string;
    version?: string;
}
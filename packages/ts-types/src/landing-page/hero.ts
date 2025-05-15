
export interface HeroSectionProps  {
    documentationLink?: string;
    getStartedLink?: string;
    blogLink?: string;
    tagline: string;
    description: string;
    version?: string;
    videoUrl?: string;
    images?: imageWithTitleProps[];
}

  export interface imageWithTitleProps {
    title: string;
    imageUrl: string;
  }
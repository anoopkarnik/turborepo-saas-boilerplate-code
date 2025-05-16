export interface FeatureWithDescriptionProps {
    title: string;
    href?: string;
    description: string;
    category?: string;
  }

export interface FeatureListProps {
  title: string;
}

export interface FeaturesProps {
featuresWithDescription: FeatureWithDescriptionProps[];
featureList: FeatureListProps[];
}

export interface FeatureSectionProps extends FeaturesProps {
    heading: string;
    description: string;
    version?: string;
}
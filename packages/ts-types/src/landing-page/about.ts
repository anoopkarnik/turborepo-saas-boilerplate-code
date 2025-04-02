export interface AboutSectionProps  extends StatisticsProps{
    heading: string;
    companyDetails: string;
    version?: string;

}

export interface StatisticsProps {
    users: string;
    subscribers: string;
    products: string;
    downloads: string;
  }

export interface Tour {
  id: number;
  title: string;
  location: string;
  price: number;
  tags: string[];
  images: string[];
  description: string;
  shortDescription: string;
  duration: string;
  tourDetails: any;
  label?: string | null;
}

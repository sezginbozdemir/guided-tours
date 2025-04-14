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
  tourDetails: Record<string, string[]>;
  label?: string | null;
}
export interface Location {
  id: number;
  name: string;
  images: string[];
  description: string;
  popular?: boolean;
}

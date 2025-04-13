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
  status: string;
  createdAt: Date;
}
export interface FormData {
  title: string;
  location: string;
  duration: string;
  label: string;
  tags: string[];
  tourDetails: Record<string, string[]>;
  images: string[];
  price: string;
  shortDescription: string;
  description: string;
}
export interface Location {
  id: number;
  name: string;
  images: string[];
  description: string;
  popular?: boolean;
}

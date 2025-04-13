import { fetchAllTours } from "@/lib/data/tours";
import ToursTemplate from "@/modules/tours/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Istanbul Tours",
  description: "Turkey Tours",
};

interface Props {
  searchParams: Promise<{
    location?: string;
  }>;
}

export default async function ToursPage({ searchParams }: Props) {
  const { location } = await searchParams;
  const tours = await fetchAllTours(location);
  return <ToursTemplate location={location} tours={tours} />;
}

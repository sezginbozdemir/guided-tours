import { fetchAllTours } from "@/lib/data/tours";
import ToursTemplate from "@/modules/tours/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Istanbul Tours",
  description: "Turkey Tours",
};

interface Props {
  searchParams: {
    location?: string;
  };
}

export default async function ToursPage({ searchParams }: Props) {
  const location = searchParams.location;
  const tours = await fetchAllTours(location);
  return <ToursTemplate location={location} tours={tours} />;
}

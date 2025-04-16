import { notFound } from "next/navigation";
import { fetchAllLocations } from "@/lib/data/locations";
import { Metadata } from "next";
import DestinationTemplate from "@/modules/destination/templates";
import { fetchAllTours } from "@/lib/data/tours";

export const metadata: Metadata = {
  title: "Guided Istanbul Tours",
  description: "Turkey Tours",
};

interface Props {
  params: Promise<{
    handle: string;
  }>;
}
const locations = await fetchAllLocations();
const tours = await fetchAllTours();

export async function generateStaticParams(): Promise<{ handle: string }[]> {
  return locations
    .filter((loc) => loc.id)
    .map((loc) => ({
      handle: String(loc.id),
    }));
}

export default async function TourPage({ params }: Props) {
  const { handle } = await params;
  const location = locations.find((item) => String(item.id) === handle);

  if (!location) {
    return notFound();
  }
  const filteredTours = tours.filter(
    (tour) => tour.location?.toLowerCase() === location.name.toLowerCase()
  );

  return (
    <DestinationTemplate
      locations={locations}
      tours={filteredTours}
      location={location}
    />
  );
}

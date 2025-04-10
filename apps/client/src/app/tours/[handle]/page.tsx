import { fetchAllTours } from "@/lib/data/tours";
import { notFound } from "next/navigation";
import TourTemplate from "@/modules/tours/templates/tourTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Istanbul Tours",
  description: "Turkey Tours",
};

interface Props {
  params: Promise<{
    handle: string;
  }>;
}
const tours = await fetchAllTours();

export async function generateStaticParams(): Promise<{ handle: string }[]> {
  return tours
    .filter((tour) => tour.id)
    .map((tour) => ({
      handle: String(tour.id),
    }));
}

export default async function TourPage({ params }: Props) {
  const { handle } = await params;
  const tour = tours.find((item) => String(item.id) === handle);

  if (!tour) {
    return notFound();
  }

  return <TourTemplate tour={tour} />;
}
